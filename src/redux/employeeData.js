import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  empl:null,
}

export const employeeDataSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getEmployeeInfo: (state,action) => {
        state.empl = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {getEmployeeInfo} = employeeDataSlice.actions

export default employeeDataSlice.reducer