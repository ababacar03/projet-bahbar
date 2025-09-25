const Bar = require('../models/bar');

module.exports = async (req, res, next) => {
  const barId = req.params.id;

  const bar = await Bar.findById(barId);
  if (!bar) return res.status(404).json({ message: 'Bar non trouvé' });

  const isManager = bar.manager.some(managerId => managerId.equals(req.user._id));

  if (!isManager && !req.user.role.roleAdmin) {
    return res.status(403).json({ message: 'Non autorisé à modifier ce bar' });
  }

  next();
};
