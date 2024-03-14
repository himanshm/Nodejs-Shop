import { Cart } from './cart';
import db from '../util/database';

export class Product {
  static products = [];
  constructor(
    public id: string | null, // Simply pass null for a new product
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number
  ) {}

  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id: string) {}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id: string) {}
}
