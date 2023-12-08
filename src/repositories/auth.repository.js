export class AuthRepository {
  constructor(Users, redis) {
    this.users = Users;
    this.redis = redis;
  }

  findAllUsers = async inputEmail => {
    const user = await this.users.findFirst({
      where: {
        email: inputEmail,
      },
    });

    return user ? false : true;
  };

  createUser = async user => {
    const newUser = await this.users.create({
      data: user,
    });
    delete newUser.password;
    return newUser;
  };

  findOneUser = async email => {
    const user = await this.users.findFirst({
      where: {
        email,
      },
    });
    return user;
  };

  saveRefresh = async (refreshToken, userId) => {
    this.redis.connect();
    await this.redis.set(refreshToken, userId);
    await this.redis.expire(refreshToken, 60 * 60 * 24);
    this.redis.quit();
  };
}
