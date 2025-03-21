import React, { useState } from 'react'
import Usertable from './Usertable'
import { Breadcrumb, Button, Input, Select } from 'antd'
import { HomeIcon, UserCircleIcon } from '@heroicons/react/16/solid'
import UserForm from './Form'
const UserComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    // const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);
    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }
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
            <span className='flex gap-2'>
              <UserCircleIcon className="h-6 w-6 text-gray-500" />
              <span className='text-gray-400 sm:text-lg'>Users</span>
            </span>
          ),
        },
      ]
      
      
    return (
        <>
            <span className='p-4 md:p-10 flex  justify-between items-center '>
                <span className='flex flex-col gap-2 text-xl  md:text-4xl font-black  '>
                    Users
                <Breadcrumb items={items} />
                </span>
                <span className=''>
                    <Button onClick={showModal} className="bg-green-400 font-bold text-lg  md:text-xl text-black py-6 px-4 " variant="filled">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        Add User
                    </Button>
                </span>
            </span>
            <span className='flex md:justify-end flex-wrap gap-4 items-center px-4 py-4'>
            {/* <span className=' gap-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3  px-4 py-4'> */}
                <span>
                    <Input placeholder="Search By Name ..."   
                     style={{
                            width: 200,
                        }}
                        className='md:min-w-72 lg:min-w-[500px] border-2 flex '
                     size='large' allowClear />
                </span>
                <span>
                    <Select
                        size={"large"}
                        defaultValue="a1"
                         className='md:min-w-72 lg:min-w-[400px] border-2 rounded-xl flex '
                        // onChange={handleChange}
                        style={{
                            width: 200,
                        }}
                        options={options}
                    />
                </span>
                <span>
                    <Button color="primary" size="large" className=' text-lg font-bold text-gray-100 p-4 px-12' variant="solid">
                        Search
                    </Button>
                </span>
            </span>
            <Usertable />
            <UserForm visible={isModalOpen} onClose={handleCancel} />
        </>
    )
}

export default UserComponent