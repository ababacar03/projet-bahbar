var jwt = require('jsonwebtoken');

const generateToken = (user) => {

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role 
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

  return token;
};
module.exports = generateToken;