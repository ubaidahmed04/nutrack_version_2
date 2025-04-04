
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputFields from "../../utils/UserInput";
import { Modal } from "antd";
import { postRequest, updateRequest } from "../../utils/APICall";
import { updateDept } from "../../redux/deptSlice";
import { useDispatch } from "react-redux";
const UpdateDepartForm = ({ visible, onClose, singleData }) => {
    console.log("singleData-->>>>>",singleData)
    const dispatch = useDispatch()
    const [formData, setformData] = useState({
        vdeptitle: "",
        vtimein: "",
        vtimeout: "",
        vsickleaves: "",
        vcasualleaves: "",
      });
      useEffect(() => {
        if (singleData) {
            setformData({
            vdeptitle: singleData?.TITLE || "",
            vtimein: singleData?.TIMEIN || "",
            vtimeout: singleData?.TIMEOUT || "",
            vsickleaves: singleData?.SICKLEAVES   || "",
            vcasualleaves: singleData?.CASUALLEAVES || "",
          });
        }
      }, [singleData]);
  const validationSchema = Yup.object().shape({
    vdeptitle: Yup.string().required("Title is required"),
    vtimein: Yup.string().required("Time In is required"),
    vtimeout: Yup.string().required("Time Out is required"),
    vsickleaves: Yup.number().required("Sick Leave is required"),
    vcasualleaves: Yup.number().required("Casual Leave is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    function addGracePeriod(timeIn, gracePeriodMinutes) {
      const [hours, minutes] = timeIn.split(':').map(Number);
      const timeInDate = new Date();
      timeInDate.setHours(hours, minutes, 0); 
    
      timeInDate.setMinutes(timeInDate.getMinutes() + gracePeriodMinutes);
    
      const newTime = timeInDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, 
      });
    
      return newTime;
    }
    try {
    //   console.log("time out ",values)
      let gracetime = addGracePeriod(values.vtimein, 15)
      const obj = {
        ...values,
        vdepartmentid: singleData?.CODE, 
        vgracetimeperiod: gracetime ,
      }
    //   console.log("updated",obj)
      const response =await updateRequest("updateDept",obj)
      console.log("response ===>>>",response)
      if(response.returnValue){
          dispatch(updateDept(response?.data[0]));
          alert("Department UPdated successfully");
          resetForm();
          onClose(); 
      }
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Failed to add department");
    }
    // console.log(values)
  };
  return (
    <Modal
      title="Update Department"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
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
                Update
              </button>
            </span>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateDepartForm;
