const mongoose = require('mongoose');

const mongoURI =
  "mongodb+srv://kingkhan120702:Sahil191202@cluster0.ukkkqtd.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () =>{
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
    })
    console.log('Connected Sucessfully')
}
module.exports = connectToMongo;