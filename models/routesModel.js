const mongoose = require('mongoose');



const routeSchema = mongoose.Schema({
    name:{
        type: String,
        require:[true, "Please add a name"]
    },
    start:{
        type:String,
        require:[true, "Please add a city where starts router "]
    },
    start_date:{
        type:String,
        require:[true, "Please add a  starts router date"]
    },
    finish:{
        type:String,
        require:[true, "Please add a city where finished router "]
    },
    finish_date:{
        type:String,
        require:[true, "Please add a  starts router date"]
    },
    price:{
        type:String,
        require:[true, "Please add a  starts router date"]
    },
    driver:{type:String, require:[true, "Please add a driver"]},
    car:{type:String, require:[true, "Please add a car"]},
    client:{type:String, require:[true, "Please add a client"]},
},
{
    timestamps: true
})

const Routes = mongoose.model("Routes", routeSchema);
module.exports = Routes;