const { register, login, getUserProfile, forgetPassword, addOtp, addNewPassword } = require('../Controller/user.controller')
const { isTokenExist } = require('../middleware/userMiddleware')

const userRoutes = require('express').Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.get('/profile',isTokenExist, getUserProfile)
userRoutes.post('/forget-password-addemail', forgetPassword)
userRoutes.post('/forget-password-otp', addOtp)
userRoutes.post('/update-password', addNewPassword)



module.exports = userRoutes
