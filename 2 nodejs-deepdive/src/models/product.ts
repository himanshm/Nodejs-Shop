import fs from 'fs';
import path from 'path';
import directoryName from '../util/path';
import generateUniqueId from '../util/generateId';

export interface ProductType {
  id: string | null;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  qty?: number;
}

// const products: ProductType[] = [];
const newPath = path.join(directoryName, 'data', 'products.json');

const getProductsFromFile = (cb: (products: ProductType[]) => void) => {
  fs.readFile(newPath, 'utf-8', (err, fileContent) => {
    if (err) {
      return cb([]);
    }

    cb(JSON.parse(fileContent));
  });
};

export class Product {
  static products: ProductType[] = [];
  constructor(
    public id: string | null, // Simply pass null for a new product
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number
  ) {}

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this;
        fs.writeFile(newPath, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = generateUniqueId(); // This id will later be assigned to our product and will be used while editing.
        console.log(this);
        products.push(this);
        fs.writeFile(newPath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id: string) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(newPath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
        }
      });
    });
  }

  static fetchAll(cb: (products: ProductType[]) => void) {
    getProductsFromFile(cb);
  }

  static findById(id: string, cb: (Prod: ProductType) => void) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      if (product) cb(product);
    });
  }
}
