const { createJobController, getjob, getAllJobApplication, getSingleJobApplication, rejectApplication, acceptApplication } = require('../Controller/admin.controller')
const { isTokenExist } = require('../middleware/userMiddleware')


const adminRoutes = require('express').Router()

adminRoutes.post('/create-job',isTokenExist, createJobController)
adminRoutes.get('/get-job', getjob)
adminRoutes.get('/get-all=applications', getAllJobApplication)
adminRoutes.post('/get-single-application', getSingleJobApplication)
adminRoutes.patch('/application-reject', isTokenExist,rejectApplication)
adminRoutes.patch('/application-accept', acceptApplication)



module.exports = adminRoutes
