import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

export const getProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
  const prodId = +req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      console.log(product);
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

export const getIndex = (req: Request, res: Response, next: NextFunction) => {
  Product.fetchAll()
    .then((products) => {
      console.log(products);
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};

// export const getCart = (req: Request, res: Response, next: NextFunction) => {
//   Cart.getCart((cart) => {
//     Product.fetchAll((products) => {
//       const cartProducts: CartProductType[] = [];
//       for (const product of products) {
//         const cartProductData = cart?.products.find(
//           (prod) => prod.id === product.id
//         );
//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.qty });
//         }
//       }
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: cartProducts,
//       });
//     });
//   });
// };

// export const postCart = (req: Request, res: Response, next: NextFunction) => {
//   const prodId: string = req.body.productId;
//   Product.findById(prodId, (product) => {
//     Cart.addProduct(prodId, product.price);
//   });
//   res.redirect('/cart');
// };

// export const postCartDeleteProduct = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, (product) => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect('/cart');
//   });
// };

// export const getOrders = (req: Request, res: Response, next: NextFunction) => {
//   res.render('shop/orders', {
//     path: '/orders',
//     pageTitle: 'Your Orders',
//   });
// };

// export const getCheckout = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout',
//   });
// };
