export class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProducts = async (req, res, next) => {
    try {
      const allProducts = await this.productService.getAllProducts();
      return res.status(200).send(allProducts);
    } catch (err) {
      next(err);
    }
  };
  getProductById = async (req, res, next) => {
    const { productId } = req.params;
    try {
      const allProducts = await this.productService.getProductById(productId);
      return res.status(200).send(allProducts);
    } catch (err) {
      next(err);
    }
  };

  postProduct = async (req, res, next) => {
    const userId = req.user.id;
    const { title, contents, price } = req.body;
    try {
      await this.productService.createProduct(userId, title, contents, price);
      return res.status(201).json({
        message: '등록되었습니다.',
      });
    } catch (err) {
      next(err);
    }
  };

  updateProduct = async (req, res, next) => {
    const productId = req.params.productId;
    const updateDate = {
      title: req.body.title,
      contents: req.body.contents,
      price: req.body.price,
      status: req.body.status,
    };
    try {
      const updateProduct = await this.productService.updateProduct(updateDate, productId);
      return res.status(201).json({
        message: '수정되었습니다.',
      });
    } catch (err) {
      next(err);
    }
  };

  deleteProduct = async (req, res, next) => {
    const userId = req.user.id;
    const productId = req.params.productId;

    const deleteProduct = await this.productService.deleteProduct(productId);
    if (!deleteProduct) {
    }
    return res.status(201).json({
      message: '상품 삭제하였습니다.',
    });
  };
}
