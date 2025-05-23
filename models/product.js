const mongoose = require('mongoose'); //---mapping the schema and query with object 

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', ///----(creating  relation): id is that which use made in User model
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema); //--mongoose make collection(products) from Product




// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// module.exports = class Product {
//     constructor(title, price, description, imageUrl, prodId, userId){
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price; 
//         this._id = prodId ? new mongodb.ObjectId(prodId) : null;
//         //---make user model and save when create a product(make user at last)
//         this.userId = userId
//     }
//     save(){
//         const db = getDb();
//         let dbOp;
//         if(this._id){
//             dbOp = db.collection('products')
//             .updateOne({_id: this._id}, {$set: this});
//         }else{
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp.then(result =>{
//             console.log('result',result);
//         }).catch(err=>{console.log(err)});
//     }
//     static deleteById(prodId) {
//         const db = getDb();
//         return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
//         .then(result =>{
//             console.log('deleted');
//         })
//         .catch(err => console.log(err));
//     }
//     static fetchAll(){
//         const db = getDb();
//         return db.collection('products').find()
//         .toArray()
//         .then(products =>{
//             console.log('products', products);
//             return products;
//         })
//         .catch(err => console.log(err));  
//     }
//     static findById(prodId){
//         const db = getDb();
//         return db.collection('products').find({_id: new mongodb.ObjectId(prodId)})
//         .next()
//         .then(product => {
//             console.log('product', product);
//             return product;
//         })
//         .catch(err => console.log(err)); 
//     }
// }