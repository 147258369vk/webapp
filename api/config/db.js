const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://mydb:mydb123@cluster0.7dosx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>{
    console.log("Database connected succesfully");
})
.catch((err)=>{
    console.log("Error in connecting database " +err);
})
