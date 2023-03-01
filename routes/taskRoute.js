const express =require('express');
const Router = require('express').Router;
const router = new Router();

const taskController = require('../controllers/taskController')
const protect = require("../middleWare/authMiddleware");
//api/tasks/
router.post("/addtask", protect, taskController.addTask);
router.get("/gettasks", protect, taskController.getTasks);
router.put("/updatetask/:id", protect, taskController.updateTasks);
router.patch("/removetask/:id", protect, taskController.removeTask);


module.exports = router;