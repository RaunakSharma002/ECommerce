const path = require('path');



const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session); //----store session in mongoDbStorage

const errorController = require('./controllers/error');
const User = require('./models/user');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;


const app = express(); 
const store = new MongoDbStore({
    uri: MONGODB_URI,
    collection: 'sessions',

});

app.set('view engine', 'ejs'); 
app.set('views', 'views'); 

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
 

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ //---save on server side
    secret: 'my secret',
     resave: false, saveUninitialized: false, //----resave: false; means session will not be saved on every req/res
      store: store,
    //   cookie: {}
})); 


app.use((req, res, next) =>{
    /**this middleware run on every incoming req before our routes handle it, 
     so we data store here use in same req cycle in routes handler, so not store data in data at end of lifeCycle
    */
    if(!req.session.user){
       return next();
    }
    User.findById(req.session.user._id)
    .then(userA =>{
        // req.user = new User(user.name, user.email, user.cart, user._id);
        req.user = userA;
        // console.log('user', req.user);
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes); 
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

// app.listen(3000);
// mongoConnect(() =>{
//     app.listen(3000);
// });
mongoose.connect( MONGODB_URI )
.then(result=>{
    User.findOne().then(user=>{ //----give the first user in database
        if(!user){ //---if user is not exist then create user
            const user = new User({name: 'Raunak', email: 'raunak@gmail.com', cart: {
                items: []
            }});
            user.save();
        }
    });
    app.listen(process.env.PORT || 3001);

    // app.listen(3001);
})
.catch(err => {console.log(err)});
