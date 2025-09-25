module.exports = function checkRole(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user; // req.user est supposé avoir été injecté par le middleware d'authentification

    if (!user || !user.role) {
      return res.status(401).json({ message: "Non autorisé : utilisateur ou rôle manquant" });
    }

    // Si le rôle est un objet (populé), récupère les propriétés booléennes
    const role = user.role;

    const roleMapping = {
      admin: role.roleAdmin === true,
      manager: role.roleManager === true,
      user: role.roleUser === true,
    };

    const isAllowed = allowedRoles.some(r => roleMapping[r]);

    if (!isAllowed) {
      return res.status(403).json({ message: "Accès interdit : rôle insuffisant" });
    }

    next();
  };
};
