import React, { useEffect } from 'react'
import UserComponent from '../components/UsersPage'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Users = () => {
  const { users } = useSelector((state) => state.user || {})
  const navigate = useNavigate()
    useEffect(()=>{
      if (users && users.role == "HR") {
        navigate("/allUser")
      }else{
        navigate("/login")
      }
  
    },[])
  return (
    <>   
    <UserComponent/>
    </>
  )
}

export default Users