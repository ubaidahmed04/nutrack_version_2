import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputFields from "../../utils/UserInput";
import { Modal } from "antd";
import ImageUpload from "../UsersPage/UploadImage";
// import ImageUpload from "./UploadImage";

const DepartForm = ({ visible, onClose }) => {
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
      title="Add Depart"
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
           
            <span className="grid  grid-cols-1 gap-2 md:grid-cols-2 ">
              <InputFields
                label="Title"
                type="text"
                placeholder="Title"
                name="title"
              />
              <InputFields
                label="Time In"
                type="time"
                name="timeIn"
              />
              <InputFields
                label="Time Out"
                type="time"
                name="timeOut"
              />

              <InputFields
                label="Casual Leave"
                type="number"
                placeholder="Casual Leave"
                name="casualleave"
              />
              <InputFields
                label="Sick Leave"
                placeholder="Sick Leave"
                type="number"
                name="sickleave"
              />
             
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

export default DepartForm