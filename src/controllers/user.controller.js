export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  userInfo = async (req, res, next) => {
    const userId = res.locals.user;
    const newAccessToken = req.cookies.accessToken === res.locals.accessToken;

    try {
      const userInfo = await this.userService.userInfo(userId);
      if (!newAccessToken) {
        res.cookie('accessToken', res.locals.accessToken);
      }
      return res.status(200).json(userInfo);
    } catch (err) {
      next(err);
    }
  };
}
