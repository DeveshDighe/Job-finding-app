const Jobapplication = require("../Model/application.model")
const Jobs = require("../Model/job.model")
const { createJob } = require("../Services/admin.services")
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { getUserWithToken } = require("../Services/user.services")


const createJobController = async (req,res) =>{
  try {
    const NewJob = await createJob(req.body)

    return res.status(201).json({msg: 'job created', success : true, createdJob : NewJob})
  } catch (error) {
    return res.status(400).json({msg : 'Error in Job creation' , success : false})
  }
}

const getjob = async (req,res) => {
  try {
    const allJobs = await Jobs.find()
    console.log(allJobs, 'allJobs');
    return res.status(200).json({msg : 'All jobs found', success: true , allJobs})
  } catch (error) {
    return res.status(400).json({msg : 'can not find job', success: false})
  }
}

const getAllJobApplication = async (req,res) => {
  try {
    const allAplliedData =await Jobapplication.find().populate('user')
    console.log(allAplliedData , 'a;;;;;;;;');

    return res.status(200).json({msg : 'fetched all Job Apllication', success : true, allAplliedData})
  } catch (error) {
    console.log(error);
    return res.status(400).json({msg : 'Error in fetching all Job Apllication', success : false})
  }
}
const getSingleJobApplication = async (req,res) => {
  try {
    const {id} = req.body
    const singleAppication =await Jobapplication.findById(id).populate('user')
    console.log(singleAppication , 'a;;;;;;;;');

    return res.status(200).json({msg : 'fetched singleAppication', success : true, singleAppication})
  } catch (error) {
    console.log(error);
    return res.status(400).json({msg : 'Error in fetching singleAppication', success : false})
  }
}


const rejectApplication = async (req, res) => {
  try {
    const {id , rejectReason} = req.body;

    // const FrontToken = req.token;
    // const GrossToken = await jwt.verify(FrontToken , process.env.SECRET_KEY)
    // console.log(GrossToken , 'GrossToken');
    // const userId = GrossToken.id
    // const user =await getUserWithToken(userId)

    console.log(id , rejectReason);

    const appication = await Jobapplication.findById(id).populate('user')

    appication.status = "Rejected"
    appication.rejectReason = rejectReason;

    const trasporter = nodemailer.createTransport({
      service : 'gmail',
      auth : {
        user : process.env.ADMINEMAIL,
        pass : process.env.ADMINPASS,
      }
    })
    console.log('11');

    const mailOptions = {
      from: process.env.ADMINEMAIL,
      to: appication.user.email,
      subject: "Your Application Is Rejected",
      html: `
        <p style="font-size: medium;">Dear ${appication.user.name},</p>
        <p style="font-size: medium;">We are sorry to inform you that your application has been rejected due to the following reason:</p>
        <p style="font-size: medium; color: red;">${rejectReason}</p>
        <p style="font-size: medium;">If you have any further inquiries or would like to discuss this matter further, please feel free to contact us.</p>
      `
    };
    

    console.log('2');
    
    trasporter.sendMail(mailOptions).then(()=>{
      console.log('Mail successfully send');
    })
    .catch((err)=>{
      console.log('Error', err);
    })

    appication.save()

    return res.status(206).json({msg : 'Application rejected', success : true, appication})


  } catch (error) {
        return res.status(400).json({msg : 'Application rejection fails', success : false})
  }
}
const acceptApplication = async (req, res) => {
  try {
    const {id } = req.body;

    

    const appication = await Jobapplication.findById(id).populate('user')

    appication.status = "Accepted"

    appication.save()

    return res.status(206).json({msg : 'Application accepted', success : true, appication})


  } catch (error) {
        return res.status(400).json({msg : 'Application accept failed', success : false})
  }
}

module.exports = {
  createJobController,
  getjob,
  getAllJobApplication,
  getSingleJobApplication,
  acceptApplication,
  rejectApplication
}