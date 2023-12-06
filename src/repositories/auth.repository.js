export class AuthRepository {
  constructor(Users, redis) {
    this.Users = Users;
    this.redis = redis;
  }

  findAllUsers = async inputEmail => {
    const user = await this.Users.findAll({
      where: {
        email: inputEmail,
      },
    });
    return user;
  };

  createUser = async user => {
    const newUser = await this.Users.create(user);
    const existedUser = newUser.dataValues;
    delete existedUser.password;
    return existedUser;
  };

  findOneUser = async email => {
    const user = await this.Users.findOne({
      where: {
        email,
      },
    });
    return user;
  };

  saveRefresh = async (refreshToken, userId) => {
    this.redis.on('connect', () => {
      console.info('Redis connected!');
    });
    this.redis.on('error', err => {
      console.error('Redis Client Error', err);
    });
    // 연결 종료 이벤트
    this.redis.on('end', () => {
      console.log('Redis Disconnected');
    });
    this.redis.connect();
    await this.redis.set(refreshToken, userId);
    await this.redis.expire(refreshToken, 60 * 24);
    await this.redis.quit();
  };
}
