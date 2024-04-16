const mongoose = require('mongoose')

const OTPschema = new mongoose.Schema({
  email : {
    type : String,
    required : true,
  },
  otpNumber : {
    type : Number,
    required : true,
  },
}) 


const OTP = mongoose.model('otps', OTPschema)
module.exports = OTP;