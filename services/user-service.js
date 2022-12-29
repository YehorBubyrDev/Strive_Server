const bcrypt = require('bcrypt');
const uuid = require('uuid');
const {User} = require('../models/index');
// const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
  async regestration(email, password) {
    const candidate = await User.findOne({where: {email}});
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await User.create({email, password: hashPassword, activationLink});

    // TODO: WHEN YOU WILL HAVE ENOUGH TIME DEAL WITH MAIL SERVICE
    // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    console.log('-----------------');
    console.log(userDto);
    console.log('Activation link', `${process.env.API_URL}/api/activate/${activationLink}`);
    console.log('-----------------');
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }

  async activate(activationLink) {
    const user = User.findOne({where: {activationLink}});
    if(!user) {
      throw ApiError.BadRequest("Incorrect activation link");
    }
    user.isActivated
    await User.update({ isActivated: true }, {
      where: {
        activationLink: activationLink
      }
    });
  }

  async login(email, password){
    const user  = await User.findOne({where: {email}});
    if(!user){
      throw ApiError.BadRequest(`User not existed with such email ${email}`);
    }
  
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if(!isPasswordEquals) {
      throw ApiError.BadRequest(`Wrong password`);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }

  async logout(refreshToken){
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

async refresh(refreshToken) {
  if (!refreshToken) {
      throw ApiError.UnauthorizedError();
  }
  const userData = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDb = await tokenService.findToken(refreshToken);
  if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
  }
  const user = await User.findByPk(userData.id);
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({...userDto});

  await tokenService.saveToken(userDto.id, tokens.refreshToken);
  return {...tokens, user: userDto}
}

  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
}

module.exports = new UserService();