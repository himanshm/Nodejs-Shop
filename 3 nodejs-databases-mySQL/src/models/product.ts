import { Cart } from './cart';
import db from '../util/database';
import { RowDataPacket } from 'mysql2';

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

  static async fetchAll(): Promise<RowDataPacket[]> {
    const [rows, _] = await db.execute<RowDataPacket[]>(
      'SELECT * FROM products'
    );
    return rows;
  }

  static async findById(id: number): Promise<RowDataPacket> {
    const [rows, _] = await db.execute<RowDataPacket[]>(
      'SELECT * FROM products WHERE products.id = ?',
      [id]
    );
    return rows[0];
  }
}
