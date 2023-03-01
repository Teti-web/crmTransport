const express =require('express');
const Router = require('express').Router;
const router = new Router();

const clientController = require('../controllers/clientController');
const protect = require('../middleWare/authMiddleware');

//api/clients/....
router.post('/addclient', clientController.addClient);
router.get('/getclient', protect, clientController.getClient);
router.get('/getall', protect, clientController.getAll);
router.get('/getcount', protect, clientController.getCoutn);
router.patch("/updateclient", protect, clientController.updateClient);

module.exports = router;