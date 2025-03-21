import React from 'react'
import { Breadcrumb, Button, DatePicker, Form, Input, Select  } from 'antd'
import { UserPlusIcon, UserCircleIcon, HomeIcon, DocumentIcon, PlusIcon, DocumentChartBarIcon, CloudArrowDownIcon } from "@heroicons/react/16/solid";
import HolidayTable from './holidayTable';
import InputFields from '../../utils/UserInput';
const { TextArea } = Input;
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
      href: '/worksheet',
      title: (
        <span className='flex gap-2 items-center'>
          <DocumentChartBarIcon className="h-6 w-6 text-gray-300" />
          <span className='text-gray-400 sm:text-lg'> Holiday Schedule</span>
        </span>
      ),
    },
  ]
  return (
    <div>
      <span className='flex p-10 flex-wrap gap-4 justify-between items-center '>
        <span className='flex flex-col gap-2 text-xl  md:text-4xl font-black  '>
        Holiday Schedule
          <Breadcrumb items={items} />
        </span>
      </span>
      <span className='flex md:justify-start  flex-wrap gap-4 items-center px-4 py-4'>
        <span>
          <DatePicker placeholder="From Date ..."
            style={{
              width: 300,
            }}
            size='large' />
        </span>
        <span>
          <DatePicker placeholder="To Date ..."
            style={{
              width: 300,
            }}
            size='large' />
        </span>
        <span>
        <TextArea
         placeholder="description"
         rows={2}
      />
        </span>
            <span>
          <Button color="primary" size="large" className='ml-4 text-lg font-bold text-gray-100 p-4 px-12' variant="solid">
            Submit
          </Button>
            </span>
      </span>
      <HolidayTable />
    </div>

  )
}

export default Holiday