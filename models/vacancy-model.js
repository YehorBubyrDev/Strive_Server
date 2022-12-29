const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
const {DataTypes} = Sequelize;

module.exports = function() {
	const Vacancy = sequelize.define('vacancy', {
		title: DataTypes.STRING,
		description: DataTypes.STRING,
	}, 
	{});

	return Vacancy;
};