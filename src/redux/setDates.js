import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toDate:"",
  fromDate:""
}

export const setDatesSlice = createSlice({
  name: 'setDates',
  initialState,
  reducers: {
    reduxToDate: (state,action) => {
        state.toDate = action.payload
    },
    reduxFromDate:(state,action) =>{
        state.fromDate = action.payload
    }
    
  },
})

// Action creators are generated for each case reducer function
export const {reduxToDate,reduxFromDate} = setDatesSlice.actions

export default setDatesSlice.reducer