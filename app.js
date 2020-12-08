// const http = require('http');
// const port = 3000;
// const routes = require('./routes');

// console.log(routes.someText); 
// const server = http.createServer(routes.handler);

// server.listen(port);
const path = require("path");
const express = require("express");
const port = 8000;
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, './', 'views', '404.html'));
    res.status(404).render('404');
})



app.listen(port, function(err){
    if(err){
        console.log("Error", err);
        return;
    }
    console.log("Server is up and running on port :", port);
})
