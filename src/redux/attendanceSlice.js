import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  singleEmployeeAttendance:null,
  isFetching:false,
  isError:false
}  

export const employeeAttendanceSlice = createSlice({
  name: 'employeeAtt',
  initialState,
  reducers: {
    fetchingEmployeeStart: (state) => {
        state.isFetching = true
    },
    fetchingEmployeeSuccess: (state,action) => {
        state.isFetching = false
        state.singleEmployeeAttendance = action.payload
    },
    fetchingEmployeeErorr: (state) => {
        state.isFetching = false
        state.isError = true
    },
  },
})
   


// Action creators are generated for each case reducer function
export const {fetchingEmployeeStart,fetchingEmployeeSuccess,fetchingEmployeeErorr} = employeeAttendanceSlice.actions

export default employeeAttendanceSlice.reducer