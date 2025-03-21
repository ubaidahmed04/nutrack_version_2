import React, { useEffect } from 'react'
import HolidayComp from '../components/Holiday'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Holiday = () => {
  const { users } = useSelector((state) => state.user || {})
  const navigate = useNavigate()
    useEffect(()=>{
      if (users && users.role == "HR") {
        navigate("/holiday")
      }else{
        navigate("/login")
      }
  
    },[])
  return (
    <>   
    <HolidayComp/>
    </>
  )
}

export default Holiday