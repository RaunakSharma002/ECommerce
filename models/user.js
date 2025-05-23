const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({ //---making object and their constructor
    name: {type: String, required: true},
    email: {type: String, required: true},
    cart: {
        items: [{productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
             quantity: {type: Number, require: true}}]
    }
});

userSchema.methods.addToCart = function(product){
    //----writing own logic for userDefined addToCart
    const cartProductIndex = this.cart.items.findIndex(cp =>{
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if(cartProductIndex >= 0){
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    }else{
        updatedCartItems.push({ productId: product._id, quantity: newQuantity});
    }
    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.removeFromCart = function(prodId) {
    const updatedCartItems = this.cart.items.filter(item =>{
        return item.productId.toString() !== prodId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart = {items: []};
    return this.save();
}

module.exports = mongoose.model('User', userSchema);


// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// const ObjectId = mongodb.ObjectId;
// class User{
//     constructor(username, email, cart, userId){
//         this.name = username;
//         this.email = email;
//         this._id = userId;
//         this.cart = cart;
//     }
//     save(){
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }
//     addToCart(product){
//         const cartProductIndex = this.cart.items.findIndex(cp =>{
//             return cp.productId.toString() === product._id.toString();
//         });
//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];
//         if(cartProductIndex >= 0){
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         }else{
//             updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity});
//         }
//         const updatedCart = { items: updatedCartItems };
//         const db = getDb();
//         return db.collection('users').updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}});
//     }
//     getCart(){
//         const db = getDb();
//         const productsIds = this.cart.items.map(i =>{
//             return i.productId;
//         });
//         return db.collection('products').find({_id: {$in: productsIds}}).toArray()
//         .then(products =>{
//             return products.map(p =>{
//                 return {...p, 
//                     quantity: this.cart.items.find(i =>{
//                         return i.productId.toString() === p._id.toString();
//                     }).quantity
//                 }
//             })
//         });
//     }
//     deleteItemFromCart(prodId){
//         const updatedCartItems = this.cart.items.filter(item =>{
//             return item.productId.toString() !== prodId.toString();
//         });
//         const db = getDb();
//         return db.collection('users').updateOne({_id: new ObjectId(this._id)}, 
//         {$set: {cart: {items: updatedCartItems}}});
//     }
//     addOrder(){
//         const db = getDb();
//         return this.getCart().then(products => {   
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new ObjectId(this._id),
//                     name: this.name
//                 }
//             };
//             return db.collection('orders').insertOne(order);
//         })
//         .then(result =>{
//             this.cart = {items: []}
//             return db.collection('users').updateOne({_id: new ObjectId(this._id)},
//              {$set: { cart: {items: []}}});
//         })
//     }
//     getOrders(){
//         const db = getDb();
//         return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray();
//     }
//     static findById(userId){
//         const db = getDb();
//         return db.collection('users').findOne({_id: new ObjectId(userId)})
//         .then(user =>{
//             console.log('user', user);
//             return user;
//         })
//         .catch(err => console.log(err));
//     }
// }
// module.exports = User;

/**
 1). each user has one cart, so we don't need to make cart model or collection for mongodb
    we can embed cart against to each user
 2).  ecah user has many order so, we have to make new table(collection) of order
 */