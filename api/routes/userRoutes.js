var express = require('express');

var userCtrl = require('../controller/userController');
var jwthelper=require('../config/jwtHelper');
const { RouterState } = require('@angular/router');



var routes=express.Router();

routes.post('/newUser',userCtrl.addUser);
routes.post('/auth',userCtrl.authenticate);
routes.get('/profile',jwthelper.verifytoken,userCtrl.userProfile);
routes.get('/SelectUser/:id',userCtrl.selectedUser);


routes.post('/publisher/add',userCtrl.addPublisher);

routes.post('/author/add',userCtrl.addauthor);
routes.post('/author/addbook',userCtrl.addbooks);

routes.get('/file',userCtrl.fileupload);
routes.post('/uploads',userCtrl.uploadImage);
module.exports = routes;
