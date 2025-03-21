import React, { useEffect } from 'react'
import EmpPage from '../components/EmployeePage'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Employee = () => {
  const { users } = useSelector((state) => state.user || {})
  const navigate = useNavigate()
  useEffect(()=>{
    if (users && users.role == "HR") {
      navigate("/employee")
    }else{
      navigate("/login")
    }

  },[])
  return (
    <>
    <EmpPage />
    </>
  )
}

export default Employee