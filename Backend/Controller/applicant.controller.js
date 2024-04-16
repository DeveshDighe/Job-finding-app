const jwt = require('jsonwebtoken');
const { createApplication } = require('../Services/applicant.services');
const Jobapplication = require('../Model/application.model');

const applyJob = async(req,res)=>{
  console.log('gggg');
  try {
    const FrontToken = req.token;
    console.log(FrontToken , 'Front');
    const GrossToken = await jwt.verify(FrontToken , process.env.SECRET_KEY)
    console.log(GrossToken , 'GrossToken');
    const userId = GrossToken.id
    const createdApplication =await createApplication(userId , req.body)
    console.log(createdApplication, 'createdApplications');

    return res.status(200).json({msg : 'Applied Successfully', success : true, createdApplication})
  } catch (error) {
    return res.status(400).json({msg : 'Applly UnSuccess', success : false})
  }
}


const getapplidJob = async (req,res) => {
  try {
    const FrontToken = req.token;
    const GrossToken = await jwt.verify(FrontToken , process.env.SECRET_KEY)
    console.log(GrossToken , 'GrossToken');
    const userId = GrossToken.id
    console.log(userId, 'This is useId');
    const allAplliedData =await Jobapplication.find({user : userId}).populate('user')
    console.log(allAplliedData , 'a;;;;;;;;');

    return res.status(200).json({msg : 'fetched all Job Apllication', success : true, allAplliedData})
  } catch (error) {
    console.log(error);
    return res.status(400).json({msg : 'Error in fetching all Job Apllication', success : false})
  }
}



module.exports = {
  applyJob,
  getapplidJob
}