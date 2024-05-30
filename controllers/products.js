const { Products } = require("../model/products");

exports.getAddProducts = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.getPostProducts = (req, res, next) => {
  const products = new Products(req.body.title);
  products.saveProduct();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  const allProducts = Products.fetchAllProducts()
  res.render('shop', {
    prods: allProducts,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: allProducts.length > 0,
    activeShop: true,
    productCSS: true
  });
};