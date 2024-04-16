import {createSlice} from '@reduxjs/toolkit'

const applicationsReducer = createSlice({
  initialState : {AllApplications : []},

  name : 'ApplicationsReducer',

  reducers : {
    addJobApplication : (state, action) => {
      state.AllApplications = action.payload
    },
    removeJobApplication : (state) => {
      state.AllApplications = []
    },
  }
})

export const {addJobApplication , removeJobApplication} = applicationsReducer.actions;
export default applicationsReducer.reducer;