export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  userInfo = async (req, res, next) => {
    const userId = req.user.id;
    try {
      const userInfo = await this.userService.userInfo(userId);
      return res.status(200).json(userInfo);
    } catch (err) {
      next(err);
    }
  };
}
