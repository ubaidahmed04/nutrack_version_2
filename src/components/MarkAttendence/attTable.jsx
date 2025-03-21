import React from 'react'

const AttTable = () => {
    const T_Head = ["S.no","Name", "TimeIn", "TimeOut"]  
    const users = [
        {
          sNo: 1,
          name: "John Doe",
          timeIn: "09:00 AM",
          timeOut: "05:00 PM",
        },
        {
          sNo: 2,
          name: "Jane Smith",
          timeIn: "09:30 AM",
          timeOut: "05:30 PM",
        },
        {
          sNo: 3,
          name: "Mike Johnson",
          timeIn: "10:00 AM",
          timeOut: "06:00 PM",
        },
        {
          sNo: 4,
          name: "Emily Davis",
          timeIn: "08:45 AM",
          timeOut: "04:45 PM",
        },
        {
          sNo: 5,
          name: "David Brown",
          timeIn: "09:15 AM",
          timeOut: "05:15 PM",
        },
      ];
      
  return (
    <div className="font-[sans-serif] py-4 overflow-x-auto">
  <table className="min-w-full bg-white">
    <thead className="bg-primaryPurple whitespace-nowrap">
      <tr>
        {
          T_Head.map((item,index)=>(
            <th className="p-4 text-left text-lg font-bold text-white" key={index}>{item}</th>

          ))
        }
      </tr>
    </thead>
    <tbody className="whitespace-nowrap">
      {
        users.map((item,index)=>(
          <tr className="even:bg-blue-50 " key={index}>
          <td className="p-4 text-sm text-black">{item.sNo}</td>
          <td className="p-4 text-sm text-black">{item.name}</td>
          <td className="p-4 text-sm text-black">{item.timeIn}</td>
          <td className="p-4 text-sm text-black">{item.timeOut}</td>
    
        </tr>

        ))
      }
    
    </tbody>
  </table>
</div>
  )
}

export default AttTable