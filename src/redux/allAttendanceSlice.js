import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allEmployeeAttendance:null,
  isFetching:false,
  isError:false
}

export const employerAttendanceSlice = createSlice({
  name: 'employerAtt',
  initialState,
  reducers: {
    fetchingEmployerStart: (state) => {
        state.isFetching = true
    },
    fetchingEmployerSuccess: (state,action) => {
        state.isFetching = false
        state.allEmployeeAttendance = action.payload
    },
    fetchingEmployerErorr: (state) => {
        state.isFetching = false
        state.isError = true
    },
  },
})

// Action creators are generated for each case reducer function
export const {fetchingEmployerStart,fetchingEmployerSuccess,fetchingEmployerErorr} = employerAttendanceSlice.actions

export default employerAttendanceSlice.reducer