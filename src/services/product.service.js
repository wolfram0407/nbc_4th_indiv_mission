import { ProductRepository } from '../repositories/product.repository.js';
export class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  productRepository = new ProductRepository();

  getAllProducts = async () => {
    const products = await this.productRepository.getAll();
    return products;
  };

  getProductById = async productId => {
    const products = await this.productRepository.getProductById(productId);
    return products;
  };

  createProduct = async (userId, title, contents, price) => {
    const product = {
      userId,
      title,
      price,
      contents,
    };
    const newProduct = await this.productRepository.createProduct(product);
    return newProduct;
  };

  updateProduct = async (data, productId) => {
    const updateProduct = await this.productRepository.updateProduct(data, productId);
    if (!updateProduct) {
      return new Error('Product Update failed');
    }
    return updateProduct;
  };

  deleteProduct = async productId => {
    console.log(productId);
    const deleteProduct = await this.productRepository.deleteProduct(productId);
    return deleteProduct;
  };
}
