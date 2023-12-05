export class AuthRepository {
  constructor(Users) {
    this.Users = Users;
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
}
