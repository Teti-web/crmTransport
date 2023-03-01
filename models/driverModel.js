const {Schema, model, Types} = require('mongoose');

const driverSchema = Schema({
    // user:  {
    //     type: Types.ObjectId,
    //     ref: "User",
    //   },
    name:{
        type: String,
        required: [true, "Please add a name"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Please add  a email address"],
         trim: true
    },
    category:{
        type: String,
        required: [true, "Please add a category"],
      trim: true
    },
    tel:{
        type: String,
        required: [true, "Please add a phone number"],
      trim: true
    },
    date_of_birth:{
        type: String,
        required: [true, "Please add a date of birth"],
      trim: true
    }
},
{
    timestamps: true
}
);

const Driver = model("Driver", driverSchema);
module.exports = Driver;