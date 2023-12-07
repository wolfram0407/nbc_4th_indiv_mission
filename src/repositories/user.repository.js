export class UserRepository {
  constructor(Users) {
    this.users = Users;
  }

  findUserFK = async userId => {
    const user = await this.users.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  };
}
