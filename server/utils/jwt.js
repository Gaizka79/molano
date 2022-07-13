const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport');

const verifyJWT = async (req, res, next) => {
    console.log(req.headers)
    //console.log(req.headers.mytoken)
    const token = req.headers.mytoken;
    console.log(token)
    console.log("Vamos al autent????")
    if (!token) return res.status(400).send("no token provided");
    /* console.log("vamos al autenticate");
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        console.log("en lo nuevo");
        console.log(err)
        console.log(user)
        console.log(info)
        
    }) */

    jwt.verify(token, "TOP_SECRET", (err, decoded) => {
        console.log("Verificando el token");
        if (err) return res.status(403).send({ auth: false, message: "failed to authenticated"});
        console.log(decoded);
        req.userId = decoded.username;
        console.table(decoded);
        console.log(req.userId);
        res.status(200).send({
            auth: true,
            user: req.userId,
            //token: "Bearer " + token,
            token: token,
            message: "user found & logged in OK!"
        });
        next();
    })
    
}

const utilsJWT = {
    verifyJWT
};

module.exports = utilsJWT;