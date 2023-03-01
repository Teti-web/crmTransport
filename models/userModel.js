const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
     name: {
        type: String,
        require:[true, "Please add a name"]
     },
     email:{
        type: String,
        require:[true, "Please add a email address"],
        unique: true
     },
     password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
      },
      events:{
        type: mongoose.Types.ObjectId, 
        ref: 'Events',
      },
      task:{
        type: mongoose.Types.ObjectId, 
        ref: 'Task',
      },
      photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png",
      },
      tel: {
        type: String,
        default: "+48",
      },
      bio: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "bio",
      },
      role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "admin",
      }
    },
    {
      timestamps: true,
    }
  );
  
  //   Encrypt password before saving to DB
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;