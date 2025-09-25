const Bar = require('../models/bar');
const { v2: cloudinary } = require('cloudinary');
const mongoose = require('mongoose');
const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
  provider: 'locationiq',
  apiKey: process.env.GEOCODER_API_KEY,
  httpAdapter: 'https'
});

// ✅ CREATE
exports.createBar = async (req, res) => {
  console.log('📥 Requête POST /api/bars reçue avec le body :', req.body);

  try {

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

    //Créer le bar avec l’URL de l’image
    const newBar = new Bar({
      ...req.body,
      image: imageUrl,
      manager: [req.user._id],  
    });

    await newBar.save();
    console.log('✅ Bar créé avec succès :', newBar);
    res.status(201).json(newBar);
  } catch (err) {
    console.error('❌ Erreur lors de la création du bar :', err.message);
    res.status(404).json({ message: 'Erreur création bar', error: err.message });
  }
};

// ✅ READ ALL
exports.getAllBars = async (req, res) => {
  console.log('📥 Requête GET /api/bars reçue');

  try {
    const bars = await Bar.find().populate({
      path: 'manager',
      select: 'username email role',
      populate: {
        path: 'role',
        select: 'roleManager roleAdmin roleUser'
      }
    });
    console.log(`✅ ${bars.length} bars récupérés`);
    res.status(200).json(bars);
  } catch (err) {
    console.error('❌ Erreur lors de la récupération des bars :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ READ ONE
exports.getBarById = async (req, res) => {
  const { id } = req.params;
  console.log('📥 Requête GET /api/bars/:id reçue avec ID :', id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.warn('⚠️ ID de bar invalide');
    return res.status(404).json({ message: 'ID invalide' });
  }

  try {
    const bar = await Bar.findById(id).populate({
      path: 'manager',
      select: 'username email role',
      populate: {
        path: 'role',
        select: 'roleManager roleAdmin roleUser'
      }
    });
    if (!bar) {
      console.warn('⚠️ Aucun bar trouvé avec cet ID');
      return res.status(404).json({ message: 'Bar non trouvé' });
    }
    console.log('✅ Bar trouvé :', bar.name);
    res.status(200).json(bar);
  } catch (err) {
    console.error('❌ Erreur lors de la récupération du bar :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ UPDATE
exports.updateBar = async (req, res) => {
  const { id } = req.params;
  console.log('📥 Requête PUT /api/bars/:id reçue avec ID :', id);
  console.log('🛠️ Données de mise à jour :', req.body);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.warn('⚠️ ID de bar invalide');
    return res.status(404).json({ message: 'ID invalide' });
  }

  try {
    const bar = await Bar.findById(id);
    if (!bar) {
      console.warn('⚠️ Aucun bar trouvé à mettre à jour');
      return res.status(404).json({ message: 'Bar non trouvé' });
    }

    // // ✅ Vérifie que c’est un admin OU que c’est le manager du bar
    // const isAdmin = req.user.role?.roleAdmin;
    // const isManagerOfBar = bar.manager.some(mgrId => mgrId.equals(req.user._id));

    // if (!isAdmin && !isManagerOfBar) {
    //   return res.status(403).json({ message: 'Accès refusé : non autorisé à modifier ce bar' });
    // }

    // ✅ Effectuer la mise à jour
    const updatedBar = await Bar.findByIdAndUpdate(id, req.body, { new: true });
    console.log('✅ Bar mis à jour :', updatedBar.name);
    res.status(200).json(updatedBar);

  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour du bar :', err.message);
    res.status(404).json({ message: 'Erreur mise à jour', error: err.message });
  }
};

// ✅ DELETE
exports.deleteBar = async (req, res) => {
  const { id } = req.params;
  console.log('📥 Requête DELETE /api/bars/:id reçue avec ID :', id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.warn('⚠️ ID de bar invalide');
    return res.status(404).json({ message: 'ID invalide' });
  }

  try {
    const bar = await Bar.findById(id);
    if (!bar) {
      console.warn('⚠️ Aucun bar trouvé à supprimer');
      return res.status(404).json({ message: 'Bar non trouvé' });
    }

    // ✅ Vérifie que c’est un admin OU le manager du bar
    // const isAdmin = req.user.role?.roleAdmin;
    // const isManagerOfBar = bar.manager.some(mgrId => mgrId.equals(req.user._id));

    // if (!isAdmin && !isManagerOfBar) {
    //   return res.status(403).json({ message: 'Accès refusé : vous ne pouvez pas supprimer ce bar' });
    // }

    await Bar.findByIdAndDelete(id);
    console.log('🗑️ Bar supprimé avec succès :', bar.name);
    res.status(200).json({ message: 'Bar supprimé' });

  } catch (err) {
    console.error('❌ Erreur lors de la suppression du bar :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
