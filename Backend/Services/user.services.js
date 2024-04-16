const User = require("../Model/user.model.js");
const bcrypt = require('bcrypt')


const createUser = async (userData) => {
  try {
    const { name, email, password } = userData;
    console.log(name, email, password);

    const isUserExist = await User.findOne({ email });

    const hashhedPass = await bcrypt.hash(password , 10)

    if (isUserExist) {
      throw new Error('User already exists');
    }

    // Create the user if it doesn't exist
    const newUser = await User({
      name,
      email,
      password : hashhedPass,
    });

    newUser.save()

    return newUser;

  } catch (error) {
    throw error;
  }
}

const getUser =async (userData) =>{
  try {
    const {password , email} = userData;
    console.log(userData);

    const user = await User.findOne({email})
    if (!user) {
      throw new Error('Email do not exist')
    }
    console.log('a', password , 'b', user.password);
    const isPasswordCorrect = await bcrypt.compare(password , user.password)
    console.log('b',isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect')
    }
    console.log('11111');
    return user

  } catch (error) {
    console.log(error , 'errrrr');
    throw error;

  }
}

const getUserWithToken = async (token) =>{
  try {
    const user =await User.findById(token)

    if (!user) {
      throw new Error('User did not found with token')
    }

    return user;
  } catch (error) {
    throw error
  }
}

module.exports = {
  createUser,
  getUser,
  getUserWithToken
}