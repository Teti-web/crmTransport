const asyncHandler = require("express-async-handler");
const Task = require('../models/taskModel');
const User = require('../models/userModel')

//add TASK

const addTask = asyncHandler(async (req, res)=>{
    const { title, priority, status } = req.body;
   
    if (!title || !priority || !status) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }

    // find user in DB

    const task = await Task.create({
      user: req.user.id,
      title,
      priority,
      status
    });
    res.status(201).json(task)
});

// get tasks

const getTasks = asyncHandler(async (req, res)=>{
    const tasks = await Task.find({ user: req.user._id.toString() }).sort("-createdAt");
    res.status(200).json(tasks);
});

//update tasks

const updateTasks = asyncHandler(async (req, res)=>{
    const { title, priority, status} = req.body;

  const event = await Task.findById(req.params.id);

  // if product doesnt exist
  if (!event) {
    res.status(404);
    throw new Error("Task not found");
  }
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title,
      priority, 
      status
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedTask);
});

const removeTask = asyncHandler(async (req, res)=>{
    const deleteItem = await Task.findByIdAndDelete(req.params.id);
    if (!deleteItem) {
        res.status(404);
        throw new Error("Task not found");
      }
    res.status(200).json(deleteItem);
});


module.exports={
    addTask,
    getTasks,
    updateTasks,
    removeTask
}
