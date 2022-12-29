const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
const {DataTypes} = Sequelize;

module.exports = function() {
	const User = sequelize.define('user', {
		name: DataTypes.STRING,
		surname: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		isActivated: {
			type: DataTypes.BOOLEAN, 
			defaultValue: false,
		},
		activationLink: DataTypes.STRING,
	}, 
	{});
	return User;
};