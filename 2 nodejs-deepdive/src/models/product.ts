import fs from 'fs';
import path from 'path';
import directoryName from '../util/path';
import generateUniqueId from '../util/generateId';

export interface ProductType {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  qty?: number;
}

// const products: ProductType[] = [];
const newPath = path.join(directoryName, 'data', 'products.json');
// https://images.pexels.com/photos/10252340/pexels-photo-10252340.jpeg?auto=compress&cs=tinysrgb&w=800
// It follows Harry Potter, a wizard in his fourth year at Hogwarts School of Witchcraft and Wizardry, and the mystery surrounding the entry of Harry's name into the Triwizard Tournament, in which he is forced to compete. The book was published in the United Kingdom by Bloomsbury and in the United States by Scholastic.

const getProductsFromFile = (cb: (products: ProductType[]) => void) => {
  fs.readFile(newPath, 'utf-8', (err, fileContent) => {
    if (err) {
      return cb([]);
    }

    cb(JSON.parse(fileContent));
  });
};

export class Product {
  id: string;
  static products: ProductType[] = [];
  constructor(
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number
  ) {
    this.id = generateUniqueId();
  }

  save() {
    getProductsFromFile((products) => {
      console.log(this);
      products.push(this);
      fs.writeFile(newPath, JSON.stringify(products), (err) => {
        console.log(err);
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
