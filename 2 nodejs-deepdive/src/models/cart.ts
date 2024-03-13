import fs from 'fs';
import path from 'path';
import directoryName from '../util/path';
import { ProductType } from './product';

interface CartType {
  products: ProductType[];
  totalPrice: number;
}

const newPath = path.join(directoryName, 'data', 'cart.json');

export class Cart {
  static addProduct(id: string, productPrice: number) {
    let cart: CartType = { products: [], totalPrice: 0 };
    // Fetch the previous cart
    fs.readFile(newPath, 'utf-8', (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id == id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct: ProductType;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = (updatedProduct.qty ?? 0) + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
        // updatedProduct.qty =
        //   (updatedProduct.qty !== undefined ? updatedProduct.qty : 0) + 1;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(newPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
}