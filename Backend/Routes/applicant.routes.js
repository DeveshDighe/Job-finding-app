const { applyJob, getapplidJob } = require('../Controller/applicant.controller')
const { isTokenExist } = require('../middleware/userMiddleware')



const applicantRoutes = require('express').Router()

applicantRoutes.post('/apply-job',isTokenExist, applyJob)
applicantRoutes.get('/get-applied-job',isTokenExist, getapplidJob)



module.exports = applicantRoutes 
