// GET /quizes/question
exports.question = function(req, res){
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function(req, res){
	if(req.query.respuesta.toLowerCase() === 'roma'){
		res.render('quizes/answer', {respuesta: 'correcta'});
	}else{
		res.render('quizes/answer', {respuesta: 'incorrecta'});
	}
};

// GET /creditos/author
exports.author = function(req, res){
	res.render('creditos/author', {nombre: 'Maria Peral'});
};