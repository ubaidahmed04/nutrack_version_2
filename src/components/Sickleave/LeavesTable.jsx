import { PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react'
import DeleteModal from '../UsersPage/DeleteModal';

const LeavesTable = () => {
   const [isModalOpen , setIsModalOpen]  = useState(false)
   const showModal = () => setIsModalOpen(true);
   const handleCancel = () =>{
      setIsModalOpen(false)
    }
  const T_Head = ["#", "Employee Name", "Leave Type", "Remarks", "From Date", "To Date", "Action"] 
  const LeavesTable   = [
    {
      id: 1, // Corresponds to "#"
      employeeName: "John Doe",
      leaveType: "National Holiday",
      remarks: "National Day celebration",
      fromDate: "2025-03-23",
      toDate: "2025-03-23",
      action: "View Details", // Example action text (you can customize it)
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      leaveType: "Public Holiday",
      remarks: "Eid-ul-Fitr",
      fromDate: "2025-04-21",
      toDate: "2025-04-22",
      action: "View Details",
    },
    {
      id: 3,
      employeeName: "Ali Khan",
      leaveType: "Public Holiday",
      remarks: "Labor Day",
      fromDate: "2025-05-01",
      toDate: "2025-05-01",
      action: "View Details",
    },
    {
      id: 4,
      employeeName: "Maria Garcia",
      leaveType: "Religious Holiday",
      remarks: "Christmas Day",
      fromDate: "2025-12-25",
      toDate: "2025-12-25",
      action: "View Details",
    },
    {
      id: 5,
      employeeName: "Ahmed Hassan",
      leaveType: "Religious Holiday",
      remarks: "Eid-ul-Adha",
      fromDate: "2025-06-28",
      toDate: "2025-06-30",
      action: "View Details",
    },
  ];

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
        LeavesTable.map((item,index)=>(
          <tr className="even:bg-blue-50 " key={index}>
          <td className="p-4 text-sm text-black">{item.id}</td>
          <td className="p-4 text-sm text-black">{item.employeeName}</td>
          <td className="p-4 text-sm text-black">{item.leaveType}</td>
          <td className="p-4 text-sm text-black">{item.remarks}</td>
          <td className="p-4 text-sm text-black">{item.fromDate}</td>
          <td className="p-4 text-sm text-black">{item.toDate}</td>
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
  
</div>

  )
}

export default LeavesTable