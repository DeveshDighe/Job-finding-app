import {configureStore} from '@reduxjs/toolkit'
import JobsReducer from '../Reducers/JobsReducer'
import userJobAppliedApp from '../Reducers/userJobAppliedApp'
import allJobAppications from '../Reducers/allJobAppications'


const store = configureStore({
  reducer : {
    JobsReducer,
    userJobAppliedApp,
    allJobAppications
  }
})

export default store