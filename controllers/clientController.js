const asyncHandler = require("express-async-handler");
const Client = require("../models/ClientModel");


// Added Client
const addClient = asyncHandler(async (req, res) => {
    const { name, email, adress, tel } = req.body;

    // Validation
  if (!name || !email ||!tel || !adress) {
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
    // Check if Client email already exists
    const ClientExists = await Client.findOne({ email });

    if (ClientExists) {
        res.status(400);
        throw new Error("Email has already added other Client");
    }

    // Create new Client
  const client = await Client.create({
    name,
    email,
    adress,
    tel
  });
  res.status(201).json(client);
});
// Get all Clients Data
const getAll= asyncHandler(async (req, res) => {
     const clients = await Client.find().sort("-createdAt");
     res.status(200).json(clients);
});
// Get Client Data
const getClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.client._id);
    if (!client) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.status(200).json(client);
});

//Get coutn
const getCoutn = asyncHandler(async (req, res)=>{
  const coutn = await Client.find().count();
  res.status(200).json(coutn);
});

// Update the Client
const updateClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.client._id);
    if (client) {
        const { name, email, adress, tel } = client;
        Client.email = email;
        Client.name = req.body.name || name;
        Client.tel = req.body.tel || tel;
        Client.adress = req.body.adress || adress;
    
        const updatedClient = await Client.save();
        res.status(200).json({
          _id: updatedClient._id,
          name: updatedClient.name,
          email: updatedClient.email,
          adress: updatedClient.adress,
          tel: updatedClient.tel
        });
      } else {
        res.status(404);
        throw new Error("Client not found");
      }
});

  module.exports={
     addClient,
     getClient,
     getAll,
     updateClient,
     getCoutn
  };