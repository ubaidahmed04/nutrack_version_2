import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import MarkAttPage from '../components/MarkAttendence'
import { Breadcrumb } from 'antd'
import { HomeIcon, BookOpenIcon , UserCircleIcon } from '@heroicons/react/16/solid'

const MarkAttendance = () => {
  const { users } = useSelector((state) => state.user || {})
  const navigate = useNavigate()
  useEffect(() => {
    if (users && users.role == "HR") {
      navigate("/markatt")
    } else {
      navigate("/login")
    }

  }, [])
  const items = [
    {
      href: '/',
      title:  (
          <span className='flex gap-2'>
            <HomeIcon className="h-6 w-6 text-gray-500" />
            <span className='text-gray-400'>Home</span>
          </span>
        ),
    },
    {
      href: '/markatt',
      title: (
        <span className='flex gap-2'>
          <BookOpenIcon  className="h-6 w-6 text-gray-500" />
          <span className='text-gray-400'>Attendence</span>
        </span>
      ),
    },
  ]
  return (
    <>
      <span className='p-4  flex flex-col gap-2 text-2xl font-bold  '>
        Attendence
        <Breadcrumb items={items} />
      </span>

      <MarkAttPage />
    </>
  )
}

export default MarkAttendance