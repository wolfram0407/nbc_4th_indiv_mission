import { ProductRepository } from '../repositories/product.repository.js';
export class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  productRepository = new ProductRepository();

  getAllProducts = async sort => {
    console.log(sort);
    const products = await this.productRepository.getAll(sort);
    return products;
  };

  getProductById = async productId => {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      throw new Error('notFoundProduct');
    }
    return product;
  };

  createProduct = async (userId, title, contents, price) => {
    const product = {
      userId,
      title,
      price,
      contents,
    };
    const newProduct = await this.productRepository.createProduct(product);
    if (!newProduct) throw new Error('Product Create failed');
    return newProduct;
  };

  updateProduct = async (data, productId) => {
    const updateProduct = await this.productRepository.updateProduct(
      data,
      productId
    );
    if (!updateProduct) {
      return new Error('Product Update failed');
    }
    return updateProduct;
  };

  deleteProduct = async productId => {
    const deleteProduct = await this.productRepository.deleteProduct(productId);
    if (!deleteProduct) {
      return new Error('Product delete failed');
    }
    return deleteProduct;
  };
}
