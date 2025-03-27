import React, { useState } from 'react'
import { ChartBarSquareIcon ,EllipsisVerticalIcon ,EnvelopeIcon, PhoneIcon, IdentificationIcon, BriefcaseIcon  } from "@heroicons/react/16/solid";
import { Button, message, Popconfirm } from 'antd'
import EditEmpForm from './EditEmpForm';
const EmpCard = () => {
  const [editModal, setEditModal] = useState(false)
    const confirm = (e) => {
        // console.log(e);
        // message.success('Click on edit');
        setEditModal(true)

      };
      const CloseEditModal = ()=>{
        setEditModal(false)
      }
      const cancel = (e) => {
        console.log(e);
        message.error('Click on delete');
      };
  return (
    <div className="bg-[#FFFFFF] p-6 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif]  mt-4">
    <div className='flex justify-end'>
    <Popconfirm
    // title="Delete the task"
    // description="Are you sure to delete this task?"
    onConfirm={confirm}
    onCancel={cancel}
    icon=""
    placement="rightBottom"
    okText="Edit"
    cancelText="Delete"
  >
        <EllipsisVerticalIcon className="h-6 w-6 text-gray-500"/>
    {/* <Button danger>Delete</Button> */}
  </Popconfirm>
    </div>
  <div className="flex flex-col items-center">
    <div className="min-h-[110px]">
      <img
        src="https://readymadeui.com/team-1.webp"
        className="w-28 h-w-28 rounded-full"
      />
    </div>
    <div className="mt-4 text-center">
      <p className="text-lg text-gray-800 font-bold">John Doe</p>
      <p className="text-sm font-bold text-gray-500 mt-1">Marketing Coordinator</p>
    </div>
  </div>
  {/* detail  */}
  <div className="bg-[#F2F7FA] border-gray-200 border-2 p-4 rounded-md space-y-3">
      {/* Emp ID */}
      <div className="flex items-center space-x-2">
        <IdentificationIcon className="h-6 w-6 text-gray-500" />
        <span className='text-gray-800 font-medium text-sm'> #23434</span>
      </div>

      {/* Job Title */}
      <div className="flex items-center space-x-2">
        <BriefcaseIcon className="h-6 w-6 text-gray-500" />
        <span className='text-gray-800 font-medium text-sm'>Marketing Coordinator</span>
      <div className="flex items-center space-x-2">
        <BriefcaseIcon className="h-6 w-6 text-gray-500" />
        <span className='text-gray-800 font-medium text-sm'>Full Time </span>
      </div>
      </div>

      {/* Email */}
      <div className="flex items-center space-x-2">
        <EnvelopeIcon className="h-6 w-6 text-gray-500" />
        <span className='text-blue-500 bg-white border-2  rounded-xl p-0.5  font-thin text-sm'>ubaidahmed@gmail.com</span>
      </div>

      {/* Phone */}
      <div className="flex items-center space-x-2">
        <PhoneIcon className="h-6 w-6 text-gray-500" />
        <span className='text-blue-500 bg-white border-2  rounded-xl p-0.5  font-semibold text-sm'>03123456789</span>
      </div>
    </div>
    <EditEmpForm visible={editModal} onClose={CloseEditModal}/>
</div>

  )
}

export default EmpCard