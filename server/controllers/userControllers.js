require ('mongoose');
const passport = require('passport');
//require('../utils/auth')(passport);
require('../config/passport');
const { verifyJWT } = require('../utils/jwt');
const bcrypt = require('bcryptjs'),
    users = require('../models/users'),
    jwt = require('jsonwebtoken');
    //User = require('../models/users');

const signUp = ((req, res, next) => {
    console.log("En el signup");
    passport.authenticate('register', (err, user, info) => {
        if (err) return console.log(error);
        if (info) return res.json(info);
        req.login(user, err => {
            const data = {
                username: req.body.username,
                email: 'newfake@email'
            };
        users.findOneAndUpdate({ username: data.username }, data)
            .then(console.log("usuario creado otravez con exito!"))
            //.then(res.status(200).send({ message: 'user rerecreated!'}));
        })
    })(req, res, next);
});

const login = async (req, res, next) => {
    console.log("en la nueva mierda");
    passport.authenticate('login', (err, user, info) => {
        console.log("de vuelta en el login");
        console.log(err);
        console.log(user);
        console.log(info);
        info? console.log("info is true") : console.log("info is false");
        if (err) return console.log(err);
        if (info) return res.status(401).send(info);
        console.log(user);
        req.logIn(user, err => {
            users.findOne({ username: user.username }, (err, user) => {
                if (err) return res.send(err);
                req.user = user;
                const token = jwt.sign({ username: user.username, role: user.role }, 'TOP_SECRET', {expiresIn: 60});
                res.status(200).send({
                    auth: true,
                    user: user,
                    //token: "Bearer " + token,
                    token: token,
                    message: "user found & logged in OK!"
                });

                next();
            })
        })
    })(req, res, next);
}

const restore = async (req, res) => {
    console.log("en el nodemailer");
    console.log(req.query);
    res.send(req.query);

};

const signUp2 = async (req, res, next) => {
    try{
        users.findOne({username: req.body.username}, async (err, doc) => {
            if (err) res.status(500).send(err);
            if (doc) res.status(409).send("User already exists");
            if (!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password,10);
                const newUser = new users({
                    username: req.body.username,
                    password: hashedPassword,
                    email: "fake@email.com"
                });
                console.log(newUser);
                await newUser.save();
                res.status(200).send(req.body);
                next();
            }
        })
    } catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};

const login2 = async (req, res, next) => {
    console.log("loginnnnnnn");
    let  {username, password } = req.body;
    console.log(username + " " + password); 

    users.findOne({ username: username }, (err, user) => {

        if (err) throw err;
        if (!user) return res.json({ msg: `${username} ez dugu aurkitu!`});

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (!result) return res.send({ msg: "password not validdddd" });

            console.log("login ok");
            const token = jwt.sign({user: user.username, role: user.role}, 'TOP_SECRET', { expiresIn: 10 } )
            
            req.session.user = user;
            console.log(req.session.user);

            res.status(200).json({ auth: true, token: token, user: user });

                
                
            
        });
    });
    /* passport.authenticate('local', async (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User exists");
        else {
            req.login(
                user,
                { session: false },
                async (error) => {
                    
                    if (error) return next(error);
    
                    const body = { _id: user._id, email: user.email };
                    const token = jwt.sign({ user: body }, 'TOP_SECRET', { expiresIn: '5m' });
    
                    console.log(token);
                    console.log(req.headers);
                    console.log(req.isAuthenticated());
                    console.log(req.user);
                    return res.json({ token });
                }
            );
        }
    })(req, res, next); */
};

const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) return next();
};

const logOut = (req, res) => {
    console.log(req.isAuthenticated());
    console.log(req.user);
    (req.isAuthenticated()) ? req.logOut() :
        console.log("No Authenticated users");
};

const amILogged = (req, res) => {
    console.log("AUTENTICADO????????????");
    console.log(req.isAuthenticated());
    console.log(req.headers);
    /* (req.isAuthenticated()) ? res.send(req.isAuthenticated()) :
        res.send({ mensaje: "NO estas logeado"}); */
    verifyJWT(req, res);
}

const userControllers = {
    signUp,
    login,
    restore,
    isLogged,
    logOut,
    amILogged
};

module.exports = userControllers;