class ErrorHandler {
  static ErrorHandler(err, req, res, next) {
    const errorRes = ErrorHandler.getErrorResponse(err.message);
    if (errorRes) {
      return res
        .status(errorRes.statusCode)
        .json({ errorMessage: errorRes.message });
    }
    return res.status(500).json({ errorMessage: errorRes.message });
  }

  static getErrorResponse(errorMessage) {
    const errorMap = {
      'Exist Email': { statusCode: 400, message: '이미 사용인 이메일 입니다.' },
      'password confirm not matched': {
        statusCode: 400,
        message: '패스워드가 일치하지 않습니다!',
      },
      'Need login': {
        statusCode: 401,
        message: '로그인을 해주세요!',
      },
      'Access Forbidden': {
        statusCode: 401,
        message: '권한이 없습니다.',
      },
      'Email Not Found': {
        statusCode: 404,
        message: '이메일을 확인해주세요.',
      },
      'Not Found Product': {
        statusCode: 404,
        message: '상품이 없습니다.',
      },
      'Product Create failed': {
        statusCode: 500,
        message: '상품이 없습니다.',
      },
      'Product Update failed': {
        statusCode: 500,
        message: '수정에 실패하였습니다',
      },
      'Product delete failed': {
        statusCode: 500,
        message: '삭제에 실패하였습니다',
      },
    };

    return errorMap[errorMessage];
  }
}

export default ErrorHandler.handleErrors;
