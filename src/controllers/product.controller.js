export class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getAllProducts = async (req, res, next) => {
    const sort = req.query.sort ? req.query.sort : 'DESC';
    const newAccessToken = req.cookies.accessToken === res.locals.accessToken;
    try {
      const allProducts = await this.productService.getAllProducts(sort);

      if (!newAccessToken) {
        res.cookie('accessToken', res.locals.accessToken);
      }
      return res.status(200).send(allProducts);
    } catch (err) {
      next(err);
    }
  };
  getFindProductById = async (req, res, next) => {
    const newAccessToken = req.cookies.accessToken === res.locals.accessToken;
    const { productId } = req.params;

    try {
      const allProducts = await this.productService.getProductById(productId);
      if (!newAccessToken) {
        res.cookie('accessToken', res.locals.accessToken);
      }
      return res.status(200).send(allProducts);
    } catch (err) {
      next(err);
    }
  };

  postCreateProduct = async (req, res, next) => {
    const newAccessToken = req.cookies.accessToken === res.locals.accessToken;
    const userId = res.locals.user;
    const { title, contents, price } = req.body;
    try {
      await this.productService.createProduct(userId, title, contents, price);
      if (!newAccessToken) {
        res.cookie('accessToken', res.locals.accessToken);
      }
      return res.status(201).json({
        message: '등록되었습니다.',
      });
    } catch (err) {
      next(err);
    }
  };

  postUpdateProduct = async (req, res, next) => {
    const newAccessToken = req.cookies.accessToken === res.locals.accessToken;
    const productId = res.locals.product;
    const updateData = {
      title: req.body.title,
      contents: req.body.contents,
      price: req.body.price,
      status: req.body.status,
    };
    try {
      await this.productService.updateProduct(updateData, productId);
      if (!newAccessToken) {
        res.cookie('accessToken', res.locals.accessToken);
      }
      return res.status(201).json({
        message: '수정되었습니다.',
      });
    } catch (err) {
      next(err);
    }
  };

  postDeleteProduct = async (req, res, next) => {
    const newAccessToken = req.cookies.accessToken === res.locals.accessToken;
    const productId = res.locals.product;
    try {
      await this.productService.deleteProduct(productId);
      if (!newAccessToken) {
        res.cookie('accessToken', res.locals.accessToken);
      }
      return res.status(201).json({
        message: '상품 삭제하였습니다.',
      });
    } catch (err) {
      next(err);
    }
  };
}
