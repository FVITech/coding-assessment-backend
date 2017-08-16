const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AssessmentSubmissionSchema = new Schema({
  name: String,
  timestamp: Number,
  q1: {answer: String, correct: Boolean},
  q2: {answer: String, correct: Boolean},
  q3: {answer: String, correct: Boolean},
  q4: {answer: String, correct: Boolean},
  q5: {answer: String, correct: Boolean}
});

const Assessment = mongoose.model('Assessment', AssessmentSubmissionSchema);

module.exports = Assessment;
