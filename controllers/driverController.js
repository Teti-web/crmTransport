const asyncHandler = require("express-async-handler");
const Driver = require("../models/driverModel");


// Added Driver
const addedDriver = asyncHandler(async (req, res) => {
    const { name, email, date_of_birth, category, tel } = req.body;

    // Validation
  if (!name || !email ||!date_of_birth ||!tel || !category) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  if (!validateEmail(email)) {
    res.status(400);
    throw new Error("Please enter a valid email");
  }
    // Check if driver email already exists
    const driverExists = await Driver.findOne({ email });

    if (driverExists) {
        res.status(400);
        throw new Error("Email has already added other driver");
    }

    // Create new driver
  const driver = await Driver.create({
    name,
    email,
    date_of_birth,
    category,
    tel
  });
  res.status(201).json(driver);
});
// Get all Drivers Data
const getAll= asyncHandler(async (req, res) => {
     const drivers = await Driver.find().sort("-createdAt");
     res.status(200).json(drivers);
});
// Get Driver Data
const getDriver = asyncHandler(async (req, res) => {
    const driver = await Driver.findById(req.driver._id);
    if (!driver) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.status(200).json(driver);
});

//Get coutn
const getCoutn = asyncHandler(async (req, res)=>{
  const coutn = await Driver.find().count();
  res.status(200).json(coutn);
});

// Update the driver
const updateDriver = asyncHandler(async (req, res) => {
    const driver = await Driver.findById(req.driver._id);
    if (driver) {
        const { name, email,date_of_birth, category, tel } = driver;
        driver.email = email;
        driver.name = req.body.name || name;
        driver.tel = req.body.tel || tel;
        driver.date_of_birth = req.body.date_of_birth || date_of_birth;
        driver.category = req.body.category || category;
    
        const updateddriver = await driver.save();
        res.status(200).json({
          _id: updateddriver._id,
          name: updateddriver.name,
          email: updateddriver.email,
          category: updateddriver.category,
          tel: updateddriver.tel,
          date_of_birth: updateddriver.date_of_birth
        });
      } else {
        res.status(404);
        throw new Error("driver not found");
      }
});

  module.exports={
     addedDriver,
     getDriver,
     getAll,
     updateDriver,
     getCoutn
  };