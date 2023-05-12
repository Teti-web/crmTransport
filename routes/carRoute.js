const express =require('express');
const Router = require('express').Router;
const router = new Router();

const carController = require('../controllers/carController');
const protect = require('../middleWare/authMiddleware');

//api/cars/....
router.post('/addcar', carController.addCar);
router.get('/getcar/:id', protect, carController.getCar);
router.get('/getall', protect, carController.getAll);
router.get('/getcount', protect, carController.getCoutn);
router.patch("/updatecar/:id", protect, carController.updateCar);

module.exports = router;