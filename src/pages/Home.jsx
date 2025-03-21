import React, { useEffect } from 'react'
import { AttendanceTable, Loader } from '../components'
import { getRequest } from '../utils/APICall'
import { useDispatch, useSelector } from 'react-redux'
import { depatmentList, employeeList } from '../redux/employeeSlice'

const Home = () => {
    const dipatch = useDispatch()
    
    const {allEmployee} = useSelector((state) => state.employees || {})

    const {users} = useSelector((state) => state.user || {})
    // console.log(users)
    const fetchAttendance = async() =>{
        try {
            // const response = await getRequest('getAllUser?departmentcode=5')
            const response = await getRequest(`${users?.role == "HR" ? "getAllUser" : "getAllUser?departmentcode=5"}`)
            dipatch(employeeList(response.data))
        } catch (error) {
            console.log(error)
        }
    }
    const getAllDepartment = async() =>{
        try {
            // const response = await getRequest('getAllUser?departmentcode=5')
            const response = await getRequest(`${users?.role == "HR" ? "getAllDept" : "getAllDept?departmentcode=5"}`)
            dipatch(depatmentList(response))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
       if(users){
        fetchAttendance()
        getAllDepartment()
       }
    },[])
    return (
        <>
            {allEmployee ? <AttendanceTable empAttendance={allEmployee}/> : <Loader/>}
        </>
    )
}

export default Home