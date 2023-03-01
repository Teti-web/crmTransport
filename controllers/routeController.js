const asyncHandler = require("express-async-handler");
const Routes = require("../models/routesModel");


// Added route
const addRoute = asyncHandler(async (req, res) => {
   const {name, start, start_date, finish, finish_date, price, driver, car, client} = req.body;

   // Validation
   if(!name ||!start ||!start_date ||!finish ||!price ||!finish_date){
    res.status(400);
    throw new Error("Please fill in all required fields");
   }

   //Create route
   const route = await Routes.create({
    name, 
    start, 
    start_date, 
    finish, 
    finish_date,
    price,
    driver,
    car,
    client
   })
   res.status(201).json(route);
});

// Get all routes

const getAll= asyncHandler(async (req, res) => {
    const routes = await Routes.find().sort("-createdAt");
    res.status(200).json(routes);
});

const getAllforChart= asyncHandler(async (req, res) => {
  const routes = await Routes.find();
  res.status(200).json(routes);
});

//Get route
const getRoute = asyncHandler(async (req, res) => {
    const route = await Routes.findById(req.route._id);
    if (!route) {
        res.status(404);
        throw new Error("Route not found");
      }
      res.status(200).json(route);
});

//Get coutn
const getCoutn = asyncHandler(async (req, res)=>{
    const count = await Routes.find().count();
    res.status(200).json(count);
  });

  // Update the Route
const updateRoute = asyncHandler(async (req, res) => {
    const route = await Routes.findById(req.route._id);
    if (route) {
        const { name, start, start_date, finish, finish_date,driver, car, client } = route;
        Routes.name = name;
        Routes.start = start;
        Routes.start_date=start_date;
        Routes.finish=finish;
        Routes.finish_date=finish_date;
        Routes.driver = req.body.driver || driver;
        Routes.car = req.body.car || car;
        Routes.client = req.body.client || client;
    
        const updatedRoute = await Routes.save();
        res.status(200).json({
          _id: updatedRoute._id,
        name:updatedRoute.name,
        start:updatedRoute.start,
        start_date:updatedRoute.start_date,
        finish:updatedRoute.finish,
        finish_date:updatedRoute.finish_date,
        driver:updatedRoute.driver,
        car:updatedRoute.car,
        client:updatedRoute.client
        });
      } else {
        res.status(404);
        throw new Error("Route not found");
      }
});

module.exports={
    getAll,
    getCoutn,
    getRoute,
    getAllforChart,
    addRoute,
    updateRoute
};