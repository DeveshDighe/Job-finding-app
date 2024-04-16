const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users',
    required : true, 
  },
  jobCategory : {
    type : String,
    required : true
  },
  jobTypes : {
    type : String,
    required : true
  },
  skillsHave : {
    type : String,
    required : true
  },
  salaryExpectation : {
    type : String,
    required : true
  },
  educationHave : {
    type : String,
    required : true
  },
  experienceHave : {
    type : String,
    required : true
  },
  applicantVision : {
    type : String,
    required : true
  },
  status : {
    type : String,
    default : 'Pending',
  },
  rejectReason : {
    type : String, 
  },
  matchScore : {
    type : Number
  }
})


const Jobapplication = mongoose.model('applications', applicationSchema);
module.exports = Jobapplication;