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
  const [weeklyAttData, setWeeklyAttData] = useState([])
  const [todayAttData, setTodayAttData] = useState([])
  const [todayAttLoader, setTodayAttLoader] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [absentLoader, setAbsentLoader] = useState(true);
  const [leaveCount, setLeaveCount] = useState(0)
  const { allEmployee } = useSelector((state) => state.employees || {})
  const { singleEmployeeAttendance, isFetching } = useSelector(
    (state) => state.employeeAtt
  );
  // console.log("singleEmployeeAttendance --->>>", singleEmployeeAttendance)
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
    setAbsentLoader(true)
    let absentList = [];
    let count = 0
    allEmployee?.forEach((item, index) => {
      if (!item.ENTRYTIME) {
        absentList.push(item);
        count++
      }
      setAbsentCount(count)
      setAbsentData(absentList)
      setAbsentLoader(false)

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
    // console.log("formatDate", formatDate)
   let  obj = {
      empid: "All",
      todate: formatDate,
      fromdate: formatDate,
    };
    try {
      dispatch(fetchingEmployeeStart());
      const response = await postRequest("getAllEmployeesAttendance", obj);
      // console.log("get detail",response);
      dispatch(fetchingEmployeeSuccess(response));
    } catch (error) {
      dispatch(fetchingEmployeeErorr());
      console.error("Error in API request:", error);
    }

  }
  // weekly attendence
  const fetchLastWeekAttendance = async () => {
    setIsLoading(true);
    let today = new Date();
    let lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 6);
  
    let fromDate = moment(lastWeek).format("DD-MMMM-YYYY");
    let toDate = moment(today).format("DD-MMMM-YYYY");
  console.log("from date ",fromDate)
    let obj = {
      empid: "All",
      todate: toDate,
      fromdate: fromDate,
    };
  
    try {
      const response = await postRequest("getAllEmployeesAttendance", obj);
      console.log("API Response:", response);
  
      if (response) {
        let dayWiseData = {};
  
        Object.keys(response).forEach((department) => {
          let records = response[department] || []; 
          
          records.forEach((record) => {
            (record.attendanceData || []).forEach((entry) => {
              let dayName = moment(entry.date1, "DD-MMM-YYYY").format("dddd");
  
              if (!dayWiseData[dayName]) {
                dayWiseData[dayName] = { present: 0, absent: 0, leave: 0 };
              }
  
              dayWiseData[dayName].present += entry.remark === "present" ? 1 : 0;
              dayWiseData[dayName].absent += entry.remark === "Absent" ? 1 : 0;
              dayWiseData[dayName].leave += entry.leaveRemark ? 1 : 0;
            });
          });
        });
  
        // 🔥 Convert Object to Array for Chart.js
        const formattedData = Object.keys(dayWiseData).map((day) => ({
          day,
          present: dayWiseData[day].present,
          absent: dayWiseData[day].absent,
        }));
  
        // console.log("📊 Chart Data:", formattedData);
        setWeeklyAttData(formattedData);
      }
    } catch (error) {
      console.error("❌ Error fetching last week attendance:", error);
    }
    setIsLoading(false);
  };  
  // console.log("weeklyAttData ==>>>",weeklyAttData)
  // show department data 
  const departmentColors = {
    "HR": "#00BFFF",
    " IT Enable Services": "#A020F0",
    "Administrator": "#FFBB28",
    "DIGITEL MARKETING": "#FF8042",
    "Desktop Development": "#00C49F",
    "Mobile Development": "#32CD32",
    "Web Development": "#FF4500",
  };
  const recruitmentData = singleEmployeeAttendance && Object.keys(singleEmployeeAttendance)?.map((dept) => ({
    name: dept,
    value: singleEmployeeAttendance[dept]?.length, // Count of employees in each department
    color: departmentColors[dept] || "#CCCCCC"
  }));
  
  const fetchAttendance = async () => {
    try {
      // const response = await getRequest('getAllUser?departmentcode=5')
      const response = await getRequest(`${users?.role == "HR" ? "getAllUser" : "getAllUser?departmentcode=5"}`)
      // console.log("fetch attendence response ==>>>", response)
      dispatch(employeeList(response.data))
    } catch (error) {
      console.log(error)
    }
  }
  const getAllDepartment = async () => {
    try {
      // const response = await getRequest('getAllUser?departmentcode=5')
      const response = await getRequest(`${users?.role == "HR" ? "getAllDept" : "getAllDept?departmentcode=5"}`)
      // console.log("fetch all department response ==>>>", response)

      dispatch(depatmentList(response))
    } catch (error) {
      console.log(error)
    }
  }
   // today attendanceData
   const todayAttPercent = async() => {
    let today = new Date();
    today.setDate(today.getDate());
    let formatDate = moment(today, "MM/DD/YYYY").format("DD-MMMM-YYYY")
    // console.log("formatDate", formatDate)
   let  obj = {
      empid: "All",
      todate: formatDate,
      fromdate: formatDate,
    };
    try {
      // dispatch(fetchingEmployeeStart());
      setTodayAttLoader(true)
      const response = await postRequest("getAllEmployeesAttendance", obj);
      setTodayAttData(response)
      setTodayAttLoader(false)
      // console.log("get detail",response);
    } catch (error) {
      console.error("Error in API request:", error);
    }

  }
  // console.log("todayAttData",todayAttData)
  useEffect(() => {
    if (users) {
      TotalPresentFunc()
      todayAttPercent()
      TotalAbsentFunc()
      TotalLeaveFunc()
      fetchAttendance()
      getAllDepartment()
      yesterdayAtt()
      fetchLastWeekAttendance()
    }
  }, [])
 
  const allEmployees = todayAttData && Object.values(todayAttData)?.flat();

  const attendanceCounts = allEmployees?.reduce(
    (acc, emp) => {
      if (emp.attendanceData?.length > 0) { 
        const firstEntry = emp.attendanceData[0];
  
        // Fixing conditions
        if (firstEntry.entryTime && firstEntry.late?.trim().toUpperCase() === "OK") {
          acc.onTime += 1;
        }
        
        if (firstEntry.late?.trim().toUpperCase() === "LATE") {
          acc.lateArrive += 1;
        }
        
        if (firstEntry.remark?.trim().toUpperCase() === "ABSENT" && !firstEntry.entryTime) {
          acc.Leave += 1;
        }
      }
      return acc;
    },
    { onTime: 0, lateArrive: 0, Leave: 0 }
  );
  
  // 🔥 Total Employees Count
  const totalEmployees = allEmployees?.length;
  
  // 🔥 Calculate Attendance Percentage
  const attendancePercentage = Math.round(
    ((attendanceCounts.onTime + attendanceCounts.lateArrive) / totalEmployees) * 100
  );
  const attendanceData2 = [
    { name: "On Time", value: attendanceCounts.onTime, color: "#5fb3fc" },
    { name: "Late Arrivals", value: attendanceCounts.lateArrive, color: "#edef75" },
    { name: "Leaves", value: attendanceCounts.Leave, color: "#f76c54" }
  ];
  
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
        <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Department Overview</h2>
      {isFetching ? (
  <div className="flex justify-center items-center h-40">
    <span className="text-gray-500 text-lg">Loading...</span>
  </div>
) : (
  <div className="flex items-center">
    <ResponsiveContainer width={200} height={200}>
      <PieChart>
        <Pie
          data={recruitmentData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          startAngle={180}
          endAngle={-180}
          label={({ cx, cy }) => (
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="16"
              fontWeight="bold"
              fill="#333"
            >
              {`Total: ${recruitmentData?.length}`}
            </text>
          )}
        >
          {recruitmentData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry?.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value}`, name]} />
      </PieChart>
    </ResponsiveContainer>

    {/* Legend */}
    <div className="ml-6">
      {recruitmentData?.map((dept, index) => (
        <div key={index} className="flex items-center mb-2">
          <span className="w-4 h-4 mr-2" style={{ backgroundColor: dept?.color }}></span>
          <span className="text-sm">{dept?.name}</span>
        </div>
      ))}
    </div>
  </div>
)}

    </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold">Weekly Attendance</h2>
            {
              isLoading  ?
              <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div> :
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyAttData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#4F46E5" />
                <Bar dataKey="absent" fill="#FF4500" />
              </BarChart>
            </ResponsiveContainer>
            }
          </div>

         
<div className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
      <h2 className="text-lg font-semibold">Attendance Rate</h2>
    { 
    todayAttLoader ?  <div className="flex justify-center items-center h-40">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div> :
  <>
    <div className="text-3xl font-bold">{attendancePercentage ? attendancePercentage : 0}%</div>

      <PieChart width={350} height={220} className="mt-2">
  <Pie
    data={attendanceData2}
    cx="50%"
    cy="50%"
    outerRadius={80} 
    fill="#8884d8"
    dataKey="value"
    label={false}
    activeShape={{ stroke: "none" }}
  >
    {attendanceData2.map((entry, index) => (
      <Cell key={index} fill={entry.color} />
    ))}
  </Pie>

  <Tooltip
    cursor={{ fill: "transparent" }} 
    contentStyle={{ border: "none", borderRadius: "6px", backgroundColor: "rgba(120, 112, 60)", color: "#fff", padding: "2px" }} 
  />
</PieChart>

      {/* Legend */}
      <div className="flex space-x-4">
  {attendanceData2.map((item, index) => (
    <div key={index} className="flex items-center">
      <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
      <span className="text-sm">{item.name} ({item.value})</span>
    </div>
  ))}
</div>
</>
}
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
          Object.keys(singleEmployeeAttendance)?.map((dept) => (
            <>
              {/* Department Row */}
              <tr className="bg-gray-200">
                <td colSpan="3" className="text-left p-2 font-bold">
                  {dept}
                </td>
              </tr>

              {/* Employees Inside Department */}
              {singleEmployeeAttendance[dept]?.map((employee, index) => (
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


          <div className="bg-white  p-4 shadow rounded-lg md:col-span-1 ">
            <div className="max-h-64 overflow-y-auto">

            <h2 className="text-lg font-semibold">Today Absent</h2>
            {absentLoader ? (
        // 🔥 Skeleton Loader
        <ul>
          {Array.from({ length: 3 }).map((_, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 border-b animate-pulse"
            >
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="px-2 py-1 h-5 w-12 bg-gray-300 rounded-lg"></div>
            </li>
          ))}
        </ul>
      ) : (
        // ✅ Actual Data
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
      )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};



export default Dashboard;