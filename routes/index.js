var express = require('express');
var multer = require('multer');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');
var userController = require('../controllers/user_controller');
var favouritesController = require('../controllers/favourites_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []});
});

router.get('/author', quizController.author);
router.get('/quizes/statistics', statisticsController.statistics);
router.param('quizId',quizController.load);
router.param('commentId',commentController.load);
router.param('userId', userController.load); // autoload :userId

// Definición de rutas de sesion
router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

// Definición de rutas de cuenta
router.get('/user', userController.new); // formulario sign un
router.post('/user', userController.create); // registrar usuario
router.get('/user/:userId(\\d+)/edit', sessionController.loginRequired, userController.ownershipRequired,userController.edit); // editar información de cuenta
router.put('/user/:userId(\\d+)', sessionController.loginRequired,userController.ownershipRequired, userController.update); // actualizar información de cuenta
router.delete('/user/:userId(\\d+)', sessionController.loginRequired, userController.ownershipRequired,userController.destroy); // borrar cuenta
router.get('/user/:userId(\\d+)/quizes', quizController.index); // ver las preguntas de un usuario
router.get('/user/:userId(\\d+)/favourites', favouritesController.index);
router.put('/user/:userId(\\d+)/favourites/:quizId(\\d+)', favouritesController.fav);
router.delete('/user/:userId(\\d+)/favourites/:quizId(\\d+)',favouritesController.delete);


// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, multer ({dest:'./public/media/'}),quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.ownershipRequired,quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.ownershipRequired, multer ({dest:'./public/media/'}),quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.ownershipRequired,quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sessionController.loginRequired, commentController.ownershipRequired,commentController.publish);



module.exports = router;
