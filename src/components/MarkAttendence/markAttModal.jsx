import { Modal } from 'antd'
import React, { useState } from 'react'
import InputFields from '../../utils/UserInput'
import { Formik, Form } from "formik";
import * as Yup from "yup";

const MarkAttModal = ({open , onClose}) => {
   const validationSchema = Yup.object().shape({
    empName: Yup.string().required("Employee name is required"),
     email: Yup.string().email("Invalid email").required("Email is required"),
     userName: Yup.string().required("Username is required"),
     password: Yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
     confirmPassword: Yup.string()
       .oneOf([Yup.ref("password")], "Passwords must match")
       .required("Confirm password is required"),
     phone: Yup.string().required("Phone is required"),
     role: Yup.string().required("Role is required"),
     employeeId: Yup.string().required("Employee ID is required"),
   });
   
   const initialValues = {
       empName: "",
       lastName: "",
       email: "",
       userName: "",
       password: "",
       confirmPassword: "",
       phone: "",
       role: "",
       employeeId: "",
     };
   
   const options = [
     { label: "Admin", value: "admin" },
     { label: "Employee", value: "employee" },
     { label: "Trials", value: "trials" },
   ];
   const handleSubmit = (values,{resetForm}) => {
    console.log(values);
    onClose()
    // resetForm()
  };
  return (
    <div>
      <Modal title="Mark Attendance" open={open} onOk={onClose} onCancel={onClose}>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form >
            <span className="grid  grid-cols-1 gap-2 md:grid-cols-2 ">
          <span className='col-span-2'>
          <InputFields
            label="Employee Name"
            type="select"
            placeholder="Enter your Employee Name"
            name="empName"
            options={options}
            />
            </span>
          <span className='col-span-2'>
          <InputFields
            label="Date"
            type="date"
            placeholder="Select Date"
            name="attDate"
            />
            </span>
          <InputFields
            label="Entry Time"
            type="time"
            name="entryTime"
          />
          <InputFields
            label="Leaving Time"
            type="time"
            name="leavingTime"
          />

        <span className='col-span-2'>
          <InputFields
            label="Description"
            type="textarea"
            placeholder="Enter Description"
            name="description"
            />
          </span>
          {/* <button
            type="submit"
            className="mt-6 relative ml-auto w-40 max-h-10 bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button> */}
            </span>
        </Form>
      )}
    </Formik>
      </Modal>
    </div>
  )
}

export default MarkAttModal