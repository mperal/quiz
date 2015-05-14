// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{ pregunta: {
			DataTypes.STRING,
			validate: {notEmpty: {msg "-> Falta Pregunta"}}
		},
		  respuesta: {
		  	DataTypes.STRING,
		  	validate: {notEmpty: {msg "-> Falta Respuesta"}}
			}
		});
}