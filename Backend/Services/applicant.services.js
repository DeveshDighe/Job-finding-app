const Jobapplication = require("../Model/application.model");
const { findById } = require("../Model/job.model");
const User = require("../Model/user.model");
const nodemailer = require('nodemailer')

const createApplication = async (userId, reqData) => {
  console.log(userId, reqData , 'userId', 'ReqData');
  try {
    const { jobCategory, jobTypes, skillsHave, educationHave, experienceHave, applicantVision, salaryExpectation } = reqData;

    // Find the user by userId
    const user = await User.findById(userId);

    // Create a new JobApplication instance
    const createdJobApplication = await Jobapplication({
      user: userId,
      jobCategory,
      jobTypes,
      skillsHave,
      salaryExpectation,
      educationHave,
      experienceHave,
      applicantVision
    });

    // If JobApplication creation failed, throw an error
    if (!createdJobApplication) {
      throw new Error('Error in creating jobApplication');
    }

    // Save the created JobApplication
    await createdJobApplication.save();

    // Push the created JobApplication's ID to user's appliedJobs array
    await user.appliedJobs.push(createdJobApplication._id);

    // Save the user
    await user.save();


    // Create a transporter for sending email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user.email,
        pass: process.env.PASS,
      }
    });

    // Construct HTML template for the email with job data
    // Construct HTML template for the email with job data and styling
    const singleApplicationLink = `http://localhost:5173/singleapplication/${createdJobApplication._id}`;

// Construct HTML template for the email with job data and link
const htmlTemplate = `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <h2 style="color: #333;">New Job Application</h2>
  <p><strong style="color: #555;">Job Category:</strong> ${jobCategory}</p>
  <p><strong style="color: #555;">Job Types:</strong> ${jobTypes}</p>
  <p><strong style="color: #555;">Skills Have:</strong> ${skillsHave}</p>
  <p><strong style="color: #555;">Education Have:</strong> ${educationHave}</p>
  <p><strong style="color: #555;">Experience Have:</strong> ${experienceHave}</p>
  <p><strong style="color: #555;">Applicant Vision:</strong> ${applicantVision}</p>
  <p>Click <a href="${singleApplicationLink}" style="color: blue; text-decoration: underline;">here</a> to view the application.</p>
</div>
`;


    // Configure mail options
    const mailOptions = {
      from: process.env.EMAIL,
      to: 'deveshdighe7d@gmail.com', // Replace with recipient email address
      subject: "Job Application",
      html: htmlTemplate
    };


    // Send email
    transporter.sendMail(mailOptions)
      .then(() => {
        console.log('Mail successfully sent');
      })
      .catch((err) => {
        console.log('Error sending mail:', err);
      });

    return createdJobApplication;

  } catch (error) {
    console.log(error);
    throw new Error('Error in creating jobApplication');
  }
};



module.exports = {
  createApplication
}