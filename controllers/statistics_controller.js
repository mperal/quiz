var numPreguntas = 0;
var numComentarios = 0;
var numMedioComentarios = 0;
var numPreguntasSinComentarios = 0;

exports.statistics = function(req,res) {
	res.render('quizes/statistics.ejs', {
		numPreguntas: numPreguntas, 
		numComentarios:numComentarios,
		numMedioComentarios:numMedioComentarios, 
		numPreguntasSinComentarios:numPreguntasSinComentarios,
		errors: []
	});
};