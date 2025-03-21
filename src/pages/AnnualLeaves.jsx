import React, { useEffect } from 'react'
import AnnualLeave from '../components/annualleave'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AnnualLeaves = () => {
  const { users } = useSelector((state) => state.user || {})
  const navigate = useNavigate()
    useEffect(()=>{
      if (users && users.role == "HR") {
        navigate("/annualleave")
      }else{
        navigate("/login")
      }
  
    },[])
  return (
    <>   
    <AnnualLeave/>
    </>
  )
}

export default AnnualLeaves