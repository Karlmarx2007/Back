import Product, { IProduct } from './../models/product';

export class ProductController {

  public async getOne(id: string) {

  }
  // public async getAll(): Promise<IProduct[]> {
  //   const products = await Product.find({});
  //   return products;
  // }

  public async save(data: IProduct) {
    const product = new Product(data);
    product.save();
  }

  // public async getAll() {
  // }
}