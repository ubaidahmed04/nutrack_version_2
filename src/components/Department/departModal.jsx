
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputFields from "../../utils/UserInput";
import { Modal } from "antd";
import { postRequest } from "../../utils/APICall";
// const [timeIn, setTimeIn] = useState('12:00 AM');
const DepartForm = ({ visible, onClose }) => {
  const validationSchema = Yup.object().shape({
    vdeptitle: Yup.string().required("Title is required"),
    vtimein: Yup.string().required("Time In is required"),
    vtimeout: Yup.string().required("Time Out is required"),
    vsickleaves: Yup.number().required("Sick Leave is required"),
    vcasualleaves: Yup.number().required("Casual Leave is required"),
  });

  const initialValues = {
    vdeptitle: "",
    vtimein: "",
    vtimeout: "",
    vsickleaves: "",
    vcasualleaves: "",
    

  };

  const handleSubmit = async (values, { resetForm }) => {
    // console.log("values ", values )
    function addGracePeriod(timeIn, gracePeriodMinutes) {
      // Parse the timeIn into a Date object (you can use a default date)
      const [hours, minutes] = timeIn.split(':').map(Number);
      const timeInDate = new Date();
      timeInDate.setHours(hours, minutes, 0); // Set hours and minutes based on the input
    
      // Add the grace period (15 minutes) to the timeInDate
      timeInDate.setMinutes(timeInDate.getMinutes() + gracePeriodMinutes);
    
      // Get the new time after adding grace period
      const newTime = timeInDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // if you need 12-hour format
      });
    
      return newTime;
    }
    try {

     let time =  addGracePeriod(values.vtimein, 15)
    //  console.log("grace Time ", time )
      const obj = {
        ...values,
        vgracetimeperiod: time,
      }
      // console.log("updated",obj)
      const response =await postRequest("addDept",obj)
      console.log("response ===>>>",response)
      if(response.returnValue){
        onClose(); 
        resetForm();
        alert("Department added successfully");
      }
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Failed to add department");
    }
    console.log(values)
  };

  return (
    <Modal
      title="Add Department"
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
          <Form>
            <span className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <InputFields
                label="Title"
                type="text"
                placeholder="Department Title"
                name="vdeptitle"
              />
              <InputFields
                label="Time In"
                type="time"
                name="vtimein"
             
              />
              <InputFields
                label="Time Out"
                type="time"
                name="vtimeout"
              />
              <InputFields
                label="Sick Leave"
                type="number"
                placeholder="Sick Leave"
                name="vsickleaves"
              />
              <InputFields
                label="Casual Leave"
                type="number"
                placeholder="Casual Leave"
                name="vcasualleaves"
              />
              <button
                type="submit"
                className="mt-6 flex justify-center items-center mx-auto w-full max-h-10 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </span>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default DepartForm;
