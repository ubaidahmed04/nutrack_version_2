// import React, { useState } from 'react'
// import { PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid';
// import DepartForm from './departModal';

// const DepartTable = () => {
//   const T_Head = ["Department Id", "Department Title", "Time In", "Time Out", "Sick Leaves", "Casual Leaves", "Action"]
//   const dummyData = [
//     {
//       departmentId: "D001",
//       departmentTitle: "Human Resources",
//       timeIn: "09:00 AM",
//       timeOut: "05:00 PM",
//       sickLeaves: 12,
//       casualLeaves: 8,
//       action: "Edit/Delete", // Placeholder for actions
//     },
//     {
//       departmentId: "D002",
//       departmentTitle: "Finance",
//       timeIn: "09:30 AM",
//       timeOut: "05:30 PM",
//       sickLeaves: 10,
//       casualLeaves: 5,
//       action: "Edit/Delete",
//     },
//     {
//       departmentId: "D003",
//       departmentTitle: "IT",
//       timeIn: "08:00 AM",
//       timeOut: "04:00 PM",
//       sickLeaves: 15,
//       casualLeaves: 10,
//       action: "Edit/Delete",
//     },
//     {
//       departmentId: "D004",
//       departmentTitle: "Marketing",
//       timeIn: "10:00 AM",
//       timeOut: "06:00 PM",
//       sickLeaves: 8,
//       casualLeaves: 6,
//       action: "Edit/Delete",
//     },
//     {
//       departmentId: "D005",
//       departmentTitle: "Operations",
//       timeIn: "07:00 AM",
//       timeOut: "03:00 PM",
//       sickLeaves: 5,
//       casualLeaves: 3,
//       action: "Edit/Delete",
//     },
//   ];
//   const [isModalOpen , setIsModalOpen]  = useState(false)
//     const showModal = () => setIsModalOpen(true);
//   const handleCancel = () =>{
//     setIsModalOpen(false)
//   }
//   return (
//     <div className="font-[sans-serif] overflow-x-auto">
//   <table className="min-w-full bg-white">
//     <thead className="bg-primaryPurple  whitespace-nowrap">
//       <tr>
//         {
//           T_Head.map((item,index)=>(
//             <th className="p-4 text-left text-sm md:text-lg font-bold text-white" key={index}>{item}</th>
//           ))
//         }
//       </tr>
//     </thead>
//     <tbody className="whitespace-nowrap">
//       {
//         dummyData.map((item,index)=>(
//           <tr className="even:bg-blue-50 " key={index}>
//           <td className="p-4 text-sm text-black">{item.departmentId}</td>
//           <td className="p-4 text-sm text-black">{item.departmentTitle}</td>
//           <td className="p-4 text-sm text-black">{item.timeIn}</td>
//           <td className="p-4 text-sm text-black">{item.timeOut}</td>
//           <td className="p-4 text-sm text-black">{item.sickLeaves}</td>
//           <td className="p-4 text-sm text-black">{item.casualLeaves}</td>
//           <td className="p-4">
//             <button className="mr-4" onClick={showModal} title="Edit">
//             <PencilSquareIcon  class="h-6 w-6 text-blue-500" />
//             </button>
//             {/* <DeleteModal children={<button className="mr-4" title="Delete">
//               <TrashIcon class="h-6 w-6 text-red-500" />
//             </button>}/> */}

//           </td>
//         </tr>

//         ))
//       }
//     </tbody>
//   </table>
//   <DepartForm visible={isModalOpen} onClose={handleCancel}/>
// </div>

//   )
// }

// export default DepartTable

import React, { useState, useEffect } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import UpdateDepartForm from "./updateModal";
import { getRequest } from "../../utils/APICall";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeptStart, getAllDeptSuccess } from "../../redux/deptSlice";

const DepartTable = () => {
  const T_Head = [
    "Department Id",
    "Department Title",
    "Time In",
    "Time Out",
    "Sick Leaves",
    "Casual Leaves",
    "Action",
  ];

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [singleDeptData, setSingleDeptData] = useState([]);
  const { allDept, isLoader } = useSelector((state) => state.dept);
  // console.log("redux data", allDept);
  const dispatch = useDispatch();
  const showUpdateModal = async (id) => {
    setIsUpdateModalOpen(true);
    // console.log("id-->>>>", id);
    const res = await getRequest(`getSingleDepartment/${id}`);
    console.log("Single Department fetch  ", res);
    if (res?.data?.length > 0) {
      setSingleDeptData(res?.data[0]);
    } else {
      setSingleDeptData(null); // or set default values if needed
    }
  };
  const updateModalCancel = () => setIsUpdateModalOpen(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        dispatch(getAllDeptStart());
        const response = await getRequest("getAllDepartment");
        console.log(response);
        dispatch(getAllDeptSuccess(response));
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="font-[sans-serif] overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-primaryPurple whitespace-nowrap">
          <tr>
            {T_Head.map((item, index) => (
              <th
                className="p-4 text-left text-sm md:text-lg font-bold text-white"
                key={index}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {isLoader ? (
         Array(10)
         .fill(0)
         .map((_, index) => (
           <tr key={index}>
             {T_Head.map((_, colIndex) => (
               <td
                 key={colIndex}
                 className="p-4 border-b border-gray-100 animate-pulse"
               >
                 <div className="h-4 bg-gray-300 rounded w-full"></div>
               </td>
             ))}
           </tr>
         ))
          ) : (
           allDept?.length > 0 &&  allDept?.map((item, index) => (
              <tr className="even:bg-blue-50 " key={index}>
                <td className="p-4 text-sm text-black">{item.CODE}</td>
                <td className="p-4 text-sm text-black">{item.TITLE}</td>
                <td className="p-4 text-sm text-black">
                  {dayjs(item.TIMEIN, ["HH:mm:ss", "HH:mm"]).format("hh:mm A")}
                </td>
                <td className="p-4 text-sm text-black">
                  {dayjs(item.TIMEOUT, ["HH:mm:ss", "HH:mm"]).format("hh:mm A")}
                </td>
                <td className="p-4 text-sm text-black">{item.SICKLEAVES}</td>
                <td className="p-4 text-sm text-black">{item.CASUALLEAVES}</td>
                <td className="p-4">
                  <button
                    className="mr-4"
                    onClick={() => showUpdateModal(item.CODE)}
                    title="Edit"
                  >
                    <PencilSquareIcon className="h-6 w-6 text-blue-500" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <UpdateDepartForm
        visible={isUpdateModalOpen}
        onClose={updateModalCancel}
        singleData={singleDeptData}
      />
    </div>
  );
};

export default DepartTable;
