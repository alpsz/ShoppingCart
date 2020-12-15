const Product = require('../models/product');


module.exports.getAddProduct = (req, res, next) => {
    //console.log("In add-product middleware");
    //res.send("<form action = 'admin/add-product' method='POST'><input type='text' name='title'><button type ='submit'>Add</button></form");
    
    //res.sendFile(path.join(rootDir,'views', "add-product.html"));
    //const products = Product.fetchAll();
    res.render('admin/edit-product', { 
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
        });
}

module.exports.postAddProduct = (req,res, next) =>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    // const product = new Product(null, title, imageUrl, description, price);
    // product
    //     .save().
    //     then(() => {
    //         res.redirect('/');
    //     }).
    //     catch((err) => {console.log(err);});


    //this method was added by sequelize because of the associaltion that we created in app.js
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    .then(result => {
        //console.log(result);
        console.log("Created Product");
        res.redirect('/admin/products');
    })
    .catch((err) => {
        console.log(err);
    })
    // Product.create({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description
    // })
    // .then(result => {
    //     //console.log(result);
    //     console.log("Created Product");
    //     res.redirect('/admin/products');
    // })
    // .catch((err) => {
    //     console.log(err);
    // })
    
}

module.exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user.getProducts({where: {id : prodId}})
    //Product.findByPk(prodId)
    .then(products => {
        const product = products[0];
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', { 
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        });
    })
    .catch(err => {
        console.log(err);
    })
    // Product.findById(prodId, product => {
    //     if(!product){
    //         return res.redirect('/');
    //     }
    //     res.render('admin/edit-product', { 
    //         pageTitle: 'Edit Product',
    //         path: '/admin/edit-product',
    //         editing: editMode,
    //         product: product,
    //     });
    // })   
}

module.exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    //const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    //updatedProduct.save();
    //Product.findByPk(prodId)
    Product
        .findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl;
            return product.save();
        })
        .then(result => {
            console.log("Updated Product!");
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.getProducts =  (req, res, next) => {
    req.user.getProducts()
    //Product.findAll()
    .then(products => {
        
        res.render('admin/products', {
                    prods: products,
                    pageTitle: 'Admin Products',
                    path: '/admin/products'
                  });
    })
    .catch(err => {console.log(err); })
    // Product.fetchAll((products) => {
    //     res.render('admin/products', {
    //         prods: products,
    //         pageTitle: 'Admin Products',
    //         path: '/admin/products'
    //       });
    // });   
}

module.exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product
        .findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('Destroyed Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
    //Product.deleteById(prodId);
}