const OTP = require("../Model/otp.model");
const User = require("../Model/user.model");
const { createUser, getUser, getUserWithToken } = require("../Services/user.services")
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')


const register = async (req,res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({user , msg : 'User Registerd', success : true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const login = async (req,res) => {
  try {
    console.log('login');
    const user = await getUser(req.body);
    const token = await jwt.sign({id : user._id}, process.env.SECRET_KEY, {expiresIn : '1d'})
    res.status(201).json({user , msg : 'Login Successfull', success : true , token : token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getUserProfile = async (req,res) => {
  try {
    const FrontToken = req.token;
    const GrossToken = await jwt.verify(FrontToken , process.env.SECRET_KEY)
    console.log(GrossToken , 'GrossToken');
    const userId = GrossToken.id
    const user =await getUserWithToken(userId)

    return res.status(200).json({success : true, user})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const forgetPassword = async (req, res) => {
  try {
    console.log('ddddFFFF');
    const {useremail} = req.body;

    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    const createdOtp = await OTP({
      email : useremail,
      otpNumber : randomNumber
    })
    console.log('1');

    createdOtp.save()

    const trasporter = nodemailer.createTransport({
      service : 'gmail',
      auth : {
        user : process.env.ADMINEMAIL,
        pass : process.env.ADMINPASS,
      }
    })
    console.log('11');

    const mailOptions = {
      from : process.env.ADMINEMAIL,
      to : useremail,
      subject : "Reset forgot password",
      html: `<p style="font-size: medium;">Enter This <span style="color: blue;">${randomNumber}</span> in otp field of reset password</p>`
    }

    console.log('2');
    
    trasporter.sendMail(mailOptions).then(()=>{
      console.log('Mail successfully send');
    })
    .catch((err)=>{
      console.log('Error', err);
    })

    return res.status(200).json({msg: 'OTP sent on email', success : true})
  } catch (error) {
    return res.status(400).json({msg: "Email can not send", success : false})
  }
}


const addOtp =async (req ,res) =>{
  console.log('1111');
  try {
    const {useremail , userotp} = req.body;
    console.log('2222' , useremail, userotp);

    const isEmailExist = await User.findOne({email : useremail})

    if (!isEmailExist) {
      return res.status(500).json({error : 'Email is incorrect', success : false})
    }

    const isOtpCorrect = await OTP.findOne({otpNumber : userotp , email : useremail})

    if (!isOtpCorrect) {
      return res.status(503).json({error : 'Otp is incorrect', success : false})
    }
    console.log(isOtpCorrect , 'ha correct hai');

    const removeOtp = await OTP.findByIdAndDelete(isOtpCorrect._id)

    return res.status(200).json({msg: "Enter new password" , success :true})

  } catch (error) {
    return res.status(404).json({error : 'Otp is incorrect', success : false})
  }
}
const addNewPassword =async (req ,res) =>{
  console.log('3232231' , req.body);
  try {
    const {useremail , userpassword} = req.body;
    console.log('2222' , useremail, '3dsfsf', userpassword);

    const user = await User.findOne({email : useremail})
    console.log(user, 'user');

    if (!user) {
      return res.status(500).json({error : 'Email is incorrect', success : false})
    }


    const hashedPass = await bcrypt.hash(userpassword , 10)

    user.password = hashedPass;
    const updatedUser = await user.save();

    return res.status(200).json({msg: "Password is updated" , success :true,})

  } catch (error) {
    console.log(error);
    return res.status(404).json({error : 'Unable to update password', success : false})
  }
}

module.exports = {
  register,
  login,
  getUserProfile,
  forgetPassword,
  addOtp,
  addNewPassword
}