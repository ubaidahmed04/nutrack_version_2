import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users:null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LoginSuccess: (state,action) => {
        state.users = action.payload
    },
    Logout:(state) =>{
        state.users = null
    }
    
  },
})

// Action creators are generated for each case reducer function
export const {LoginSuccess,Logout} = userSlice.actions

export default userSlice.reducer