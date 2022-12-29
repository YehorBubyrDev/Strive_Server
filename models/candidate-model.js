const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
const {DataTypes} = Sequelize;

module.exports = function() {
	const Candidate = sequelize.define('candidate', {
		name: DataTypes.STRING,
		surname: DataTypes.STRING,
		email: DataTypes.STRING,
		jobTitle: DataTypes.STRING,
		location: DataTypes.STRING,
		isQualified: DataTypes.BOOLEAN,
		selaryExpectation: DataTypes.INTEGER,
	}, 
	{});

	return Candidate;
};