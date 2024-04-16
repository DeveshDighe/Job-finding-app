import {createSlice} from '@reduxjs/toolkit'

const userApplicationsReducer = createSlice({
  initialState : {userApplications : []},

  name : 'userApplicationsReducer',

  reducers : {
    addUserJobApplication : (state, action) => {
      state.userApplications = action.payload
    },
    removeUserJobApplication : (state) => {
      state.userApplications = []
    },
  }
})

export const {addUserJobApplication , removeUserJobApplication} = userApplicationsReducer.actions;
export default userApplicationsReducer.reducer;