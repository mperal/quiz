var models = require('../models/models.js');



exports.statistics = function(req,res) {
	var numPreguntas=0;
	var numComentarios=0;
	var numMedioComentarios=0;
	var numPreguntasConComentarios=0;
	var quiz = req.quiz;
	var i=0;
	models.Comment.findAll().then(function(comment){
		numComentarios=comment.length;
	});
	models.Quiz.findAll({include: [{model: models.Comment}]}).then(function(quizes){
		numPreguntas=quizes.length;
		for(i=0;i<numPreguntas;i++){
			if(quizes[i].Comments.length)numPreguntasConComentarios++;
		}
		// si hay preguntas, se reinicializa numMedioComentarios
		if(numPreguntas) numMedioComentarios = numComentarios/numPreguntas;

		res.render('quizes/statistics.ejs', {
		numPreguntas: numPreguntas, 
		numComentarios:numComentarios,
		numMedioComentarios:numMedioComentarios, 
		numPreguntasConComentarios:numPreguntasConComentarios,
		errors: []
		});
	});



	
	
};