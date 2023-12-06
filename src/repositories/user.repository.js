export class UserRepository {
  constructor(Users) {
    this.users = Users;
  }

  findUserFK = async userId => {
    const user = await this.users.findByPk(userId);
    return user.dataValues;
  };
}
