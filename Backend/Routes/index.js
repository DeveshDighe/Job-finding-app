const { isTokenExist } = require('../middleware/userMiddleware')
const adminRoutes = require('./admin.route')
const applicantRoutes = require('./applicant.routes')
const userRoutes = require('./user.route')

const allRoutes = require('express').Router()

allRoutes.use('/user', userRoutes)
allRoutes.use('/admin', adminRoutes)
allRoutes.use('/applicant', applicantRoutes)



module.exports = allRoutes
