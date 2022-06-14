require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require ('body-parser');
const cors = require('cors');
const morgan = require ('./middlewares/morganConfig');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportLocal = require('passport-local').Strategy;

const cookieSecret = process.env.COOKIE_SECRET;


const routesProducts = require('./routes/routesProducts');
const routesUsers = require('./routes/routesUsers');

const PORT = process.env.LOCAL_PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */
app.use(cookieParser(cookieSecret));

//app.use(cors());
app.use(cors({ 
  origin: "http://localhost:3000",
  credentials: true }));

app.use(morgan(':date[clf] :method :referrer :host :status :param[id] - :response-time ms :body'));

app.use(session({
  secret: cookieSecret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//require('./middlewares/passportConfig')(passport);
passport.use(new passportLocal('local', (username, password, done) => {
  console.log("en la mierda del middleware");
  console.log(username);
  console.log(password);
    if (username === "Gaizka" && password === "123456"){
      console.log("usernamey passwordes todo ok");
      return done( null, { id: 1, name: "Gaizka"})
    } else {
      console.log("no es igual a gaizka");
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(null, { id: 1, name: "Gaizka" })
})


app.use('/api', routesProducts);
app.use('/api', routesUsers);

app.get("/kaixo", (req, res) => {
    res.json({ message: "Kaixo munduari!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});