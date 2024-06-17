const fs = require('fs');
const path = require('path');

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getFileContents = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (!err && fileContent.byteLength != 0) {
      const data = JSON.parse(fileContent);
      cb(data);
    } else {
      cb([]);
    }
  });
};
exports.Products = class Products {
  constructor(t) {
    this.title = t;
  }

  static fetchAllProducts(cb) {
    getFileContents(cb);
  }

  saveProduct(cb) {
    getFileContents((fileContent) => {
      fileContent.push({ title: this.title });
      fs.writeFile(filePath, JSON.stringify(fileContent), (err) => {
        console.log(err);
        if (!err) {
          cb();
        }
      });
    });
  }
};
