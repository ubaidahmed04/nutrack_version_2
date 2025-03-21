import React, { useEffect } from 'react'
import SickLeave from '../components/Sickleave'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SickLeaves = () => {
  const { users } = useSelector((state) => state.user || {})
  const navigate = useNavigate()
    useEffect(()=>{
      if (users && users.role == "HR") {
        navigate("/sickleave")
      }else{
        navigate("/login")
      }
  
    },[])
  return (
    <>   
    <SickLeave/>
    </>
  )
}

export default SickLeaves