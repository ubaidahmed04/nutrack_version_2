import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
const EmployeesTable = ({ employeeAttendance }) => {
  const tableHead = `py-3 px-3 border-b text-center text-gray-800 font-bold text-[14px] lg:text-lg`;
  const tableBody = `px-3 py-2 border-b font-semibold text-center`;
  return (
    <div className="overflow-x-auto">
      <div className="w-full h-[calc(100vh-20vh)] overflow-y-auto mt-3">
        <table className="min-w-max w-full border border-gray-300">
          <thead className="bg-gray-400 sticky top-0 z-10">
            <tr>
              <th className={tableHead}>Date</th>
              <th className={tableHead}>Entry Time</th>
              <th className={tableHead}>Leaving Time</th>
              <th className={tableHead}>Hours</th>
              <th className={tableHead}>Total Hours</th>
            </tr>
          </thead>
          {employeeAttendance && (
            <tbody>
              {employeeAttendance.map((employee) => (
                <>
                  <td className="py-4 border-b font-bold text-[18px] capitalize bg-black text-white rounded-r-full text-center w-fit">
                      {employee.firstname}
                  </td>
                  {(() => {
                    let totalHours = 0;
                    let totalMinutes = 0;
                    employee.attendanceData.forEach((attendance) => {
                      if (attendance.totalHours) {
                        const [hours, minutes] = attendance.totalHours
                          .split(":")
                          .map(Number);
                        totalHours += hours;
                        totalMinutes += minutes;
                      }
                    });
                    totalHours += Math.floor(totalMinutes / 60);
                    totalMinutes = totalMinutes % 60;
                    const formattedMinutes = String(totalMinutes).padStart(
                      2,
                      "0"
                    );
                    return (
                      <>
                        {employee.attendanceData.map((attendance, index) => (
                          <tr className={`${
                            attendance.remark == "SUNDAY" || attendance.remark == "SATURDAY" ? "bg-blue-300" : 
                            attendance.remark === "Absent" ? "bg-red-300" : 
                            attendance.late === 'Late' ? 'bg-yellow-100'  : 
                            attendance.remark === 'present' ? 'bg-white' : 'bg-green-100'}`}
                            key={index}>
                            <td className={`${tableBody}`}>
                              {attendance.date}
                              <span className="">{attendance.remark !== 'present' && attendance.remark !== 'SATURDAY' &&  attendance.remark !== 'SUNDAY' && `(${attendance.remark})`}</span>
                            </td>
                            <td className={`${tableBody}`}>{attendance.entryTime ? attendance.entryTime: attendance.remark}</td>
                            <td className={`${tableBody}`}>{attendance.leavingTime}</td>
                            <td className={`${tableBody}`}>{attendance.hours}</td>
                            <td className={`${tableBody}`}>{attendance.totalHours}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-300">
                          <td className="px-6 py-2 border-b font-bold"></td>
                          <td className="px-6 py-2 border-b font-bold"></td>
                          <td className="px-6 py-2 border-b font-bold"></td>
                          <td className="px-6 py-2 border-b font-bold text-center">
                            Total Hours
                          </td>
                          <td className="px-6 py-2 border-b font-bold text-center">
                            {`${totalHours}:${formattedMinutes}`}
                          </td>
                        </tr>
                      </>
                    );
                  })()}
                </>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EmployeesTable;
