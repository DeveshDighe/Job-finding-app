import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import RegisterForm from './Components/Register'
import Navbar from './Components/NavBar'
import LoginForm from './Components/Login'
import Home from './Components/Home'
import { api } from './Configer/config'
import { MyContext } from './Context/AuthContext'
import Forgotpassword from './Components/Forgotpassword'
import JobCreationForm from './Components/JobCreate'
import { useDispatch } from 'react-redux'
import { addJobs } from './Toolkit/Reducers/JobsReducer'
import ApplyJobForm from './Components/ApplyForJob'
import AppliedJob from './Components/AppliedJob'
import GetAllJobApplication from './Components/Admin/GetAllApplications'
import SingleApplication from './Components/Admin/SingleApplication'
import Footer from './Components/Footer'

function App() {

  const {dispatch} = useContext(MyContext)
  const dispatchR = useDispatch()

  const getJobs =async () =>{
    try {
      console.log('Hit getJob');
      const response = await api.get('admin/get-job')
      dispatchR(addJobs(response.data.allJobs))
      console.log(response);
    } catch (error) {
      
    }
  }

  const getUser =async () => {
    try {
      const response = await api.get('user/profile')
      console.log(response , 'responce');
      if (response.data.success) {
        dispatch({type : "ADD_USER" , payload : response.data.user})
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  useEffect(() => {
    getUser();
    getJobs()
  }, [])
  

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/forgot-password' element={<Forgotpassword/>}/>
        <Route path='/create-job' element={<JobCreationForm/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-for-job' element={<ApplyJobForm/>}/>
        <Route path='/applied-jobs-applications' element={<AppliedJob/>}/>
        <Route path='/get-all-jobApplication' element={<GetAllJobApplication/>}/>
        <Route path='/singleapplication/:id' element={<SingleApplication/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
