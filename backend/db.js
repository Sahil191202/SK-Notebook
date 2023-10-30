const mongoose = require('mongoose');

const mongoURI =
  "mongodb+srv://kingkhan1912:191202@cluster0.si4gqah.mongodb.net/?retryWrites=true&w=majority"
const connectToMongo = () =>{
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
    })
    console.log('Connected Sucessfully')
}
module.exports = connectToMongo;