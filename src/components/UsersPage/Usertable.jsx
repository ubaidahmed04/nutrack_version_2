import React, { useState } from 'react'
import EditUserForm from './EditUser';
import DeleteModal from './DeleteModal';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid';

const Usertable = () => {
  const T_Head = ["Name", "Email", "Role", "Joined At", "Action"] 
  const users = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      role: "Admin",
      joinedAt: "2023-01-15",
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      role: "Editor",
      joinedAt: "2023-03-22",
    },
    {
      name: "Mike Johnson",
      email: "mikejohnson@example.com",
      role: "Subscriber",
      joinedAt: "2023-06-10",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      role: "Author",
      joinedAt: "2023-07-05",
    },
    {
      name: "David Brown",
      email: "davidbrown@example.com",
      role: "Contributor",
      joinedAt: "2023-08-19",
    },
  ];
  const [isModalOpen , setIsModalOpen]  = useState(false)
    const showModal = () => setIsModalOpen(true);
  const handleCancel = () =>{
    setIsModalOpen(false)
  }
  return (
    <div className="font-[sans-serif] overflow-x-auto">
  <table className="min-w-full bg-white">
    <thead className="bg-primaryPurple  whitespace-nowrap">
      <tr>
        {
          T_Head.map((item,index)=>(
            <th className="p-4 text-left text-sm md:text-lg font-bold text-white" key={index}>{item}</th>
          ))
        }
      </tr>
    </thead>
    <tbody className="whitespace-nowrap">
      {
        users.map((item,index)=>(
          <tr className="even:bg-blue-50 " key={index}>
          <td className="p-4 text-sm text-black">{item.name}</td>
          <td className="p-4 text-sm text-black">{item.email}</td>
          <td className="p-4 text-sm text-black">{item.role}</td>
          <td className="p-4 text-sm text-black">{item.joinedAt}</td>
          <td className="p-4">
            <button className="mr-4" onClick={showModal} title="Edit">
            <PencilSquareIcon  class="h-6 w-6 text-blue-500" />
            </button>
            <DeleteModal children={<button className="mr-4" title="Delete">
              <TrashIcon class="h-6 w-6 text-red-500" />
            </button>}/>
              
          </td>
        </tr>

        ))
      }
    </tbody>
  </table>
  <EditUserForm visible={isModalOpen} onClose={handleCancel}/>
</div>

  )
}

export default Usertable