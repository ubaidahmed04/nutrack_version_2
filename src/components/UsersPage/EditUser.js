import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputFields from "../../utils/UserInput";
import { Modal } from "antd";
import ImageUpload from "./UploadImage";

const EditUserForm = ({ visible, onClose }) => {
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
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
    firstName: "",
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
const [dataFiles, setDataFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handleSubmit = (values,{resetForm}) => {
    console.log(values);
    onClose()
    // resetForm()
  };
  return (
    <Modal
    title="Edit User"
    open={visible}
    onCancel={onClose}
    footer={null}
    >
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form >
            <span className="flex justify-center items-center py-4 ">
            <ImageUpload setData={setDataFiles} images={images} setImages={setImages} />
            
            </span>
            <span className="grid  grid-cols-1 gap-2 md:grid-cols-2 ">
          <InputFields
            label="First Name"
            type="text"
            placeholder="Enter your firstName"
            name="firstName"
          />
          <InputFields
            label="Last Name"
            type="text"
            placeholder="Enter lastName"
            name="lastName"
          />
       
          <InputFields
            label="Email"
            type="email"
            name="email"
             placeholder="Enter Email"
            />
          <InputFields
            label="User Name"
            type="text"
            placeholder="Enter userName"
            name="userName"
            />
          <InputFields
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Password"
            />
          <InputFields
            label="Confirm Password"
            type="password"
            placeholder="Enter confirmPassword"
            name="confirmPassword"
            />
          <InputFields
            label="Phone"
            type="number"
            name="phone"
            placeholder="Enter Phone"
            />
          <InputFields
            label="EmployeeID"
            type="number"
            placeholder="Enter EmployeeID"
            name="employeeId"
            />
            <InputFields
            label="Role"
            type="select"
            placeholder="Enter Role"
            name="role"
            options={options}
            />
          <button
            type="submit"
            className="mt-6 relative ml-auto w-40 max-h-10 bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
            </span>
        </Form>
      )}
    </Formik>
    </Modal>
  )
}

export default EditUserForm