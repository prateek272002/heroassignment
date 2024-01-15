const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI ='mongodb+srv://heroassignment:rj14200227@cluster0.aoggzjb.mongodb.net/?retryWrites=true&w=majority'
mongoose.set("strictQuery", false);
const mongoDB= async()=>{
await mongoose.connect(mongoURI,{useNewUrlParser:true});

const d = mongoose.connection;
d.on('error', console.error.bind(console, 'MongoDB connection error:'));

}
module.exports=mongoDB;