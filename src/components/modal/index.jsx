import React, { useEffect, useState } from "react";
import { Button, Modal, Space } from "antd";
import { SelectDepart, SelectEmployee, SelectInput } from "../SelectInput";
import DatePickerComponent from "../DatePicker";
import { Navigate, useNavigate, } from "react-router-dom";
import moment from "moment";
import { postRequest } from "../../utils/APICall";
import { useDispatch, useSelector } from "react-redux";
import { fetchingEmployeeStart, fetchingEmployeeSuccess, fetchingStart, fetchingSuccess } from "../../redux/attendanceSlice";
import { fetchingEmployerStart, fetchingEmployerSuccess, } from "../../redux/allAttendanceSlice";
import { reduxFromDate, reduxToDate } from "../../redux/setDates";

const ModalComponents = ({ titles, emloyeeList, message, setIsOpen, isOpen, setName }) => {
  const { allEmployee } = useSelector((state) => state.employees);
  const { allDept } = useSelector((state) => state.employees);
  const { users } = useSelector((state) => state.user || {});
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const dispatch = useDispatch();
  const url = titles.split(" ").join("");
  // console.log("url -->>>", url)
  const navigate = useNavigate();
  // const router = useRouter()
  const uniqueDepartments = allDept && [...new Map(allDept.map(item => [item.DEPT.trim() + item.CODE, { DEPT: item.DEPT.trim(), CODE: item.CODE }])).values()];
  const filterEmployee = allDept?.filter((empl) => {
    return empl.CODE === selectedDepartment
  })
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    try {
      if (titles === "Attendance Sheet") {
        dispatch(fetchingEmployeeStart());
        let route;
        let obj;
        if (users?.data?.role == "HR" && selectedDepartment == "All") {
          route = users?.data?.role == "HR" && selectedDepartment == "All" && "getAllEmployeesAttendance"
          obj = {
            todate: toDate,
            fromdate: fromDate,
          };
        } else if (selectedEmployee === "All") {
          route = `${users?.data?.role == "HR" ?
            `${selectedDepartment ? `getAllEmployeesAttendance?departmentcode=${selectedDepartment}` : "getAllEmployeesAttendance"}` :
            "getAllEmployeesAttendance?departmentcode=5"}`;
          obj = {
            todate: toDate,
            fromdate: fromDate,
          };
        } else {
          route = "getByEmpId";
          obj = {
            empid: selectedEmployee,
            todate: toDate,
            fromdate: fromDate,
          };
        }
        if (toDate && fromDate) {
          setOpen(false);
          setSelectedEmployee("All");
          setSelectedDepartment("All");
          dispatch(reduxToDate(toDate));
          dispatch(reduxFromDate(fromDate));
          setToDate("");
          setFromDate("");
          
          navigate(`/${url}`);
          console.log('navigate ka baad ka url', url)  // Pehle navigate karwao 
       
          try {
             const response = await postRequest(route, obj);
             console.log(response);
             dispatch(fetchingEmployeeSuccess(response));
          } catch (error) {
             console.error("Error in API request:", error);
          }
       }
       
      } else if (titles === "All Employee") {
        dispatch(fetchingEmployerStart());
        const route = "getAllEmployeesAttendance?departmentcode=5";
        const dates = {
          todate: toDate,
          fromdate: fromDate,
        };
        if (toDate && fromDate) {
          setOpen(false);
          setSelectedEmployee("");
          dispatch(reduxToDate(toDate));
          dispatch(reduxFromDate(fromDate));
          setToDate("");
          setFromDate("");
          navigate(`/${url}`);
          // setIsOpen(!isOpen)
          const response = await postRequest(route, dates);
          dispatch(fetchingEmployerSuccess(response));
        }
      }
    } catch (error) { }
  };
  const handleCancel = () => {
    setOpen(false);
    // setIsOpen(!isOpen)
  };
  const pickEmployee = (value, label) => {
    setSelectedEmployee(value);
    setName(label.label)
  };
  const pickDepartement = (value) => {
    setSelectedDepartment(value);
  };
  const pickToDate = (date, dateString) => {
    setToDate(dateString);
  };
  const pickFromDate = (date, dateString) => {
    setFromDate(dateString);
  };

  return (
    <>
      {users?.role == "HR" ? (
        <>
          <Space className="border-none">
            {message ? (
              <span
                className="font-semibold text-[16px] bg-transparent border-0 text-inherit"
                onClick={showModal}
              >
                {titles}
              </span>
            ) : (
              <span className="   hover:cursor-pointer px-3 py-2.5 rounded-xl bg-[#54559E] flex flex-wrap  hover: text-white hover:scale-105" onClick={showModal}>
                {titles}
              </span>
            )}
          </Space>
          <Modal
            open={open}
            onOk={() => handleOk()}
            // onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            )}
          >
            <h2 className="my-2 font-semibold text-[17px] text-gray-700">Select Department</h2>
            <SelectDepart
              departList={uniqueDepartments}
              onChange={pickDepartement}
              selectedDepartment={selectedDepartment}
            />
            <h2 className="my-2 font-semibold text-[17px] text-gray-700">Select Employee</h2>
            <SelectEmployee
              employeeList={filterEmployee}
              onChange={pickEmployee}
              selectedEmployee={selectedEmployee}
            />
            <div className="flex w-full py-5">
              <div className="flex flex-col w-1/2">
                <label className="font-semibold">From</label>
                <DatePickerComponent onChange={pickFromDate} date={fromDate} />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="font-semibold">To</label>
                <DatePickerComponent onChange={pickToDate} date={toDate} />
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <>
          <Space>
            {message ? (
              <Button
                className="font-semibold text-[16px] bg-transparent border-0 text-inherit"
                onClick={showModal}
              >
                {titles}
              </Button>
            ) : (
              <span className="px-4 py-2.5 rounded-xl bg-[#54559E] hover:cursor-pointer  text-white hover:scale-110 font-semibold" onClick={showModal}>
                {titles}
              </span>
            )}
          </Space>

          <Modal
            open={open}
            title={
              titles === "Attendance Sheet"
                ? "Select Employee"
                : "Departmentwise"
            }
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            )}
          >
            {titles === "All Employee" ? (
              <div>
                <h3 className="text-xl font-semibold text-center bg-black text-white w-fit mx-auto px-5 py-2">
                  IT Enable Services
                </h3>
              </div>
            ) : (
              <SelectInput
                emloyeeList={allEmployee}
                onChange={pickEmployee}
                selectedEmployee={selectedEmployee}
              />
            )}
            <div className="flex w-full py-5">
              <div className="flex flex-col w-1/2">
                <label className="font-semibold">From</label>
                <DatePickerComponent onChange={pickFromDate} date={fromDate} />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="font-semibold">To</label>
                <DatePickerComponent onChange={pickToDate} date={toDate} />
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};
export default ModalComponents;
