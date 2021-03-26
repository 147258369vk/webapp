require('../model/userModel');
require('../model/publisherModel');
require('../config/passportConfig');

require('../model/bookModel');
require('../model/authorModel');
require('../model/imageModel');

const mongoose = require('mongoose');
const passport = require('passport');
var User = mongoose.model('user');
var jwt = require('jsonwebtoken');
const _ = require('lodash');

var Image = mongoose.model('imageUpload')

const multer = require('multer');






var Publisher = mongoose.model('publisher');
var Author = mongoose.model('author');
var Book= mongoose.model('book')

module.exports.addUser=(req,res)=>{
    var newUser=new User({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password
    });

    return newUser.save().then((docs)=>{
        res.status(200).json({
            success:true,
            message:'New user Created',
            user:docs
        });
    })
    .catch((err)=>{
        res.status(401).json({
            success:false,
            message:'Error in creating new User',
            error:err.message
        });
    });
};

module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return res.status(404).json(err);
        if(user) return res.status(200).json({
            "token":user.generateJWT(),
                data:user
        })
        if(info) return res.status(401).json(info);
    })(req,res,next);
}

module.exports.userProfile=(req,res)=>{
    User.findOne({_id:req._id}).then((user)=>{
        return res.status(200).json({
            success:true,
            message:'user Found',
            data:_.pick(user,['_id','email'])
        })
    }).catch((err)=>{
        res.status(404).json({
            success:false,
            message:'user not found',
            err:err.message
        })
    })
}

module.exports.selectedUser=(req,res)=>{
  return User.findById({_id:req.params.id}).select('name email contact').then((docs)=>{
    res.status(200).json({
      success:true,
      messasge:'User Record Found',
      data:docs
    })
  }).catch((err)=>{
    res.status(401).json({
      success:false,
      message:'User not found',
      err:err.message
    })
  })
}


module.exports.addPublisher=(req,res)=>{
  // const newPublisher = new Publisher({
  //   name:req.body.name,
  //   email:req.body.email,
  //   books:[{
  //     bookname:req.body.bookname,
  //     authorname:req.body.authorname,
  //   }]
  // })


  const newPublisher= new Publisher({

    name:req.body.name,
    email:req.body.email,
    books:req.body.books

  });

  // const newPublisher = new Publisher(req.body);

  return newPublisher.save().then((data)=>{
    res.status(200).json({
      success:true,
      message:'New Published created',
      docs:data
    })
  }).catch((err)=>{
    res.status(401).json({
      success:false,
      message:'Error in creating',
      err:err.message
    })
  });

}

//Add author

module.exports.addauthor=(req,res)=>{
  const newAuthor = new Author(req.body);

  return newAuthor.save().then((data)=>{
    res.status(200).json({
      success:true,
      message:'New Author added',
      docs:data
    })
  }).catch((err)=>{
    res.status(401).json({
      success:false,
      message:'error in adding author',
      error:err.message
    })
  })
}

//add books
module.exports.addbooks=(req,res)=>{
  const newBook=new Book(req.body)
  id=req.body.Author

  return newBook.save().then((data)=>{
    res.status(200).json({
      success:true,
      message:'New Book added',
      docs:data
    })
  }).catch((err)=>{
    res.status(401).json({
      success:false,
      message:'error in adding book',
      error:err.message
    })
  })
}


module.exports.showBooks=(req,res)=>{
  return Book.find({author:req.params.authorid}).populate('title').exec((docs)=>{

  }),(err)=>{

  }
}


//access html file


module.exports.fileupload=(req,res)=>{
  res.sendFile(__dirname+ '/form.html');
}

//Upload  image

var storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,__dirname+'/uploads');
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname);
  }
});

var upload = multer({storage:storage}).single('photo');

module.exports.uploadImage=(req,res)=>{
  upload(req,res,function(err){
    if(err)
    {
      console.log("Error in file uploading" +err);
    }
    else
    {
      console.log("File uploaded successfully");
      const image=Image({
        file:req.file.path
      });
      console.log(req.file);
      console.log(__dirname+'/uploads');

      return image.save().then((docs)=>{
        res.status(200).json({
          success:true,
          message:'file uploaded successfully',
          data:docs

        }).catch((err)=>{
          res.status(401).json({
            success:false,
            message:'Error in uploading file',
            err:err.message
          })
        })
      })
    }
  })
}
