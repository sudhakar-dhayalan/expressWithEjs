const products = [];

exports.Products = class Products {
  constructor(t) {
    this.title = t
  }

  static fetchAllProducts() {
    return products;
  }
  
  saveProduct() {
    products.push({ title: this.title });
    console.log(products);
  }
};
