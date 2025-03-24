import React, { useEffect, useRef } from "react";
import { EmployeeTable, Loader } from "../components";
import { useSelector } from "react-redux";
import Logo from "../assets/nutrack.png";
import { CloudDownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import MonthlyReportTable from "../components/MonthlyReportTable";
const MonthlyEmployeeReport = ({name}) => {
  const tableHead = `pt-2 pb-4 border-b text-center text-gray-800 font-bold text-[16px]`;
  const tableBody = `pt-2 pb-4 border-b font-semibold text-center text-[16px]`;
  const pdfRef = useRef();
  const headerRef = useRef();
  const { users } = useSelector((state) => state.user || {});
  // console.log("name",name)
  const { singleEmployeeAttendance, isFetching } = useSelector(
    (state) => state.employeeAtt
  );

  const handleDownload = async () => {
    await downloadPDF();
  };
  // console.log(singleEmployeeAttendance[0])
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
      pdf.text(
        `Printed On: ${new Date().toLocaleDateString(
          "en-GB"
        )} ${new Date().toLocaleTimeString()}`,
        10,
        pageHeight - 5
      );

      if (i < totalPages - 1) {
        pdf.addPage();
      }
    }

    // Save the PDF
    // pdf.save(
    //   `${singleEmployeeAttendance.length !== 1 ? singleEmployeeAttendance[0].firstname : "All Employee"}.pdf`
    // );
    pdf.save(`${name == "All" ? "All" : name}.pdf`)
  };
  const { toDate, fromDate } = useSelector((state) => state.setDates);
  // console.log(toDate);
  // console.log(fromDate);
  return (
    <>
      <div className=" -z-10">
        <div className="h-full">
          <div className="flex w-full  items-center ">
            <h1 className="flex  w-full justify-center  text-lg items-center  sm:text-xl lg:text-2xl font-bold text-start md:py-2 md:mb-0">
             Monthly Employee Report
            </h1>
            <button className="flex justify-around  items-center mr-5">
              <CloudDownloadOutlined
                onClick={handleDownload}
                className="text-[26px]  md:-mt-0 text-center md:text-[30px] "
              />
            </button>
          </div>
          <div className="mb-2 w-full flex justify-center items-center">
            <div className="flex w-16 justify-around items-center text-sm">
              <span className="h-4 w-4 bg-red-300 "></span>
              <span>Absent</span>
            </div>
            {/* late me space zada tha is lye w-16 se w-12 ki he  */}
            <div className="flex w-12 justify-around items-center  text-sm "> 
              <span className="h-4 w-4 bg-yellow-200"></span>
              <span>Late</span>
            </div>
            <div className="flex w-16 justify-around items-center  text-sm">
              <span className="h-4 w-4 bg-green-200 "></span>
              <span>Holiday</span>
            </div>
            <div className="flex w-28 justify-around items-center px-1 text-sm">
              <span className="h-4 w-4 bg-blue-300 "></span>
              <span>Week Holiday</span>
            </div>
          </div>
        </div>
        {isFetching ? <Loader /> : <MonthlyReportTable employeeAttendance={singleEmployeeAttendance} />}
        {/* PDF HTML */}
        {singleEmployeeAttendance && (
          <span
            style={{
              position: "fixed",
              left: "-9999px",
              width: "210mm",
            }}
          >
            <div
              ref={headerRef}
              className="flex items-center justify-between w-full border-b-2 border-gray-600"
            >
              <div className="w-1/6">
                <img src={Logo} alt="" width={200} />
              </div>
              <h1 className="w-3/6 text-[22px] font-semibold text-center mb-5">
                 Monthly Employee Report
              </h1>
              <div className="w-2/6 text-start mb-2 relative">
                <span className="text-[12px] font-semibold absolute right-5 top-0">
                  ({fromDate}&nbsp;-&nbsp;{toDate})
                </span>
              </div>
            </div>
            <div ref={pdfRef} className="">
              <div className="w-full">
                <table className="w-[210mm] border border-gray-300 pt-5">
                  {/* <thead className="bg-gray-300 w-full h-full">
                    <tr className="text-center w-full">
                      <th className={`${tableHead} w-5/12`}>Date</th>
                      <th className={`${tableHead} w-2/12`}>Entry Time</th>
                      <th className={`${tableHead} w-2/12`}>Leaving Time</th>
                      <th className={`${tableHead} w-1/12`}>Hours</th>
                      <th className={`${tableHead} w-2/12`}>Total Hours</th>
                    </tr>
                  </thead> */}
                  {singleEmployeeAttendance && (
                    <tbody>
                      {Object.keys(singleEmployeeAttendance)?.map((dept ,index) => (
                        <React.Fragment key={index}>
                          {singleEmployeeAttendance[dept]?.map((employee, index) => (
                            <>
                              <tr className="" key={index}>
                                <td className="flex justify-start">
                                  <p className="pb-4 px-6 border-b font-bold text-[18px] capitalize bg-gray-300 text-black rounded-r-full text-center">
                                    {employee.firstname}
                                  </p>
                                </td>
                              </tr>
                              {(() => {
                                let totalHours = 0;
                                let totalMinutes = 0;
                                let totalLate = 0;
                                let totalAbsent = 0;
                                let totalPresent = 0;
                                let totalDays = 0;
                                employee.attendanceData.forEach((attendance) => {
                                    if (attendance.totalHours) {
                                      const [hours, minutes] = attendance.totalHours.split(":").map(Number);
                                      totalHours += hours;
                                      totalMinutes += minutes;
                                    }
                                    if(attendance.late === "Late"){
                                      totalLate += 1
                                    }
                                    if(attendance.remark === "present"){
                                      totalPresent += 1
                                    }
                                    if(!attendance.entryTime && attendance.remark !== "SATURDAY" && attendance.remark !== "SUNDAY"){
                                      totalAbsent += 1
                                    }
                                    if(attendance.remark !== "SATURDAY" && attendance.remark !== "SUNDAY"){
                                      totalDays += 1
                                    }
                                  }
                                );
                                totalHours += Math.floor(totalMinutes / 60);
                                totalMinutes = totalMinutes % 60;
                                const formattedMinutes = String(totalMinutes).padStart(2, "0");
                                return (
                                  <>
                                    {/* {employee.attendanceData.map(
                                      (attendance, index) => (
                                        <tr
                                          className={`${
                                            attendance.remark == "SUNDAY" || attendance.remark == "SATURDAY" ? "bg-blue-300" : attendance.remark === "Absent" ||
                                                attendance.remark == "Sick Leave" || attendance.remark == "Annual Leave" ? "bg-red-300" : attendance.late === "Late"
                                              ? "bg-yellow-100" : attendance.remark === "present" ? "bg-white" : "bg-green-100"
                                          }`}
                                          key={index}
                                        >
                                          <td className={`${tableBody} w-5/12`}>
                                            <span>{attendance.date}</span>
                                            <span className="">
                                              {attendance?.remark !== "Annual Leave" && attendance?.remark !== "Sick Leave" && attendance.remark !== "Absent" &&
                                                attendance.remark !== "present" &&  attendance.remark !== "SATURDAY" && attendance.remark !== "SUNDAY" && attendance.remark}
                                            </span>
                                          </td>
                                          <td className={`${tableBody} w-2/12`}>
                                            {attendance.entryTime ? attendance.entryTime : attendance.remark}
                                          </td>
                                          <td className={`${tableBody}  w-3/12`}>
                                            {attendance.leavingTime ? attendance.leavingTime : attendance.leaveRemark && attendance.leaveRemark?.slice(0,20)+"..."}
                                          </td>
                                          <td className={`${tableBody} w-1/12`}>
                                            {attendance.hours}
                                          </td>
                                          <td className={`${tableBody} w-1/12`}>
                                            {attendance.totalHours}
                                          </td>
                                        </tr>
                                      )
                                    )} */}
                                    <tr className="bg-gray-300">
                                      <td className="border-b font-semibold text-gray-700 pt-2 pb-4 px-6">
                                        TDays ({totalDays})&nbsp;&nbsp;&nbsp;TPresent ({totalPresent})
                                      </td>
                                      <td className="border-b font-semibold text-red-600 pt-2 pb-4 px-6">
                                        TAbsents({totalAbsent})
                                      </td>
                                      <td className="px-6 border-b font-semibold text-center text-[16px] text-yellow-900 pt-2 pb-4">
                                        TLates({totalLate})
                                      </td>
                                      <td className="px-6 pt-2 pb-4 border-b font-semibold">THours</td>
                                      <td className="px-6 pt-2 pb-4 border-b font-semibold text-[16px]">
                                        {`${totalHours}:${formattedMinutes}`}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })()}
                            </>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </span>
        )}
      </div>
    </>
  );
};

export default MonthlyEmployeeReport;
