const generateToken = require('../config/generateToken');
const Role = require('../models/role');
const User = require('../models/user');
const Bar = require('../models/bar');
const bcrypt = require('bcrypt');
const NodeGeocoder = require('node-geocoder');
const { v2: cloudinary } = require('cloudinary');
const mongoose = require('mongoose');
const geocoder = NodeGeocoder({
  provider: 'locationiq',
  apiKey: process.env.GEOCODER_API_KEY,
  httpAdapter: 'https'
});

exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const roleUser = new Role()
    roleUser.name = "user"; 
    newUser.role = roleUser._id;
    const salt = await bcrypt.genSalt(10);
    await roleUser.save();

    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    // 🌟 Populate avant token
    await newUser.populate('role');
    const token = generateToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(404).json({ message: "Erreur lors de l'inscription", error: err.message });
  }
};


// POST login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 👉 Ici on récupère le user + on peuple le rôle
    const user = await User.findOne({ email }).populate('role');
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // ✅ Ici le rôle est bien peuplé → injecté dans le token
    const token = generateToken(user);

    const userSansMdp = user.toObject();
    delete userSansMdp.password;

    res.status(200).json({ token, user: userSansMdp });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: err.message });
  }
};


exports.registerBar = async (req, res) => {
  console.log('📥 Requête POST /api/login/register/bar reçue avec le body :', req.body);
  try {
    const user = new User(req.body);
    // const newBar = new Bar(req.body);
    const role = new Role();
    const result = await geocoder.geocode(req.body.address)
    
    console.log('   result geocoder :', result[0].latitude, result[0].longitude);
    req.body.latitude = result[0].latitude;
    req.body.longitude = result[0].longitude;
    let imageUrl = null;
    //Upload image si présente
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'bars',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
      });

      imageUrl = result.secure_url;
    }

    const idUser = new mongoose.Types.ObjectId();
    //Créer le bar avec l’URL de l’image
    const newBar = new Bar({
      ...req.body,
      image: imageUrl,
      _id: idUser,
      manager: [idUser],  
    });
console.log('   newBar :', newBar);
    newBar.manager = idUser;
    await newBar.save();
    role.name = "managerBar";
    // newBar.nameBar = req.body.nameBar;
    newBar.save();
    
    user.role = role._id;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = generateToken(user);
    
    await user.save();
    res.status(201).json({ user: user, token : token, bar: newBar });
  }
  catch (err) {
    res.status(404).json({ message: 'Erreur lors de l\'inscription du bar', error: err.message });
  }
}
