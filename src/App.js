import './App.css';
import Home from './pages/Home';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import SingleEmployee from './pages/SingleEmployee';
import AllUser from './pages/users';
import Layout from './Layout';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import EmpSummary from './components/EmployeeSummary/AttdSummary';
import { useState } from 'react';
import Employee from './pages/employee';
import MarkAttendance from './pages/MarkAttendance';
import Department from './pages/department';
import WorkSheet from './pages/WorkSheet';
import Holiday from './pages/Holiday';
import SickLeaves from './pages/SickLeaves';
import AnnualLeaves from './pages/AnnualLeaves';
function App() {
  const {users} = useSelector((state) => state.user || {})
  const [ name, setName] = useState('')
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={users ? <Navigate to='/' /> : <LoginPage/>} />
          <Route path="/" element={<Layout setName={setName}/>}>
            <Route path='/' element={users ? <Home /> : <Navigate to='/login' />}/>
            <Route path='/AttendanceSheet' element={users ? <SingleEmployee name={name}/> : <Navigate to='/login' />}/>
            {/* <Route path='/EmployeeSummary/:id' element={users ? <EmpSummary/> : <Navigate to='/EmployeeSummary' />}/>
            <Route path='/allUser' element={users ? <AllUser /> : <Navigate to='/login' />}/>
            <Route path='/employee' element={users ? <Employee /> : <Navigate to='/login' />}/>
            <Route path='/markatt' element={users ? <MarkAttendance /> : <Navigate to='/login' />}/>
            <Route path='/department' element={users ? <Department /> : <Navigate to='/login' />}/>
            <Route path='/worksheet' element={users ? <WorkSheet /> : <Navigate to='/login' />}/>
            <Route path='/holiday' element={users ? <Holiday /> : <Navigate to='/login' />}/>
            <Route path='/sickleave' element={users ? <SickLeaves /> : <Navigate to='/login' />}/>
            <Route path='/annualleave' element={users ? <AnnualLeaves /> : <Navigate to='/login' />}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;




