const mongoose = require('mongoose');

var publisherSchema = mongoose.Schema({
  name:{
    type:String,
  },
  email:{
    type:String,
  },
  books:[
    {
      bookname:{ type:String },
      authorname:{type:String}
    }
  ],
  date : { type:Date , default:Date.now()},
})

 mongoose.model('publisher',publisherSchema);
