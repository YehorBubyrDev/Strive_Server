const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const dbConfig = require('../util/db-config');
const {DataTypes} = Sequelize;
const sequelize = new Sequelize(
	dbConfig.DATABASE,
	dbConfig.USER,
	dbConfig.PASSWORD,
	{
		host: dbConfig.HOST,
		dialect: dbConfig.DIALECT,
		define: {
			defaultScope: {
				attributes: { exclude: ['createdAt', 'updatedAt'] }
			},
			timestamps: false
		},
	},
);

class Token extends Model {}
Token.init({
	refreshToken: DataTypes.STRING,
}, { sequelize, modelName: 'token' });

class User extends Model {}
User.init({
	name: DataTypes.STRING,
	surname: DataTypes.STRING,
	email: DataTypes.STRING,
	password: DataTypes.STRING,
	isActivated: {
		type: DataTypes.BOOLEAN, 
		defaultValue: false,
	},
	activationLink: DataTypes.STRING,
}, {sequelize, modelName: 'user'});

class Candidate extends Model {}
Candidate.init({
	name: DataTypes.STRING,
	surname: DataTypes.STRING,
	email: DataTypes.STRING,
	jobTitle: DataTypes.STRING,
	location: DataTypes.STRING,
	isQualified: DataTypes.BOOLEAN,
	selaryExpectation: DataTypes.INTEGER,
}, {sequelize, modelName: 'candidate'});

class Company extends Model {}
Company.init({
	name: DataTypes.STRING,
}, {sequelize, modelName: 'company'});

class Vacancy extends Model {}
Vacancy.init({
	title: DataTypes.STRING,
	description: DataTypes.STRING,
}, {sequelize, modelName: 'vacancy'});

User.Token = User.hasOne(Token);
Token.User = Token.belongsTo(User);

User.Company = User.hasOne(Company);
Company.User = Company.belongsTo(User);

User.Vacancy = User.hasMany(Vacancy);
Vacancy.User = Vacancy.belongsTo(User);

User.Candidate = User.hasMany(Candidate);
Candidate.User = Candidate.belongsTo(User);

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = User;
db.models.Token = Token;
db.models.Company = Company;
db.models.Candidate = Candidate;
db.models.Vacancy = Vacancy;

module.exports = {db, Token, User, Candidate, Company, Vacancy};