const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
 owner:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
 },
 title:{
    type: String
 },
 start:{
   type: Date
 },
 end:{
    type: Date
 }
},
{
 timestamps: true,
})

const Events = mongoose.model("Events", eventSchema);
module.exports = Events;