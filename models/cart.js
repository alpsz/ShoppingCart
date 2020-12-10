const fs = require('fs');
const path = require('path');


const p = path.join(
    path.dirname(__dirname),
    'data',
    'cart.json'
)

module.exports = class Cart {
    static addProduct(id, productPrice){
        //Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products :[], totalPrice: 0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product/ increse quantity
            if (existingProduct){
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                console.log(cart);
                cart.products = [...cart.products];
                console.log(cart);
                cart.products[existingProductIndex] = updatedProduct;
                console.log(cart);
            } else {
                updatedProduct = {id : id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        })

        
        
    }


}