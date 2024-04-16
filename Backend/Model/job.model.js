const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  jobCategory : {
    type : String,
    required : true
  },
  jobTypes : {
    type : String,
    required : true
  },
  jobDecription : {
    type : String,
    required : true
  },
  companyName : {
    type : String,
    required : true
  },
  companyStartedIn : {
    type : String,
    required : true
  },
  companyVision : {
    type : String,
    required : true
  },
  // companyMission : {
  //   type : String,
  //   required : true
  // },
  skillsRequired : {
    type : String,
    required : true
  },
  educationRequired : {
    type : String,
    required : true
  },
  experienceRequired : {
    type : String,
    required : true
  },
})


const Jobs = mongoose.model('jobs', jobSchema);
module.exports = Jobs;