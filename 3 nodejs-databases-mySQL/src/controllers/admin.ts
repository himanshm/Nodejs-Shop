import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';

export const getAddProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
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
  const product = new Product(null, title, imageUrl, description, price); // Watch the order defined in the constructor
  product.save();
  res.redirect('/');
};

export const getEditProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    });
  });
};

export const postEditProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Fetch Information for the product
  const prodId: string = req.body.productId;
  const updatedTitle: string = req.body.title;
  const updatedImageUrl: string = req.body.imageUrl;
  const updatedPrice: number = req.body.price;
  const updatedDescription: string = req.body.description;
  //Create a new product instance and populate it with the above information
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  );
  // Save the updated product
  updatedProduct.save();
  res.redirect('/admin/products');
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

export const postDeleteProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
