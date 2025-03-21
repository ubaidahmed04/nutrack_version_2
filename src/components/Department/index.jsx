import React, { useState } from 'react'
import { Breadcrumb, Button, DatePicker, Form, Select } from 'antd'
import { UserPlusIcon , UserCircleIcon ,HomeIcon, DocumentIcon, PlusIcon  } from "@heroicons/react/16/solid";
import DepartModal from './departModal';
import DepartTable from './deprtTable';
const Departments = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = () => setIsModalOpen(true);
      const items = [
            {
              href: '/',
              title:  (
                  <span className='flex gap-2 items-center'>
                    <HomeIcon className="h-6 w-6 text-gray-500" />
                    <span className='text-gray-400 sm:text-lg'>Home</span>
                  </span>
                ),
            },
            {
              href: '/department',
              title: (
                <span className='flex gap-2 items-center'>
                  <DocumentIcon  className="h-6 w-6 text-gray-300" />
                  <span className='text-gray-400 sm:text-lg'>Department</span>
                </span>
              ),
            },
          ]
    const handleClose = () => setIsModalOpen(false);

  return (
    <div>
    <span className='flex p-10 flex-wrap gap-4 justify-between items-center '>
    <span className='flex flex-col gap-2 text-xl  md:text-4xl font-black  '>
        Department
        <Breadcrumb  items={items}/>
    </span>
    <span className=''>
      <Button onClick={showModal} className="bg-green-400 font-bold  lg:text-xl text-black py-6 px-4 " variant="filled">
      <PlusIcon  className="h-6 w-6 text-gray-800 " />   Add Department
      </Button>
    </span>
    </span>
   <DepartTable/>
    <DepartModal visible={isModalOpen} onClose={handleClose}/>
    </div>

  )
}

export default Departments