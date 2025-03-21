import React from 'react'
import { Breadcrumb, Button, DatePicker, Form, Input, Select  } from 'antd'
import { UserPlusIcon, UserCircleIcon, HomeIcon, DocumentIcon, PlusIcon, DocumentChartBarIcon, CloudArrowDownIcon } from "@heroicons/react/16/solid";
import LeaveForm from './LeaveForm';
import LeavesTable from './LeavesTable';
const Holiday = () => {
  const items = [
    {
      href: '/',
      title: (
        <span className='flex gap-2 items-center'>
          <HomeIcon className="h-6 w-6 text-gray-500" />
          <span className='text-gray-400 sm:text-lg'>Home</span>
        </span>
      ),
    },
    {
      href: '/annualleave',
      title: (
        <span className='flex gap-2 items-center'>
          <DocumentChartBarIcon className="h-6 w-6 text-gray-300" />
          <span className='text-gray-400 sm:text-lg'> Annual Leaves</span>
        </span>
      ),
    },
  ]
  return (
    <div>
      <span className='flex p-10 flex-wrap gap-4 justify-between items-center '>
        <span className='flex flex-col gap-2 text-xl  md:text-4xl font-black  '>
        Annual Leaves
          <Breadcrumb items={items} />
        </span>
      </span>
     <LeaveForm/>
      <LeavesTable />
    </div>

  )
}

export default Holiday