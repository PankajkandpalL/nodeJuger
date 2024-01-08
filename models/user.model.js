const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    city:String,
    age:Number
},{
    versionKey:false
})

const userTokenSchema = new mongoose.Schema({
    token: {
      type: String,
      required: true,
      unique: true,
    },
  });
  
const userTokenModel = mongoose.model('TokenBlacklist', userTokenSchema);

const userModel = mongoose.model("user", userSchema)

module.exports={userModel, userTokenModel}