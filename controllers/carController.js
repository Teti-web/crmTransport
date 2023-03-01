const asyncHandler = require("express-async-handler");
const Car = require("../models/carModel");


// Added car
const addCar = asyncHandler(async (req, res) => {
    const {car_brand,model, registration, vin, insurance, end_insurance, overview, end_overview  } = req.body;

    // Validation
  if (!car_brand || !model ||!registration ||!vin ||!insurance  ||!end_insurance ||!overview ||!end_overview) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

    // Check if exists
    const carExists = await Car.findOne({ registration });

    if (carExists) {
        res.status(400);
        throw new Error("Number registration has already added, please add a new number registration");
    }

    // Create new Car
  const car = await Car.create({
    car_brand,model, registration, vin, insurance, end_insurance, overview, end_overview 
  });
  res.status(201).json(car);
});
// Get all Cars Data
const getAll= asyncHandler(async (req, res) => {
     const car = await Car.find().sort("-createdAt");
     res.status(200).json(car);
});
// Get Car Data
const getCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.car._id);
    if (!car) {
      res.status(404);
      throw new Error("Car not found");
    }
    res.status(200).json(car);
});

//Get coutn
const getCoutn = asyncHandler(async (req, res)=>{
  const count = await Car.find().count();
  res.status(200).json(count);
});

// Update the Car
const updateCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.car._id);
    if (car) {
        const { car_brand,model, registration, vin, insurance, end_insurance, overview, end_overview } = car;
        Car.car_brand = car_brand;
        Car.model = model;
        Car.registration = registration;
        Car.vin = vin;
        Car.end_insurance = req.body.end_insurance || end_insurance;
        Car.insurance = req.body.insurance || insurance;
        Car.overview = req.body.overview || overview;
        Car.end_overview = req.body.end_overview || end_overview;
    
        const updatedCar = await Car.save();
        res.status(200).json({
          _id: updatedCar._id,
          car_brand: updatedCar.car_brand,
          model: updatedCar.model,
          registration: updatedCar.registration,
          vin: updatedCar.vin,
          insurance: updatedCar.insurance,
          end_insurance: updatedCar.end_insurance,
          overview: updatedCar.overview,
          end_overview: updatedCar.end_overview
        });
      } else {
        res.status(404);
        throw new Error("Car not found");
      }
});

  module.exports={
     addCar,
     getCar,
     getAll,
     updateCar,
     getCoutn
  };