const {v2: cloudinary} = require('cloudinary');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ message: 'Aucun fichier téléchargé' });
    }
    
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'bars',
      allowed_formats: ['jpg', 'png', 'jpeg'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }]
    });
    
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    res.status(500).json({ message: 'Erreur lors du téléchargement de l\'image', error: error.message });
  }
}