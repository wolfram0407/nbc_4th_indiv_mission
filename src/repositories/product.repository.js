export class ProductRepository {
  constructor(Users, Products) {
    this.users = Users;
    this.products = Products;
  }

  getAll = async sort => {
    const products = await this.products.findMany({
      orderBy: [
        {
          createdAt: `${sort.toLowerCase()}`,
        },
      ],
      select: {
        id: true,
        userId: true,
        title: true,
        contents: true,
        price: true,
        status: true,
        createdAt: true,
        Users: {
          select: {
            username: true,
          },
        },
      },
    });
    return products;
  };

  getProductById = async productId => {
    const products = await this.products.findFirst({
      where: {
        id: Number(productId),
      },
      select: {
        id: true,
        userId: true,
        title: true,
        contents: true,
        price: true,
        status: true,
        createdAt: true,
        Users: {
          select: {
            username: true,
          },
        },
      },
    });
    return products;
  };

  createProduct = async product => {
    const createdProduct = await this.products.create({
      data: {
        userId: product.userId,
        title: product.title,
        price: Number(product.price),
        contents: product.contents,
      },
    });
    return createdProduct;
  };

  updateProduct = async (product, productId) => {
    const createdProduct = await this.products.update({
      where: {
        id: Number(productId),
      },
      data: {
        userId: product.userId,
        title: product.title,
        price: Number(product.price),
        contents: product.contents,
      },
    });
    return createdProduct;
  };

  deleteProduct = async productId => {
    const deleteProduct = await this.products.delete({
      where: {
        id: Number(productId),
      },
    });
    return deleteProduct;
  };
}
