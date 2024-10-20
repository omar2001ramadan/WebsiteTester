const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: [{ type: String, required: true }],
  idealAnswers: [{ type: String, required: true }]
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;