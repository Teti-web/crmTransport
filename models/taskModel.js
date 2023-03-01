const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
   user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   title:{
    type:String,
    require:[true, "Please add a title"]
   },
   priority:{
    type:String,
    require:[true, "Please add a priority"]
   },
   status:{
    type:String,
    require:[true, "Please add a status"]
   }
},
 {
 timestamps: true,
 });

 const Task = mongoose.model('Task', taskSchema);
 module.exports = Task;