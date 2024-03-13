import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';

export const getAddProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

export const postAddProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const title: string = req.body.title;
  const imageUrl: string = req.body.imageUrl;
  const description: string = req.body.description;
  const price: number = req.body.price;
  const product = new Product(title, imageUrl, description, price); // Watch the order defined in the constructor
  product.save();
  res.redirect('/');
};

export const getProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};
