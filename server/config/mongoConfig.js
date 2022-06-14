const mongoose = require('mongoose');
const mongoUser = process.env.MONGODB_USER;
const mongoPassword = process.env.MONGODB_PASSWORD;
const mongoName = process.env.MONGODB_NAME;
const mongoDb = process.env.MONGO_DB;

const url = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoName}.m4pil.mongodb.net/${mongoDb}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", error => console.log(`Error: ${error} al conectar a la BDD`));
mongoose.connection.once("open", () => console.log("Mongo DB konektatua"));

module.exports = mongoose;