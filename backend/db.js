const mongoose = require('mongoose');

const mongoURI =
  "mongodb+srv://Sahil2002:Sahil2002@cluster0.vklaify.mongodb.net/?retryWrites=true&w=majority";
const connectToMongo = () =>{
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
    })
    console.log('Connected Sucessfully')
}
module.exports = connectToMongo;