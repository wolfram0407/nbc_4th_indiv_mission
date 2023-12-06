import { AuthRepository } from '../repositories/auth.repository.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  authRepository = new AuthRepository();

  // 회원 가입
  registerUser = async (email, password, username) => {
    const findUser = await this.authRepository.findAllUsers(email);
    if (!findUser) {
      throw new Error('ExistEmail');
    }
    const newUser = {
      email,
      password,
      username,
    };
    const createUser = await this.authRepository.createUser(newUser);
    return createUser;
  };
  //로그인
  loginUser = async (email, password) => {
    const user = await this.authRepository.findOneUser(email);
    if (!user) {
      throw new Error('EmailNotFound');
    }
    const comparePW = await user.comparePassword(user, password);
    if (!comparePW) {
      throw new Error('PasswordNotCorrect');
    }
    const accessToken = jwt.sign(
      { id: user.dataValues.id },
      process.env.SECRETTEXT,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      { userId: user.dataValues.id },
      process.env.REFRESHSECRETTEXT,
      { expiresIn: '1d' }
    );
    await this.authRepository.saveRefresh(refreshToken, user.dataValues.id);

    const returnUser = {
      ...user.dataValues,
      accessToken,
      refreshToken,
    };
    delete returnUser.password;
    return returnUser;
  };
}
