const express =require('express');
const Router = require('express').Router;
const router = new Router();
const routeControler = require('../controllers/routeController');
const protect = require('../middleWare/authMiddleware');

//api/routes/
router.post('/addroute', routeControler.addRoute);
router.get('/getroute/:id', protect,routeControler.getRoute);
router.get('/getall', protect, routeControler.getAll);
router.get('/getallchart', protect, routeControler.getAllforChart);
router.get('/getcount', protect, routeControler.getCoutn);
router.patch('/updateroute/:id', protect, routeControler.updateRoute);

module.exports= router;