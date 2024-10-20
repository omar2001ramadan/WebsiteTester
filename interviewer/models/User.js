const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employer', 'employee'], default: 'employee' } // Add the role field
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      console.log('Password hashed successfully');
    } catch (err) {
      console.error('Error hashing password:', err.message);
      console.error(err.stack);
      return next(err);
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;