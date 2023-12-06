export class ProductRepository {
  constructor(Users, Products, sequelize) {
    this.users = Users;
    this.products = Products;
    this.sequelize = sequelize;
  }

  getAll = async sort => {
    const products = await this.products.findAll({
      attributes: [
        'id',
        'userId',
        'title',
        'contents',
        'status',
        [this.sequelize.col('username'), 'username'],
        'createdAt',
      ],
      include: {
        model: this.users,
        attributes: [],
      },
      order: [['createdAt', sort]],
    });
    return products;
  };

  getProductById = async productId => {
    const products = await this.products.findByPk(productId, {
      attributes: [
        'id',
        'userId',
        'title',
        'contents',
        'status',
        [this.sequelize.col('username'), 'username'],
        'createdAt',
      ],
      include: {
        model: this.users,
        attributes: [],
      },
    });
    return products;
  };
  createProduct = async product => {
    const createdProduct = await this.products.create(product);
    return createdProduct.dataValues;
  };

  updateProduct = async (product, productId) => {
    const createdProduct = await this.products.update(product, {
      where: {
        id: productId,
      },
    });
    return createdProduct[0];
  };

  deleteProduct = async productId => {
    const deleteProduct = await this.products.destroy({
      where: {
        id: productId,
      },
    });
    return deleteProduct;
  };
}
