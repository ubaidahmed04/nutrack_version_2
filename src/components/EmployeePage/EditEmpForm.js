import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputFields from "../../utils/UserInput";
import { Modal } from "antd";
import ImageUpload from "../UsersPage/UploadImage";
// import ImageUpload from "./UploadImage";

const EditEmpForm = ({ visible, onClose }) => {
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

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    onClose()
    // resetForm()
  };
  return (
    <Modal
      title="Edit Employee"
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
                label="EmployeeID"
                type="text"
                // placeholder="Enter userName"
                name="EmployeeIDd"
                disabled={true}
              />
              <InputFields
                label="Joining Date"
                type="date"
                name="joinDate"
                placeholder="Enter Joining Date"
              />
              <InputFields
                label="Leaving Date*"
                type="date"
                name="joinDate"
                placeholder="Enter Leaving Date"
              />
              <InputFields
                label="Qualification*"
                type="select"
                name="Qualification"
                placeholder="Enter Qualification (optional)*"
                options={options}
              />
              <InputFields
                label="Major"
                type="text"
                placeholder="Enter Major"
                name="major"
              />
              <InputFields
                label="Certificate*"
                type="text"
                placeholder="Enter Cetificate (optional)*"
                name="cetificate"
              />
              <InputFields
                label="Phone"
                type="number"
                name="phone"
                placeholder="Enter Phone"
              />
              <InputFields
                label="Department"
                type="select"
                name="Department"
                placeholder="Enter Department "
                options={options}
              />
              <InputFields
                label="Designation"
                type="select"
                name="designation"
                placeholder="Enter Designation "
                options={options}
              />
              <InputFields
                label="Skills*"
                type="text"
                placeholder="Enter Skills (optional)*"
                name="skill"
              />
              {/* <InputFields
                label="Account Title"
                type="text"
                name="accTitle"
                placeholder="Enter Account Title"
              />
              <InputFields
                label="Bank Name"
                type="text"
                placeholder="Enter Bank Name"
                name="bankName"
              />
              <InputFields
                label="Bank Branch"
                type="text"
                placeholder="Enter Bank Branch"
                name="bankBranch"
              />
              <InputFields
                label="Account No"
                type="text"
                placeholder="Enter Account No"
                name="accNo"
              />
              <InputFields
                label="IBN No"
                type="text"
                placeholder="Enter IBN No"
                name="IBNNo"
              /> */}

              <button
                type="submit"
                className="mt-6 flex justify-center items-center mx-auto w-full  max-h-10 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </span>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default EditEmpForm