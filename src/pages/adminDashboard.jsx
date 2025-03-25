import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { FaTachometerAlt, FaUserCheck, FaUsers, FaClipboardList, FaDollarSign, FaCog, FaQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { depatmentList, employeeList } from "../redux/employeeSlice";
import { getRequest, postRequest } from "../utils/APICall";
import moment from "moment";
import { fetchingEmployeeErorr, fetchingEmployeeStart, fetchingEmployeeSuccess } from "../redux/attendanceSlice";
import TableSkeleton from "../components/loader/tableSkeleton";

const Dashboard = () => {
  const recruitmentData = [
    { name: "IT Enable Services", value: 8 },
    { name: "Web Development", value: 5 },
    { name: "Desktop Development", value: 1 },
    { name: "Degital Marketing", value: 2 },
    { name: "Mobile Development", value: 5 },
    { name: "Administrator", value: 2 },
    { name: "HR", value: 1 },
  ];

  const attendanceData = [
    { day: "Sun", present: 0, absent: 0, leave: "Off" },
    { day: "Mon", present: 15, absent: 3, leave: 7 },
    { day: "Tue", present: 19, absent: 5, leave: 1 },
    { day: "Wed", present: 20, absent: 3, leave: 2 },
    { day: "Thu", present: 21, absent: 2, leave: 2 },
    { day: "Fri", present: 18, absent: 4, leave: 3 },
    { day: "Sat", present: 0, absent: 0, leave: "Off" },
  ];

  
  // data fetch
  const dispatch = useDispatch()
  const [presentCount, setPresentCount] = useState(0)
  const [absentCount, setAbsentCount] = useState(0)
  const [absentData, setAbsentData] = useState([])
  const [leaveCount, setLeaveCount] = useState(0)
  const { allEmployee } = useSelector((state) => state.employees || {})
  const { singleEmployeeAttendance, isFetching } = useSelector(
    (state) => state.employeeAtt
  );
  console.log("singleEmployeeAttendance --->>>", singleEmployeeAttendance)
  // const previousDayData = singleEmployeeAttendance
  const TotalPresentFunc = () => {
    let count = 0
    allEmployee?.forEach((item, index) => {
      if (item.ENTRYTIME) {
        count++
      }
      setPresentCount(count)
    })
  }
  const TotalAbsentFunc = () => {
    let absentList = [];
    let count = 0
    allEmployee?.forEach((item, index) => {
      if (!item.ENTRYTIME) {
        absentList.push(item);
        count++
      }
      setAbsentCount(count)
      setAbsentData(absentList)
    })
  }
  const TotalLeaveFunc = () => {
    let count = 0
    allEmployee?.forEach((item, index) => {
      if (item.TITLE) {
        count++
      }
      setLeaveCount(count)
    })
  }
  const { users } = useSelector((state) => state.user || {})
  // console.log(users)
  // yesterday attendence
  const yesterdayAtt = async() => {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let formatDate = moment(yesterday, "MM/DD/YYYY").format("DD-MMMM-YYYY")
    console.log("formatDate", formatDate)
   let  obj = {
      empid: "All",
      todate: formatDate,
      fromdate: formatDate,
    };
    try {
      dispatch(fetchingEmployeeStart());
      const response = await postRequest("getAllEmployeesAttendance", obj);
      console.log("get detail",response);
      dispatch(fetchingEmployeeSuccess(response));
    } catch (error) {
      dispatch(fetchingEmployeeErorr());
      console.error("Error in API request:", error);
    }

  }
  const fetchAttendance = async () => {
    try {
      // const response = await getRequest('getAllUser?departmentcode=5')
      const response = await getRequest(`${users?.role == "HR" ? "getAllUser" : "getAllUser?departmentcode=5"}`)
      console.log("fetch attendence response ==>>>", response)
      dispatch(employeeList(response.data))
    } catch (error) {
      console.log(error)
    }
  }
  const getAllDepartment = async () => {
    try {
      // const response = await getRequest('getAllUser?departmentcode=5')
      const response = await getRequest(`${users?.role == "HR" ? "getAllDept" : "getAllDept?departmentcode=5"}`)
      console.log("fetch all department response ==>>>", response)

      dispatch(depatmentList(response))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (users) {
      TotalPresentFunc()
      TotalAbsentFunc()
      TotalLeaveFunc()
      fetchAttendance()
      getAllDepartment()
      yesterdayAtt()
    }
  }, [])

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1  h-full bg-gray-100 p-4 w-full md:w-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {/* <input type="text" placeholder="Search your data" className="border p-2 rounded-lg w-full md:w-1/3" /> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <h2 className="text-lg font-semibold">Total Employees</h2>
            <p className="text-3xl font-bold text-blue-600">{allEmployee?.length || 20}</p>

          </div>
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <h2 className="text-lg font-semibold">Today Presents</h2>
            <p className="text-3xl font-bold text-green-600">{presentCount || 0}</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <h2 className="text-lg font-semibold">Today Absents</h2>
            <p className="text-3xl font-bold text-red-600">{absentCount || 0}</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <h2 className="text-lg font-semibold">Today Leave</h2>
            <p className="text-3xl font-bold text-yellow-700">{leaveCount || 0}</p>
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold">Department</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={recruitmentData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>


          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold">Daily Attendance</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={attendanceData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#4F46E5" />
                <Bar dataKey="absent" fill="#EC4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold">Loan Pay Received</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={[{ name: "Loan", value: 8440 }]} dataKey="value" outerRadius={80}>
                  <Cell fill="#4F46E5" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className=" mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 shadow rounded-lg md:col-span-3">
    {
      isFetching ? 
      <div>
      <TableSkeleton/> 
      </div> :<>
        <h2 className="text-lg font-semibold mb-2">Yesterday Status</h2>
        <div className="max-h-64 overflow-y-auto">
      
      <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Department</th>
          <th className="border border-gray-300 p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        { singleEmployeeAttendance &&
          Object.keys(singleEmployeeAttendance).map((dept) => (
            <>
              {/* Department Row */}
              <tr className="bg-gray-200">
                <td colSpan="3" className="text-left p-2 font-bold">
                  {dept}
                </td>
              </tr>

              {/* Employees Inside Department */}
              {singleEmployeeAttendance[dept].map((employee, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{employee.firstname}</td>
                  <td className="border border-gray-300 p-2">{dept}</td>
                  <td className="border border-gray-300 p-2">
                   <span
          className={`px-2 py-1 text-sm font-semibold rounded-lg 
          ${employee?.attendanceData[0]?.entryTime 
            ? "text-green-600 bg-green-100"
            : employee?.attendanceData[0]?.remark == "Absent"
            ? "text-red-600 bg-red-100"
            : "text-gray-600 bg-gray-100"
          }`}
        >
          {employee?.attendanceData[0]?.remark === "present"
            ? "Present"
            : employee?.attendanceData[0]?.remark === "Absent"
            ? "Absent"
            : "N/A"}
        </span>
                  </td>
                </tr>
              ))}
            </>
          ))}
      </tbody>
    </table>

  </div>
  </>
    }
</div>


          <div className="bg-white  p-4 shadow rounded-lg md:col-span-1">
            <h2 className="text-lg font-semibold">Today Absent</h2>
            <div className="max-h-64 overflow-y-auto"> {/* Added scrolling here */}
              <ul>
                {absentData.map((emp, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-semibold">{emp.NAME}</p>
                      <p className="text-sm text-gray-500">Department: {emp.DEPT}</p>
                    </div>
                    <span className="px-2 py-1 text-sm font-semibold rounded-lg text-red-600 bg-red-100">
                      Absent
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};



export default Dashboard;