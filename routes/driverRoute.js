const express =require('express');
const Router = require('express').Router;
const router = new Router();

const driverController = require('../controllers/driverController');
const protect = require('../middleWare/authMiddleware');

//api/drivers/....
router.post('/adddrive', driverController.addedDriver);
router.get('/getdriver', protect, driverController.getDriver);
router.get('/getall', protect, driverController.getAll);
router.get('/getcount', protect, driverController.getCoutn);
router.patch("/updatedriver", protect, driverController.updateDriver);

module.exports = router;