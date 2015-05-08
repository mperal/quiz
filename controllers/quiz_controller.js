var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	})
};

// GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		if(req.query.respuesta.toLowerCase() === 'roma'){
			res.render('quizes/answer', {respuesta: 'correcta'});
		}else{
			res.render('quizes/answer', {respuesta: 'incorrecta'});
		}
	})
};

// GET /creditos/author
exports.author = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		res.render('creditos/author', {nombre: 'Maria Peral'});
	})
};