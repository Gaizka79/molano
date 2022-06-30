const bcrypt = require('bcryptjs');
const passport = require('passport'),
    jwt = require('jsonwebtoken'),
    localStrategy = require('passport-local').Strategy,
    users = require('../models/users'),
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('register', new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
    },
    (username, password, done) => {
        try{
            users.findOne({ username: username }, async (err, doc) => {
                console.log("register de autenticate");
                console.log(err);
                console.log(doc);
                /* if (err) res.status(500).send(err);
                if (doc) res.status(409).send("User already exists"); */
                if (err) return done(err)
                if (doc) return done(null, false, { message: "Users already exists!"})
                console.log("Seguimos en el register");
                //if (!doc) {
                    const hashedPassword = await bcrypt.hash(password,10);
                    const newUser = new users({
                        username: username,
                        password: hashedPassword,
                        email: "fake@email.com"
                    });
                    console.log(newUser);
                    await newUser.save();
                    done(null, newUser);//, { message: "Usuario creado OK!"})
                    /* res.status(200).send(req.body);
                    next(); */
                //}
            })
        } catch (err){
            console.log(err);
            return done(err);
        }
    })
);
passport.use('login', new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    (username, password, done) => {
        console.log("en el login de autenticate");
        console.log(username);
        try {
            users.findOne({ username: username }, (err, user) => {
                console.log(user);

                if (err) done(err);
                //if (!user) return res.json({ msg: `${username} ez dugu aurkitu!`});
                if (!user) return done(null, false, { message: "Bad username!"});
        
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) return done(err);
                    if (!result) return done(null, false, { msg: "password not validdddd" });
                    
                    console.log("login ok");
                    console.log(user);
                    return done(null, user);   
                });
            });
        } catch (error) {
            done(error);
        }
    }
));

const opts = {
    //jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'TOP_SECRET',
};

passport.use('jwt', new JWTstrategy(opts, (jwt_payload, done) => {
    try {
        users.findOne( {username: jwt_payload.username})
        .then (user => {
            if (user) {
                done(null, user, { mensaje: 'Usuario login OK!' });
            } else {
                done(null, false, { mensaje: 'usuario no topado' });
            }
        })
    } catch (error) {
        done(error);
    }
}))
//https://www.paigeniedringhaus.com/blog/implementing-json-web-tokens-passport-js-in-a-react-app
//https://www.passportjs.org/concepts/authentication/login/