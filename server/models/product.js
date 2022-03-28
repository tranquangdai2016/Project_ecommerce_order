const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({
    title:{
        type :  String,
        trim : true ,
        required : true ,
        maxlength : 32 ,
        text : true 
    },
    slug:{
        type :  String,
        unique  : true ,
        lowercase : true ,
        index : true ,
    },
    description :{
        type :  String,
        required : true ,
        maxlength : 2000 ,
        text : true 
    },
    price:{
        type : Number ,
        required : true ,
        maxlength : 2000 ,
        text : true
    }
})