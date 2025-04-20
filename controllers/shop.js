const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) =>{
    // Product.fetchAll()
    Product.find() //----give the product , not the cursor()
    .then((products)=>{
        console.log('product', products);
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products', 
            isAuthenticated: req.session.isLoggedIn        
           }
        );
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next)=>{ 
    const prodId = req.params.productId; 
    Product.findById(prodId) //------findById is mongoose method not us, convert id into objectId
    .then((product)=>{
        res.render('shop/product-detail',{
            product: product,
            pageTitle: product.title,
            path: '/products',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    // Product.fetchAll()
    Product.find()
    .then((products) =>{
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {  
    // req.user.getCart()
    req.user.populate('cart.items.productId') //---go to product table and fetch product from them and give in productId; do not return promise
    // .execPopulate() ///---convert populate into promise to use then
    .then(user => {
        const products = user.cart.items;
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err));  
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product =>{
        return req.user.addToCart(product);
    })
    .then(result => {
        console.log("add to cart", result);
        res.redirect('/cart');
        
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) =>{
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId)
    .then(result =>{
        console.log('item deleted');
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
}; 

exports.postOrder = (req, res, next) =>{
    // req.user.addOrder()
    req.user.populate('cart.items.productId')
    .then(user => {
        const products = user.cart.items.map(i =>{
        return {quantity: i.quantity, product: {...i.productId._doc}}; //---make an object from _doc mongoseMethod
        });
        const order = new Order({
            user: {name: req.user.name, userId: req.user},
            products: products
        });
        return order.save();
    })
    .then(() =>{
        return req.user.clearCart();
    })
    .then(() =>{
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    // req.user.getOrders()
    Order.find({'user.userId': req.user._id})
    .then(orders =>{
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
        isAuthenticated: req.session.isLoggedIn
    });
};