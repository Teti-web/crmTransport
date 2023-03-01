const express =require('express');
const Router = require('express').Router;
const router = new Router();

const eventsController = require('../controllers/eventController');
const protect = require("../middleWare/authMiddleware");
//api/events/
router.post("/addevent", protect,eventsController.addEvent);
router.get("/getevents", protect, eventsController.getEvents);
router.get("/getevent/:id", protect, eventsController.getEventID);
router.patch("/updatevent/:id", protect, eventsController.updateEvent);
router.patch("/removevent/:id", protect, eventsController.removeEvent);


module.exports = router;