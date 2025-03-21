import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { CloudDownloadOutlined } from "@ant-design/icons";
import Logo from "../../assets/nutrack.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEmployeeInfo } from "../../redux/employeeData";
const AttendanceTable = ({ empAttendance }) => {
  const pdfRef = useRef();
  const headerRef = useRef();
  const handleDownload = async () => {
    await downloadPDF()
  };
  const downloadPDF = async () => {

    const input = pdfRef.current;
    const headerValues = headerRef.current;

    const headerCanvas = await html2canvas(headerValues, { scale: 1 }); // Reduce scale
    const headerData = headerCanvas.toDataURL("image/jpeg", 0.6); // Compress header image with JPEG and quality 0.6

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 297;
    const headerHeight = 20;
    const footerHeight = 16;
    const contentHeight = pageHeight - headerHeight - footerHeight;

    const rows = Array.from(input.querySelectorAll("tr"));
    const totalRows = rows.length;
    const rowsPerPage = 19;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const applyHeaderStyle = (row) => {
      row.style.height = "40px";
      row.style.fontSize = "24px";
      row.style.backgroundColor = "#CCCCCC";
      row.style.boxSizing = "border-box";
    };
    applyHeaderStyle(rows[0]);
    const secondRowClone = rows[0].cloneNode(true);
    applyHeaderStyle(secondRowClone);

    for (let i = 0; i < totalPages; i++) {
      const startRow = i * rowsPerPage;
      const endRow = Math.min(startRow + rowsPerPage, totalRows);
      const tableChunk = document.createElement("table");
      tableChunk.style.width = input.offsetWidth + "px";
      if (i > 0) {
        tableChunk.appendChild(secondRowClone.cloneNode(true));
      }

      rows.slice(startRow, endRow).forEach((row, rowIndex) => {
        // if (i > 0 && rowIndex === 0) return;
        const rowClone = row.cloneNode(true);
        tableChunk.appendChild(rowClone);
      });

      document.body.appendChild(tableChunk);
      const chunkCanvas = await html2canvas(tableChunk, { scale: 1 });
      document.body.removeChild(tableChunk);

      const imgData = chunkCanvas.toDataURL("image/jpeg", 0.6);

      pdf.addImage(headerData, "PNG", 0, 0, imgWidth, headerHeight);
      const imgHeight = (chunkCanvas.height * imgWidth) / chunkCanvas.width;
      const contentY = headerHeight;
      pdf.addImage(imgData, "PNG", 0, headerHeight, imgWidth, imgHeight);

      pdf.setFontSize(8);
      const pageNumText = `Page ${i + 1} of ${totalPages}`;
      const pageNumTextWidth = pdf.getTextWidth(pageNumText);
      pdf.text(pageNumText, imgWidth - pageNumTextWidth - 4, pageHeight - 5);
      pdf.text(`Printed On: ${new Date().toLocaleDateString("en-GB")} ${new Date().toLocaleTimeString()}`, 10, pageHeight - 5);

      if (i < totalPages - 1) {
        pdf.addPage();
      }
    }

    // Save the PDF
    pdf.save(`${sysDate}.pdf`);

  };
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const td = `py-4 border-b w-[11%] text-[12px] sm:text-[14px] md:text-[16px] md:px-6`;
  const date = new Date().toLocaleDateString();
  // const date1 = moment(date, "MM/DD/YYYY").format("DD-MMMM-YYYY");
  // const day = moment(date, "MM/DD/YYYY").format("dddd");
  const [sysDate,setSysDate] = useState('')
  useEffect(()=>{
    setSysDate(empAttendance[0].SYS_DATE)
  },[empAttendance])
  const handleSubmit = (item) => {
    navigate(`EmployeeSummary/${item.ID}`)
    dispatch(getEmployeeInfo(item))
  }
  return (
    <>
      <div className="h-full ">
        <div className="w-full flex items-center justify-center">
          <p className="flex-1 hidden md:block"></p>
          <h2 className="md:flex-1 p-1 text-center font-semibold text-sm md:text-2xl my-5">
            Today Attendance  
          </h2>
          <div className="flex-1 flex">
            <span className="w-fit border-2 border-black rounded-md flex-col items-center flex md:flex-row">
              <span className="text-[12px] md:text-[14px] w-fit font-semibold p-2 px-1">
                {sysDate}
              </span>
            </span>
            <button className="flex-1 flex justify-around items-center">
              <CloudDownloadOutlined
                onClick={handleDownload}
                className="text-[30px] md:-mt-0 md:text-[35px] text-center"
              />
            </button>
          </div>
        </div>
        <table className="min-w-full  border border-gray-300 px-3">
          <thead className="bg-[#636D8E] text-white">
            <tr className="">
              <th className="w-1/12 py-4 px-3 border-b text-left  font-semibold text-[11px] md:text-[16px] md:px-6 md:w-3/12">
                #
              </th>
              <th className="w-5/12 py-4 border-b text-left  font-semibold text-[11px] md:text-[16px] md:px-6 md:w-3/12">
                Employee Name
              </th>
              <th className="w-2/12 py-4 border-b text-center  font-semibold text-[11px] md:text-[16px] md:px-6 md:w-3/12">
                Time In
              </th>
              <th className="w-2/12 py-4 border-b text-center  font-semibold text-[11px] md:text-[16px] md:px-6 md:w-3/12">
                Time Out
              </th>
            </tr>
          </thead>
          <tbody>
            {empAttendance.map((item, index) => {
              const isAbsent = !item.ENTRYTIME;
              return (
                <tr key={index} className={`${isAbsent ? "bg-red-200" : "bg-white"}`} onClick={()=>handleSubmit(item)}>
                  <td className={`px-3 ${td}`}>{index + 1}</td>
                  <td className={`${td}`}>{item.NAME}</td>
                  <td className={`${td} text-center`}>{item.ENTRYTIME ? item.ENTRYTIME : item.TITLE ? item.TITLE : "Absent"}</td>
                  <td className={`${td} text-center`}>
                    {item.ENTRYTIME && !item.LEAVEINGTIME ? "Still In" : item.LEAVEINGTIME ? item.LEAVEINGTIME : item.REMARKS ? item.REMARKS : "Absent"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <span className="w-[210mm] fixed top-[-9999px] -z-10">
        <div ref={headerRef} className="w-[210mm] flex items-center justify-between border-b-2 border-gray-600">
          <div className="">
            <img src={Logo} alt="" width={200} />
          </div>
          <h1 className="text-[22px] font-semibold text-center mb-5">
            Attendance Sheet
          </h1>
          <span className="">{sysDate}</span>
        </div>
        <div ref={pdfRef} className="">
          <table className="w-[210mm] bg-gray-300 border border-gray-300 px-3">
            <thead>
              <tr className="">
                <th className="w-2/12 pt-2 pb-4 border-b text-center text-gray-600 font-semibold text-[11px] md:text-[16px]">
                  #
                </th>
                <th className="w-4/12 pt-2 pb-4 border-b text-left text-gray-600 font-semibold text-[11px] md:text-[16px]">
                  Employee Name
                </th>
                <th className="w-3/12 pt-2 pb-4 border-b text-left text-gray-600 font-semibold text-[11px] md:text-[16px]">
                  Time In
                </th>
                <th className="w-3/12 pt-2 pb-4 border-b text-left text-gray-600 font-semibold text-[11px] md:text-[16px]">
                  Time Out
                </th>
              </tr>
            </thead>
            <tbody>
              {empAttendance.map((item, index) => {
                const isAbsent = !item.ENTRYTIME;
                return (
                  <tr
                    key={index}
                    className={`${isAbsent ? "bg-red-200" : "bg-white"}`}
                  >
                    <td className={`pt-2 pb-4 border-b text-[12px] sm:text-[14px] md:text-[16px] text-center`}>{index + 1}</td>
                    <td className={`pt-2 pb-4 border-b text-[12px] sm:text-[14px] md:text-[16px]`}>{item.NAME}</td>
                    <td className={`pt-2 pb-4 border-b text-[12px] sm:text-[14px] md:text-[16px]`}>{item.ENTRYTIME ? item.ENTRYTIME : item.TITLE ? item.TITLE : "Absent"}</td>
                    <td className={`pt-2 pb-4 border-b text-[12px] sm:text-[14px] md:text-[16px]`}>
                    {item.ENTRYTIME && !item.LEAVEINGTIME ? "Still In" : item.LEAVEINGTIME ? item.LEAVEINGTIME : item.REMARKS ? item.REMARKS : "Absent"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </span>
    </>
  );
};

export default AttendanceTable;
