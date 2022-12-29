const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
const {DataTypes} = Sequelize;

module.exports = function() {
	const Token = sequelize.define('token', {
		refreshToken: DataTypes.STRING,
	}, 
	{});

	return Token;
};