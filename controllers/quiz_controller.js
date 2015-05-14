var models = require('../models/models.js');

// Autoload : id
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else{ next(new Error('No existe quizId=' + quizId))}
		}
	).catch(function(error){next(error);});
};


// GET /quizes
exports.index = function(req, res){
	if(req.query.search){
		models.Quiz.findAll({where: ["pregunta like ?", "%"+req.query.search.replace(" ","%")+"%"]}).then(
			function(quizes){
				res.render('quizes/index.ejs', {quizes: quizes, errors: []});
			}
		).catch(function(error){next(error);});
	}else{
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs',{quizes:quizes, errors: []});
		}).catch(function(error){next(error);});
	}
};

// GET /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show.ejs', {quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
	if(req.query.respuesta === req.quiz.respuesta){
		res.render('quizes/answer.ejs', {quiz: req.quiz, respuesta: 'correcta', errors: []});
	}else{
		res.render('quizes/answer.ejs', {quiz: req.quiz, respuesta: 'incorrecta.', errors: []});
	}
	
};

// GET /creditos/author
exports.author = function(req, res){
	res.render('author.ejs', {quiz: req.quiz});
};

// GET /quizes/new
exports.new = function(req, res) {
 var quiz = models.Quiz.build(
 {pregunta: "Pregunta", respuesta: "Respuesta"}
 );

 res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
 var quiz = models.Quiz.build( req.body.quiz );

quiz
 .validate()
 .then(
 	function(err){
 		if (err) {
 			res.render('quizes/new', {quiz: quiz, errors: err.errors});
 		} else {
 			quiz // save: guarda en DB campos pregunta y respuesta de quiz
 			.save({fields: ["pregunta", "respuesta"]})
 			.then( function(){ res.redirect('/quizes')})
 		} // res.redirect: Redirección HTTP a lista de preguntas
 	}
 );
};