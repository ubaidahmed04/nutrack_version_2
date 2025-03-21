import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Departments from '../components/Department'

const Department = () => {
  const { users } = useSelector((state) => state.user || {})
  const navigate = useNavigate()
  useEffect(()=>{
    if (users && users.role == "HR") {
      navigate("/department")
    }else{
      navigate("/login")
    }

  },[])
  return (
    <>
    <Departments />
    </>
  )
}

export default Department