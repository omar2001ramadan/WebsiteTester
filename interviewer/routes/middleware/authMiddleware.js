const User = require('../../models/User');

const isAuthenticated = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        console.log('User is authenticated');
        req.user = user;
        return next();
      }
    } catch (error) {
      console.error('Error in authentication middleware:', error.message);
      console.error(error.stack);
      res.status(500).send('Error during authentication process');
      return;
    }
  }
  console.log('User is not authenticated');
  res.status(401).send('You are not authenticated');
};

module.exports = {
  isAuthenticated
};