import React, { useState } from 'react'

const HolidayTable = () => {
  const T_Head = ["#", "From Date", "To Date", "Description"] 
  const holidays = [
    {
      id: 1, // Corresponds to "#"
      fromDate: "2025-01-01", // Corresponds to "From Date"
      toDate: "2025-01-01", // Corresponds to "To Date"
      description: "New Year's Day", // Corresponds to "Description"
    },
    {
      id: 2,
      fromDate: "2025-02-23",
      toDate: "2025-02-23",
      description: "National Day",
    },
    {
      id: 3,
      fromDate: "2025-03-23",
      toDate: "2025-03-23",
      description: "Pakistan Day",
    },
    {
      id: 4,
      fromDate: "2025-05-01",
      toDate: "2025-05-01",
      description: "Labour Day",
    },
    {
      id: 5,
      fromDate: "2025-08-14",
      toDate: "2025-08-14",
      description: "Independence Day",
    },
    {
      id: 6,
      fromDate: "2025-12-25",
      toDate: "2025-12-25",
      description: "Quaid-e-Azam Day",
    },
  ];

  return (
    <div className="font-[sans-serif] overflow-x-auto">
  <table className="min-w-full bg-white">
    <thead className="bg-[#636D8E]  whitespace-nowrap">
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
        holidays.map((item,index)=>(
          <tr className="even:bg-blue-50 " key={index}>
          <td className="p-4 text-sm text-black">{item.id}</td>
          <td className="p-4 text-sm text-black">{item.fromDate}</td>
          <td className="p-4 text-sm text-black">{item.toDate}</td>
          <td className="p-4 text-sm text-black">{item.description}</td>
        </tr>

        ))
      }
    </tbody>
  </table>
</div>

  )
}

export default HolidayTable