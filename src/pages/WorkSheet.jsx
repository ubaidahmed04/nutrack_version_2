import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Worksheet from '../components/WorkSheet'

const WorkSheet = () => {
  const { users } = useSelector((state) => state.user || {})
  const navigate = useNavigate()
  useEffect(()=>{
    if (users && users.role == "HR") {
      navigate("/worksheet")
    }else{
      navigate("/login")
    }

  },[])
  return (
    <>
    <Worksheet />
    </>
  )
}

export default WorkSheet