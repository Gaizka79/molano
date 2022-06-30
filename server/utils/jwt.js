const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
    console.log(req.headers)
    console.log(req.headers.mytoken)
    const token = req.headers.mytoken;
    console.log(token)

    if (!token) return res.status(400).send("no token provided");

    jwt.verify(token, "TOP_SECRET", (err, decoded) => {
        console.log("Verificando el token");
        if (err) return res.status(403).send({ auth: false, message: "failed to authenticated"});
        console.log(decoded);
        req.userId = decoded.username;
        next();
    })
    
}

const utilsJWT = {
    verifyJWT
};

module.exports = utilsJWT;