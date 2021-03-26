const mongoose = require("mongoose");

var authschema=mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  address:{
    type:String
  },
  contact:{
    type:String
  }
})

mongoose.model('author',authschema,'author');
