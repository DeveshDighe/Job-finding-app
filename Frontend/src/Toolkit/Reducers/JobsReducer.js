import {createSlice} from '@reduxjs/toolkit'

const jobreducer = createSlice({
  initialState : {jobs : []},

  name : 'jobreducer',

  reducers : {
    addJobs : (state, action) => {
      state.jobs = action.payload
    },
    removeJobs : (state) => {
      state.jobs = []
    },
  }
})

export const {addJobs , removeJobs} = jobreducer.actions;
export default jobreducer.reducer;