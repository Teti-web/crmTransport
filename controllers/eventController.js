const asyncHandler = require("express-async-handler");
const Events = require('../models/eventModel');
const moment = require('moment');

//add event 
const addEvent = asyncHandler(async (req, res) => {
    const { title,  description, start, end } = req.body;

    if (!title || !start || !end) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }

    // Create new event
 
    const event = await Events.create({
      owner: req.user.id,
      title,
      description,
      start,
      end
    });
    res.status(201).json(event)
});

//get one event

const getEventID = asyncHandler(async (req, res) => {

  // const originalID = mongoose.Types.ObjectId(req.params.id);
  // const newHex = assert.equal(24, originalID.toHexString().length);

  const event = await Events.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.status(201).json(event);
});

//get all events
const getEvents = asyncHandler(async (req, res) => {
    const events = await Events.find({
    start:{$gte:moment(req.query.start).toDate()},
    end:{$lte:moment(req.query.end).toDate()},
    owner: req.user.id
  });
    if (!events) {
      res.status(404);
      throw new Error("Event not found");
    }
    // if (events.user?.toString() !== req.user.id) {
    //   res.status(401);
    //   throw new Error("User not authorized");
    // }
    res.status(201).json(events);
});

//update one event

const updateEvent = asyncHandler(async (req, res) => {
  const { title, start, end} = req.body;

  const event = await Events.findById(req.params.id);

  // if product doesnt exist
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  // // Match product to its user
  // if (event.user?.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  const updatedEvent = await Events.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title,
      start,
      end
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedEvent);
});

//remove event

const removeEvent = asyncHandler(async (req, res) => {
    const eventid = await Events.findById(req.params.id); 
    if(!eventid){
        res.status(404);
        throw new Error("event not found");
    }
    if (eventid.user.toString() !== req.user._id) {
        res.status(401);
        throw new Error("User not authorized");
      }
    await Events.remove();
    res.status(200).json({ message: "Event deleted." });

});

module.exports={
    addEvent,
    getEventID,
    getEvents,
    updateEvent,
    removeEvent
}