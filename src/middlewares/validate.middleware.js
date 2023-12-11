import { validationResult } from 'express-validator';
import { body } from 'express-validator';

export const emailValidation = body('email')
  .trim()
  .notEmpty()
  .isEmail()
  .withMessage('email을 확인해주세요.');

export const passwordValidation = body('password')
  .trim()
  .notEmpty()
  .isLength({ min: 6 })
  .withMessage('password를 확인해주세요.');

export const passwordConfirmValidation = body('passwordConfirm')
  .trim()
  .notEmpty()
  .isLength({ min: 6 })
  .withMessage('passwordConfirm를 확인해주세요.');

export const usernameValidation = body('username')
  .trim()
  .notEmpty()
  .withMessage('username 을 입력해주세요.');

export const titleValidation = body('title')
  .trim()
  .notEmpty()
  .withMessage('title를 확인해주세요.');

export const contentsValidation = body('contents')
  .trim()
  .notEmpty()
  .withMessage('contents를 확인해주세요.');

export const priceValidation = body('price')
  .trim()
  .notEmpty()
  .withMessage('price를 확인해주세요.');

export const statusValidation = body('status')
  .trim()
  .notEmpty()
  .withMessage('status를 확인해주세요.');

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array() });
}
