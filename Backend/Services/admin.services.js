const Jobs = require("../Model/job.model");


const createJob = async (allJobData) =>{
  try {
    const {jobCategory, jobTypes, jobDescription, companyName, companyStartedIn, companyVision, skillsRequired, educationRequired, experienceRequired } = allJobData;

    console.log(jobCategory, jobTypes, jobDescription, companyName, companyStartedIn, companyVision, skillsRequired, educationRequired, experienceRequired);

    const createdJob = await Jobs({
      jobCategory,
      jobTypes,
      jobDecription : jobDescription ,
      companyName,
      companyStartedIn,
      companyVision,
      skillsRequired,
      educationRequired,
      experienceRequired,
    })
    if (!createdJob) {
      throw new Error('Error in job creation')
    }

    createdJob.save()
    return createdJob
  } catch (error) {
    throw new Error('Error in job creation')
  }
}


module.exports = {
  createJob
}