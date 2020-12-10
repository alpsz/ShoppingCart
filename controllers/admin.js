const Product = require('../models/product');


module.exports.getAddProduct = (req, res, next) => {
    //console.log("In add-product middleware");
    //res.send("<form action = 'admin/add-product' method='POST'><input type='text' name='title'><button type ='submit'>Add</button></form");
    
    //res.sendFile(path.join(rootDir,'views', "add-product.html"));
    //const products = Product.fetchAll();
    res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });
}

module.exports.postAddProduct = (req,res, next) =>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

module.exports.getProducts =  (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
          });
    });   
}