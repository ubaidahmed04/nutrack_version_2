import { configureStore,combineReducers  } from '@reduxjs/toolkit'
import { persistStore, persistReducer,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import employeeSlice from './employeeSlice'
import employeeAttendanceSlice from './attendanceSlice'
import employerAttendanceSlice from './allAttendanceSlice'
import employeeDataSlice from './employeeData'
import loginSlice from './userSlice'
import setDatesSlice from './setDates'
const loginPersistConfig = {
  key: 'login',
  version: 1,
  storage,
}

// Persist configuration for employee slice
const employeePersistConfig = {
  key: 'employees',
  version: 1,
  storage,
}
const persistedLoginReducer = persistReducer(loginPersistConfig, loginSlice)
const persistedEmployeeReducer  = persistReducer(employeePersistConfig, employeeSlice)
const rootReducer = combineReducers({ 
  user: persistedLoginReducer,
  employees: persistedEmployeeReducer,
  setDates: setDatesSlice,
  employeeAtt:employeeAttendanceSlice,
  employerAtt:employerAttendanceSlice,
  employee:employeeDataSlice,
})
const store = configureStore({
    reducer: rootReducer
  })
let persistor = persistStore(store)

export { store, persistor }