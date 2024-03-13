import fs from 'fs';
import path from 'path';
import directoryName from '../util/path';

interface ProductType {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
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
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number
  ) {}

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(newPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb: (products: ProductType[]) => void) {
    getProductsFromFile(cb);
  }
}
