import React, { useContext, useEffect } from 'react'
import { MyContext } from '../Context/AuthContext'
import {useSelector, useDispatch} from 'react-redux'
import { addJobs } from '../Toolkit/Reducers/JobsReducer'
import { api } from '../Configer/config'
import JobsMapped from './JobsMapped'

const Home = () => {
  const {state} = useContext(MyContext)

  return (
    <div>
      <JobsMapped/>
    </div>
  )
}

export default Home