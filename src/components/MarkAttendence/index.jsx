import React, { useState } from 'react'
import { Button, Input, Modal, Select ,DatePicker,  Card, Col, Row } from 'antd'
import AttTable from './attTable'
import MarkAttModal from './markAttModal'

const MarkAttendance = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = () => setIsModalOpen(true);
      // const handleOk = () => setIsModalOpen(false);
      const handleClose = () => setIsModalOpen(false);
  return (
    <>
     <span className='flex justify-start flex-wrap gap-4  px-4 py-4  overflow-hidden'>
        <span>
            <DatePicker placeholder="Select Date ..."
            style={{
            width: 300,
            }}          
            size='large'  />
        </span>
        {/* <span className='flex gap-4 flex-wrap'> */}
        <Button color="primary" size="large" className=' text-lg font-bold text-gray-100 p-4  md:px-20' variant="solid">
            Search 
        </Button>      
        <Button  onClick={showModal} color="primary" size="large" className='bg-[#6436cf] text-lg font-bold text-gray-100 p-4  md:px-20' variant="solid">
            Mark Attendence 
        </Button>      
        {/* <Button color="primary" size="large" className='bg-[#36CFC9] text-lg font-bold text-gray-800 p-4  md:px-20' variant="solid">
            Daily Report  
        </Button>       */}
        {/* </span> */}
    </span>
     <span gutter={16} className='flex gap-2 items-center justify-center'>
    <Col span={8} className='text-center flex flex-col gap-2 shrink w-full'>
       <span className='text-sm md:text-xl  text-center font-semibold'>Annual Leaves</span>
       <span className='text-xl bg-gray-100 shadow-2xl p-2 border-2 rounded-xl   font-black '>06</span>
    </Col>
    <Col span={8} className='text-center flex flex-col gap-2 w-full'>
       <span className='text-sm md:text-xl  text-center font-semibold'>Sick Leaves</span>
       <span className='text-xl bg-gray-100 shadow-2xl p-2 border-2 rounded-xl   font-black '>06 </span>
    </Col>
    <Col span={8} className='text-center flex flex-col gap-2 w-full'>
       <span className='text-xl  text-center font-semibold text-white'>.</span>
       <span className='  md:text-xl bg-gray-100 shadow-2xl p-2 border-2 rounded-xl  font-semibold lg:font-black '>Annual Leaves and Sick Leaves </span>
    </Col>
  </span>
  <AttTable/>
  <MarkAttModal  open={isModalOpen} onClose={handleClose}/>
    </>
  )
}

export default MarkAttendance