var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');




/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId',quizController.load);

// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/creditos/:quizId(\\d+)/author', quizController.author);

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);
//router.get('/creditos/author', quizController.author);

module.exports = router;
