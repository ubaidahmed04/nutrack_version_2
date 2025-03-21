import React from 'react'

const WorkSheetTable = () => {
  const T_Head = ["#", "Employee Name", "Work Detail",] 
  const dummyData = [
    { id: 1, employeeName: "John Doe", workDetail: "Completed project A" },
    { id: 2, employeeName: "Jane Smith", workDetail: "Drafted proposal B" },
    { id: 3, employeeName: "Robert Brown", workDetail: "Attended client meeting" },
    { id: 4, employeeName: "Emily Johnson", workDetail: "Reviewed design specs" },
    { id: 5, employeeName: "Michael White", workDetail: "Worked on backend APIs" },
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
        dummyData.map((item,index)=>(
          <tr className="even:bg-blue-50 " key={index}>
          <td className="p-4 text-sm text-black">{item.id}</td>
          <td className="p-4 text-sm text-black">{item.employeeName}</td>
          <td className="p-4 text-sm text-black">{item.workDetail}</td>
        </tr>

        ))
      }
    </tbody>
  </table>
</div>

  )
}

export default WorkSheetTable