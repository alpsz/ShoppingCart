
///// Simple Sql Database Connection 

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'mysql@123'
// });

// module.exports = pool.promise();



///// Sequelize(A node js library for sql) database connection

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'mysql@123', {dialect: 'mysql', host: 'localhost'});

// module.exports = sequelize;




///// Simple mongodb connection
let _db;
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://alps123:alpsmongodb@123@cluster0.jlyhv.mongodb.net/shopping-cart?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
};

const getDb = () => {
    if(_db) {
        return _db;
    }

    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;



