const User = require("../models/user");

exports.getLogin = (req, res, next) =>{
    // console.log('session',req.get('Cookie'));
    // const isLoggedIn = req.get('Cookie').split('=')[1]; //--getting Cookie store in req of browser
    res.render('auth/login',{
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false,
    });
};

exports.postLogin = (req, res, next) =>{
    /* data strored in req can be used as long as we working on same req
        we get the req and store it but when we send the response , this data get lost;
        session: cookie which expire data is past date
    */
    // req.isLoggedIn = true; //-------store in middleware; if not define then null(false)
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly'); //-----cookies: global variable but different for each user    
    // req.session.isLoggedIn = true;
    // res.redirect('/'); //-----new brand request is created

    User.findById('65fefa8e64e1c9169a6927d2')
    .then(user=>{
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err)=>{
            console.log(err);
            res.redirect('/');
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) =>{
   /* for logout clear the session */
   req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/');
   });
};


/** 1). data strored in req can be used as long as we working on same req
        we get the req and store it but when we send the response , this data get lost;
    2). Cookie: global variable where we store data(on client side browser), which is different from evey browser
    3). Session: not store data in database but in memory and identify as cookie in browser
      */
