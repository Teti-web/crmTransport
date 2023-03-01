const {Schema, model, Types} = require('mongoose');

const carSchema = Schema({
    car_brand:{
        type: String,
        required: [true, "Please add a "],
         trim: true
    },
    model:{
        type: String,
        required: [true, "Please add a name"],
        trim: true
    },
    registration:{
        type: String,
        required: [true, "Please add  a registration number"],
         trim: true
    },
    vin:{
        type: String,
        required: [true, "Please add a VIN number"],
      trim: true
    }, 
    insurance:{
        type: String,
        required: [true, "Please add a insurance number"],
      trim: true
    },
    end_insurance:{
       type: String,
       required:[true, 'Please add a end of insurance date']
    },
    overview:{
        type: String,
        required: [true, "Please add a overview number"],
    },
    end_overview:{
        type: String,
        required:[true, 'Please add a end of overview date']
     },
},
{
    timestamps: true
}
);

const Car = model("Car", carSchema);
module.exports = Car;