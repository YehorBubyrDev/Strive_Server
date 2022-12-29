const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
const {DataTypes} = Sequelize;

module.exports = function() {
	const Company = sequelize.define('company', {
		name: DataTypes.STRING,
	}, 
	{});

	return Company;
};