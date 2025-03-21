import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allEmployee:null,
  allDept:null
}

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    employeeList: (state,action) => {
        state.allEmployee = action.payload
    },
    depatmentList: (state,action) => {
        state.allDept = action.payload
    },
    emptyEmployee:(state,action) => {
      state.allEmployee = null
  }
  },
})

// Action creators are generated for each case reducer function
export const { employeeList,emptyEmployee,depatmentList } = employeeSlice.actions

export default employeeSlice.reducer