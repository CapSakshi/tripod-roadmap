const express = require('express');
const { protect } = require('../middleware/auth');
const QuizResult = require('../models/QuizResult');
const quizzes = require('../data/quizzes');

const Roadmap = require('../models/Roadmap');

const router = express.Router();

// Helper to find correct quiz key based on roadmap title
const getQuizKey = (title) => {
  if (!title) return 'frontend';
  const t = title.toLowerCase();
  if (t.includes('front')) return 'frontend';
  if (t.includes('react') && t.includes('advanced')) return 'reactadvanced';
  if (t.includes('back')) return 'backend';
  if (t.includes('devops')) return 'devops';
  if (t.includes('cloud')) return 'cloud';
  if (t.includes('cyber') || t.includes('security')) return 'cybersecurity';
  if (t.includes('ai') || t.includes('machine') || t.includes('data science')) return 'aiml';
  if (t.includes('database') || t.includes('sql')) return 'database';
  if (t.includes('mobile') || t.includes('android') || t.includes('ios')) return 'mobile';
  if (t.includes('block') || t.includes('web3')) return 'blockchain';
  if (t.includes('data structure') || t.includes('dsa') || t.includes('algorithm')) return 'dsa';
  if (t.includes('python')) return 'python';
  if (t.includes('java')) return 'java';
  if (t.includes('system design')) return 'systemdesign';
  if (t.includes('typescript')) return 'typescript';
  if (t.includes('game')) return 'gamedev';
  if (t.includes('ui') || t.includes('ux')) return 'uiux';
  if (t.includes('data engineer')) return 'dataengineering';
  if (t.includes('linux')) return 'linuxadmin';
  if (t.includes('api')) return 'apidesign';
  return 'frontend';
};

// GET /api/quiz/:roadmapId - get quiz questions (without correct answers)
router.get('/:roadmapId', protect, async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.roadmapId);
  if (!roadmap) {
    return res.status(404).json({ success: false, message: 'Roadmap not found' });
  }
  
  const quizKey = getQuizKey(roadmap.title);
  const quiz = quizzes[quizKey];
  
  if (!quiz) {
    return res.status(404).json({ success: false, message: 'Quiz not found for this roadmap' });
  }

  const sanitized = quiz.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options
  }));

  res.json({ success: true, questions: sanitized });
});

// POST /api/quiz/:roadmapId/submit
router.post('/:roadmapId/submit', protect, async (req, res) => {
  try {
    const { answers } = req.body; // { questionId: selectedIndex }
    const roadmapId = req.params.roadmapId;
    
    const roadmap = await Roadmap.findById(roadmapId);
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });
    
    const quizKey = getQuizKey(roadmap.title);
    const quiz = quizzes[quizKey];

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    let score = 0;
    const results = quiz.map(q => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correct;
      if (isCorrect) score++;
      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        selectedAnswer: selected,
        correctAnswer: q.correct,
        isCorrect
      };
    });

    const percentage = Math.round((score / quiz.length) * 100);

    await QuizResult.create({
      user: req.user._id,
      roadmapId,
      score,
      totalQuestions: quiz.length,
      percentage,
      answers: results.map(r => ({
        questionId: r.questionId,
        selectedAnswer: r.selectedAnswer,
        isCorrect: r.isCorrect
      }))
    });

    res.json({
      success: true,
      results: { score, totalQuestions: quiz.length, percentage, details: results }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/quiz/:roadmapId/results - get user's best result
router.get('/:roadmapId/results', protect, async (req, res) => {
  try {
    const results = await QuizResult.find({
      user: req.user._id,
      roadmapId: req.params.roadmapId
    }).sort({ completedAt: -1 }).limit(5);

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
