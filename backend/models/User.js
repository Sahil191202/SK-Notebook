const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    newPassword:{
         type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const notebook = mongoose.model('user', UserSchema);
notebook.createIndexes();
module.exports = notebook;
