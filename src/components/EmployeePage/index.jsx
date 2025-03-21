import React, { useState } from 'react'
import EmpCard from './EmpCard'
import { Breadcrumb, Button, Form, Select } from 'antd'
import { UserPlusIcon , UserCircleIcon ,HomeIcon  } from "@heroicons/react/16/solid";
import EmpForm from './EmpForm';


const EmpPage = () => {
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
          href: '/employee',
          title: (
            <span className='flex gap-2 items-center'>
              <UserCircleIcon className="h-6 w-6 text-gray-500" />
              <span className='text-gray-400 sm:text-lg'>Employees</span>
            </span>
          ),
        },
      ]
    // const handleOk = () => setIsModalOpen(false);

    const handleClose = () => setIsModalOpen(false);

    return (
        <div>
            <span className='flex p-10 flex-wrap gap-4 justify-between items-center '>
                <span className='flex flex-col gap-2 text-xl  md:text-4xl font-black  '>
                    Employee
                    <Breadcrumb  items={items}/>
                </span>
                <span className='flex w-60 sm:w-72'>
        <Select 
         size={"large"}
         style={{
            width:"400px"
         }}
        defaultValue="All"
        >
          <Select.Option value="digitalMarket">Digital Marketing</Select.Option>
          <Select.Option value="webdevelopment">Web Development</Select.Option>
          <Select.Option value="accandfinance">Account And Finance</Select.Option>
        </Select>
                </span>
                <span className=''>
                    <Button onClick={showModal} className="bg-green-400 font-bold  lg:text-xl text-black py-6 px-4 " variant="filled">
                    <UserPlusIcon className="h-6 w-6 text-gray-800 " />   Add Employee
                    </Button>
                </span>
              
            </span>
            <span className='grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <EmpCard />
                <EmpCard />
                <EmpCard />
                <EmpCard />
                <EmpCard />
                <EmpCard />
                <EmpCard />
                <EmpCard />
                <EmpCard />
                <EmpCard />
                <EmpCard />
                <EmpCard />

            </span>
            <EmpForm visible={isModalOpen} onClose={handleClose}/>
        </div>
    )
}

export default EmpPage