require('dotenv').config();
const express = require("express");
require ('body-parser');

const cors = require('cors');
const morgan = require ('./middlewares/morganConfig');

const passport = require('passport');
require('./utils/auth')(passport);

const session = require('express-session');
const cookieParser = require('cookie-parser');


const routesProducts = require('./routes/routesProducts');
const routesUsers = require('./routes/routesUsers');

const app = express();
const PORT = process.env.LOCAL_PORT || 8080;

//app.use(cors());
app.use(cors({
  origin: "http://localhost:3000" || "http://localhost:5000", // <-- location of the react app were connection to
  credentials: true
}));

app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session()); 

app.use(morgan(':date[clf] :method :referrer :host :status :param[id] - :response-time ms :body'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* app.use('/', (req, res) => {
    console.log(req);
    res.json({ message: "Kaixo nire web orrialde berritik!" });
});  */
app.use('/api', routesProducts);
app.use('/api/users', routesUsers);

app.get("/kaixo", (req, res) => {
    res.json({ message: "Kaixo munduari!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});