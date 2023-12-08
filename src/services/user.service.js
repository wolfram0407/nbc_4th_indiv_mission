import { UserRepository } from '../repositories/user.repository.js';

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  userRepository = new UserRepository();
  userInfo = async userId => {
    const user = await this.userRepository.findUserFK(userId);
    if (!user) {
      throw new Error(`UserNotFound`);
    }
    delete user.password;
    return user;
  };
}
