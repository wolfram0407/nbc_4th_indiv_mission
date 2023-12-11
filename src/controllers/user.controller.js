export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  userInfo = async (req, res, next) => {
    const userId = res.locals.user;
    try {
      const userInfo = await this.userService.userInfo(userId);

      return res.status(200).json(userInfo);
    } catch (err) {
      next(err);
    }
  };
}
