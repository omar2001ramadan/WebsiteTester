const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const { isAuthenticated } = require('./middleware/authMiddleware');
const { isEmployer } = require('./middleware/roleMiddleware');

// GET Interview Management Page
router.get('/interviews', isAuthenticated, isEmployer, async (req, res) => {
  try {
    console.log('Fetching interview types from the database...');
    const interviews = await Interview.find({});
    console.log('Successfully fetched interview types.');
    res.render('interviews', { interviews });
  } catch (error) {
    console.error('Error fetching interview types:', error.message);
    console.error(error.stack);
    res.status(500).send('Error fetching interview types.');
  }
});

// GET route to display the interview creation form
router.get('/interviews/create', isAuthenticated, isEmployer, (req, res) => {
  console.log('Rendering the interview creation form.');
  res.render('createInterview');
});

// Add POST route to create a new interview
router.post('/interviews/create', isAuthenticated, isEmployer, async (req, res) => {
  try {
    console.log('Received a POST request to /interviews/create');
    const { name, questions, idealAnswers } = req.body;
    console.log(`Request body - Name: ${name}, Questions: ${questions}, Ideal Answers: ${idealAnswers}`);

    const questionArray = questions.split(',');
    const idealAnswerArray = idealAnswers.split(',');

    console.log('Parsed question array:', questionArray);
    console.log('Parsed ideal answer array:', idealAnswerArray);

    const interview = new Interview({
      name,
      questions: questionArray,
      idealAnswers: idealAnswerArray
    });

    await interview.save();
    console.log('New interview type created successfully with ID:', interview._id);

    res.redirect('/interviews');
  } catch (error) {
    console.error('Error creating a new interview type:', error.message);
    console.error(error.stack);
    res.status(500).send('Error creating a new interview type.');
  }
});

module.exports = router;