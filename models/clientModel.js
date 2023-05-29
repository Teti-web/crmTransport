const {Schema, model, Types} = require('mongoose');

const clientSchema = Schema({
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
    adress:{
        type: String,
        required: [true, "Please add a category"],
      trim: true
    },
    tel:{
        type: String,
        required: [true, "Please add a phone number"],
      trim: true
    },
    bio: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "bio",
    }
},
{
    timestamps: true
}
);

const Client = model("Client", clientSchema);
module.exports = Client;