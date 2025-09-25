const passport = require('passport');
const User = require('../models/user');

// Middleware Express pour vérifier le JWT et injecter l'utilisateur peuplém
module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    try {
      const fullUser = await User.findById(user._id).populate('role');
      if (!fullUser) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }
      req.user = fullUser;
      next();
    } catch (err) {
      console.error('❌ Erreur dans auth.js :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  })(req, res, next);
};
