import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoader:false,
  allDept:[],
}

export const deptSlice = createSlice({
  name: 'dept',
  initialState,
  reducers: {
    getAllDeptStart: (state,action) => {
        state.isLoader= true
    },
    getAllDeptSuccess: (state,action) => {
        state.isLoader= false
        state.allDept = action.payload
    },
    updateDept: (state,action) => {
        const Index = state.allDept.findIndex(dept => dept.CODE === action.payload.CODE);
        if(Index !== -1 ){
          state.allDept[Index] = action.payload;
        }
      }
    
  },
})

export const {getAllDeptStart, getAllDeptSuccess,updateDept  } = deptSlice.actions

export default deptSlice.reducer