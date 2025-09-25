const User = require('../models/user');
const Role = require('../models/role');
const Bar = require('../models/bar');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// POST create user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    const userSansMdp = newUser.toObject();
    delete userSansMdp.password;
    res.status(201).json(userSansMdp);
  } catch (err) {
    res.status(404).json({ message: 'Erreur lors de la création', error: err.message });
  }
};

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
  const users = await User.find()
    .select('-password')
    .populate('role', '-__v');    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// GET one user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'ID invalide' });

  try {
    const user = await User.findById(id)
      .select('-password')
      .populate('role', '-__v');

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    // Récupérer les bars où ce user est manager
    const managedBars = await Bar.find({ manager: user._id }).select('nameBar image address');

    res.status(200).json({ user, managedBars });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// PUT update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'ID invalide' });

  try {
    const salt = await bcrypt.genSalt(10);
    const data = {
      ...req.body,
      password: req.body.password
    };
    if(data.password){
      data.password = await bcrypt.hash(data.password, salt);
    }

    const updated = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: 'Erreur lors de la mise à jour', error: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'ID invalide' });

  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// POST add a favorite bar
exports.addFavoriteBar = async (req, res) => {
  // Vérifie que req.user existe
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Utilisateur non authentifié." });
  }
  const userId = req.user._id;
  const barId = req.params.barId;

  try {
    // Vérifie que le bar existe
    const bar = await Bar.findById(barId);
    if (!bar) {
      return res.status(404).json({ message: "⚠️ Aucun bar trouvé avec cet ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (user.favorites.includes(barId)) {
      return res.status(404).json({ message: 'Ce bar est déjà en favori.' });
    }

    user.favorites.push(barId);
    await user.save();

    res.status(200).json({ message: 'Bar ajouté aux favoris.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// POST remove a favorite bar
exports.removeFavoriteBar = async (req, res) => {
  const userId = req.user._id;
  const barId = req.params.barId;

  try {
    const user = await User.findById(userId);

    user.favorites = user.favorites.filter(id => id.toString() !== barId);
    await user.save();

    res.status(200).json({ message: 'Bar retiré des favoris.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// GET favorite bars of the user
exports.getFavoriteBars = async (req, res) => {
  //console.log('   req.user :', req.user);            
  //console.log('   req.user._id (type) :', typeof req.user._id, req.user._id);

  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'favorites'
      });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    console.log('   user.favorites :', user);

    return res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
