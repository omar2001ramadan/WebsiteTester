function isEmployer(req, res, next) {
  if (req.session.userRole === 'employer') {
    console.log('User is an employer');
    return next();
  }
  console.log('User is not an employer');
  res.status(403).send('Forbidden: Employers only');
}

module.exports = { isEmployer };