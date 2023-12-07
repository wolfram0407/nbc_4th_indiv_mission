import bcrypt from 'bcrypt';

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  // 회원가입
  postSingUp = async (req, res, next) => {
    const { email, password, passwordConfirm, username } = req.body;
    try {
      if (password !== passwordConfirm) {
        throw Error('password confirm not matched');
      } //validator 에서 하자
      const user = await this.authService.registerUser(
        email,
        password,
        username
      );
      return res
        .status(201)
        .json({ data: user, message: '회원가입이 되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  // 로그인
  postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await this.authService.loginUser(email, password);
      req.user = user.id;
      res.cookie('accessToken', user.accessToken);
      res.cookie('refreshToken', user.refreshToken);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
}
