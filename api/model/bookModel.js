const mongoose = require('mongoose');
// require('../model/authorModel');
var bookSchema = mongoose.Schema({
  name:{type:String},
  title:{type:String},
  genre:{type:String},
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'author'
  }

});

mongoose.model('book',bookSchema);
