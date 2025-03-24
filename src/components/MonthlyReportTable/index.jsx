import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
const MonthlyReportTable = ({ employeeAttendance }) => {
  const tableHead = `py-3 px-3 border-b text-left text-gray-800 font-bold text-[14px] lg:text-lg`;
  const tableBody = `px-3 py-2 border-b font-semibold text-left`;
  const {users} = useSelector((state) => state.user || {})
  // console.log(employeeAttendance)
  return (
    <div className="">
      <div className="w-full h-[calc(100vh-170px)] overflow-y-auto mt-2 md:mt-3">
        <table className="min-w-max w-full border border-gray-300 pt-5">
          {/* <thead className="bg-gray-400 md:sticky w-full h-full p-0 top-0  z-10 ">
            <tr className="text-center w-full h-[20px]">
              <th className={`${tableHead}`}>Date</th>
              <th className={`${tableHead}`}>Entry Time</th>
              <th className={`${tableHead}`}>Leaving Time</th>
              <th className={`${tableHead}`}>Hours</th>
              <th className={`${tableHead}`}>Total Hours</th>
            </tr>
          </thead> */}
          <tbody>
           
            {employeeAttendance && Object.keys(employeeAttendance).map((dept)=>(
                <>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                <td className="flex justify-end">
                  <p className="py-4 px-3 border-b font-bold text-[18px] capitalize bg-gray-300 text-black rounded-full text-center min-w-[50%]">
                    {dept}
                  </p>
                </td>
                </tr>
                {employeeAttendance[dept].map((employee) => (
                <>
                <tr className="">
                  <td className="flex justify-start">
                    <p className="py-4 px-3 border-b font-bold text-[18px] capitalize bg-gray-300 text-black rounded-r-full text-center min-w-[50%]">
                      {employee.firstname}
                    </p>
                  </td>
                </tr>
                {(() => {
                  let totalHours = 0;
                  let totalMinutes = 0;
                  let totalLate = 0;
                  let totalAbsent = 0;
                  let totalPresent = 0;
                  let totalDays = 0;
                  employee.attendanceData.forEach((attendance) => {
                    if (attendance.totalHours) {
                      const [hours, minutes] = attendance.totalHours.split(":").map(Number);
                      totalHours += hours;
                      totalMinutes += minutes;
                    }
                    if(attendance.late === "Late"){
                      totalLate += 1
                    }
                    if(attendance.remark === "present"){
                      totalPresent += 1
                    }
                    if(!attendance.entryTime && attendance.remark !== "SATURDAY" && attendance.remark !== "SUNDAY"){
                      totalAbsent += 1
                    }
                    if(attendance.remark !== "SATURDAY" && attendance.remark !== "SUNDAY"){
                      totalDays += 1
                    }
                  });
                  totalHours += Math.floor(totalMinutes / 60);
                  totalMinutes = totalMinutes % 60;
                  const formattedMinutes = String(totalMinutes).padStart(2,"0");
                  return (
                    <>
                      {/* {employee.attendanceData.map((attendance, index) => (
                        <tr className={`${attendance.remark == "SUNDAY" || attendance.remark == "SATURDAY" ? "bg-blue-300" :
                          attendance.remark === "Absent" || attendance.remark == "Sick Leave" || attendance.remark == "Annual Leave" ? "bg-red-300" :
                          attendance.late === 'Late' ? 'bg-yellow-100' :
                          attendance.remark === 'present' ? 'bg-white' : 'bg-green-100'}`}
                          key={index}>
                          <td className={`${tableBody}`}>
                            {attendance.date}
                            <span className="">{attendance?.remark !== 'Annual Leave' && attendance?.remark !== 'Sick Leave' && attendance?.remark !== 'Absent' && attendance?.remark !== 'present' && attendance?.remark !== 'SATURDAY' && attendance?.remark !== 'SUNDAY' && `(${attendance?.remark})`}</span>
                          </td>
                          <td className={`${tableBody}`}>
                            {attendance.entryTime ? attendance.entryTime : attendance.leaveRemark ? `${attendance.remark} (${attendance.leaveRemark})` : attendance.remark}
                          </td>
                          <td className={`${tableBody}`}>{attendance.leavingTime}</td>
                          <td className={`${tableBody}`}>{attendance.hours}</td>
                          <td className={`${tableBody}`}>{attendance.totalHours}</td>
                        </tr>
                      )
                      )} */}
                      <tr className="bg-gray-300 ">
                        <td className="px-3 py-2 border-b font-bold">
                          <span className="mr-3">Total Days</span>
                          <span>{totalDays}</span>
                        </td>
                        <td className="px-3 py-2 border-b font-bold">
                            <span className="bg-white px-3 py-2 mr-3">
                              <span className="mr-3">Total Present</span>
                              <span>{totalPresent}</span>
                            </span>
                        </td>
                        <td className="font-bold">
                            <span className="bg-red-300 px-3 py-2 mr-3">
                              <span className="mr-3">Total Absent</span>
                              <span>{totalAbsent}</span>
                            </span>
                        </td>
                        <td className="px-3 py-2 border-b font-bold">
                            <span className="px-3 py-2 bg-yellow-100">
                              <span className="mr-3">Total Lates</span>
                              <span>{totalLate}</span>
                            </span>
                        </td>
                        <td className="px-3 py-2 border-b font-bold">
                        <span className="mr-3">Total Hours</span>
                          <span>{`${totalHours}:${formattedMinutes}`}</span>
                        </td>
                      </tr>
                    </>
                  );
                })()}
              </>
                ))}
                </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyReportTable;
