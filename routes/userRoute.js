const express =require('express');
const Router = require('express').Router;
const router = new Router();
const userController= require('../controllers/userController');
const protect = require("../middleWare/authMiddleware");
  
  //api/users/...
  router.post("/register", userController.registerUser);
  router.post("/login", userController.loginUser);
  router.get("/logout", userController.logout);
  router.get("/getuser", protect, userController.getUser);
  router.get("/loggedin", userController.loginStatus);
  router.patch("/updateuser", protect, userController.updateUser);
 

  module.exports = router;