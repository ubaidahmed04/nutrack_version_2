import React, { useRef } from 'react'
import { EmployeesTable, Loader } from '../components'
import { useSelector } from 'react-redux'
import { CloudDownloadOutlined } from "@ant-design/icons";
import Logo from "../assets/nutrack.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const AllEmployee = () => {
  const tableHead = `pt-4 pb-6 px-3 border-b text-center text-gray-800 font-bold text-[24px]`;
  const tableBody = `px-3 pt-4 pb-6 border-b font-semibold text-center text-[24px]`;
  const pdfRef = useRef();
  const headerRef = useRef();
  const { toDate, fromDate } = useSelector((state) => state.setDates);
  const {allEmployeeAttendance,isFetching} = useSelector(state=>state.employerAtt)

//   const downloadPDF = async () => {
//     pdfRef.current.classList.remove('hidden');
//     headerRef.current.classList.remove('hidden');

//     const input = pdfRef.current;
//     const headerValues = headerRef.current;

//     const headerCanvas = await html2canvas(headerValues);
//     const headerData = headerCanvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const imgWidth = 210;
//     const pageHeight = 297;
//     const headerHeight = 20;
//     const footerHeight = 16;
//     const contentHeight = pageHeight - headerHeight - footerHeight;

//     const rows = Array.from(input.querySelectorAll("tr"));
//     const totalRows = rows.length;
//     const rowsPerPage = 30;
//     const totalPages = Math.ceil(totalRows / rowsPerPage);

//     const applyHeaderStyle = (row) => {
//         row.style.height = "78px"; 
//         row.style.fontSize = "24px";
//         row.style.backgroundColor = "#CCCCCC";
//         row.style.boxSizing = "border-box";
//     };

//     applyHeaderStyle(rows[0]);

//     const secondRowClone = rows[0].cloneNode(true); 
//     applyHeaderStyle(secondRowClone);

//     for (let i = 0; i < totalPages; i++) {
//         const startRow = i * rowsPerPage;
//         const endRow = Math.min(startRow + rowsPerPage, totalRows);

//         const tableChunk = document.createElement("table");
//         tableChunk.style.width = "100%";
//         tableChunk.style.tableLayout = "fixed";
//         tableChunk.style.boxSizing = "border-box";

//         if (i > 0) {
//             tableChunk.appendChild(secondRowClone.cloneNode(true));
//         }

//         rows.slice(startRow, endRow).forEach((row) => {
//             const rowClone = row.cloneNode(true);
//             rowClone.style.height = "78px"; 
//             rowClone.style.fontSize = "24px";
//             rowClone.style.boxSizing = "border-box";
//             tableChunk.appendChild(rowClone);
//         });

//         document.body.appendChild(tableChunk);
//         const chunkCanvas = await html2canvas(tableChunk, { scale: 2 });
//         document.body.removeChild(tableChunk);

//         const imgHeight = (chunkCanvas.height * imgWidth) / chunkCanvas.width;

//         pdf.addImage(headerData, "PNG", 0, 0, imgWidth, headerHeight);
//         const contentY = headerHeight; 
//         pdf.addImage(chunkCanvas.toDataURL("image/png"), "PNG", 0, contentY, imgWidth, imgHeight);

//         pdf.setFontSize(8);
//         const pageNumText = `Page ${i + 1} of ${totalPages}`;
//         const pageNumTextWidth = pdf.getTextWidth(pageNumText);
//         pdf.text(pageNumText, imgWidth - pageNumTextWidth - 4, pageHeight - 5);
//         pdf.text(`Printed On: ${new Date().toLocaleDateString("en-GB")} ${new Date().toLocaleTimeString()}`,
//             10,
//             pageHeight - 5
//         );

//         if (i < totalPages - 1) {
//             pdf.addPage();
//         }
//     }

//     // Save the PDF
//     pdf.save(`AllEmployees.pdf`);
//     pdfRef.current.classList.add('hidden');
//     headerRef.current.classList.add('hidden');
// };


const downloadPDF = async () => {
  pdfRef.current.classList.remove("hidden");
  headerRef.current.classList.remove("hidden");

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
  const rowsPerPage = 30;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const applyHeaderStyle = (row) => {
      row.style.height = "78px";
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
      tableChunk.style.width = "100%";
      tableChunk.style.tableLayout = "fixed";
      tableChunk.style.boxSizing = "border-box";

      if (i > 0) {
          tableChunk.appendChild(secondRowClone.cloneNode(true));
      }

      rows.slice(startRow, endRow).forEach((row) => {
          const rowClone = row.cloneNode(true);
          rowClone.style.height = "78px";
          rowClone.style.fontSize = "24px";
          rowClone.style.boxSizing = "border-box";
          tableChunk.appendChild(rowClone);
      });

      document.body.appendChild(tableChunk);
      const chunkCanvas = await html2canvas(tableChunk, { scale: 1 }); // Reduce scale to lower image size
      document.body.removeChild(tableChunk);

      const imgHeight = (chunkCanvas.height * imgWidth) / chunkCanvas.width;
      const chunkData = chunkCanvas.toDataURL("image/jpeg", 0.6); // Compress image with JPEG format and quality 0.6

      pdf.addImage(headerData, "JPEG", 0, 0, imgWidth, headerHeight);
      const contentY = headerHeight;
      pdf.addImage(chunkData, "JPEG", 0, contentY, imgWidth, imgHeight);

      pdf.setFontSize(8);
      const pageNumText = `Page ${i + 1} of ${totalPages}`;
      const pageNumTextWidth = pdf.getTextWidth(pageNumText);
      pdf.text(pageNumText, imgWidth - pageNumTextWidth - 4, pageHeight - 5);
      pdf.text(
          `Printed On: ${new Date().toLocaleDateString("en-GB")} ${new Date().toLocaleTimeString()}`,
          10,
          pageHeight - 5
      );

      if (i < totalPages - 1) {
          pdf.addPage();
      }
  }

  // Save the PDF
  pdf.save(`AllEmployees.pdf`);
  pdfRef.current.classList.add("hidden");
  headerRef.current.classList.add("hidden");
};

  return (
  <>
    <div>
      <div className="flex items-center py-3">
          <div className="flex-1 hidden md:block"></div>
          <h1 className="flex-2 md:flex-1 text-2xl md:text-3xl font-semibold text-center py-3 md:py-2 mb-4 md:mb-0">
            Employees Attendance
          </h1>
          <button disabled={!allEmployeeAttendance} className="flex-1 flex justify-around" onClick={downloadPDF}>
            <CloudDownloadOutlined className="text-[35px] -mt-3 md:-mt-0 md:text-[50px]" />
          </button>
        </div>
        <div className="mb-2 w-full flex justify-center items-center">
          <div className="flex w-16 justify-around items-center text-sm">
            <span className="h-4 w-4 bg-red-300 "></span>
            <span>Absent</span>
          </div>
          <div className="flex w-16 justify-around items-center  text-sm ">
            <span className="h-4 w-4 bg-yellow-300 "></span>
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
      {isFetching ? <Loader/> : <EmployeesTable employeeAttendance={allEmployeeAttendance}/> }
    </div>

    {/* PDF HTML */}
    <div>
      <div ref={headerRef} className="hidden flex items-center justify-between pb-5 w-full border-b-2 border-gray-600">
          <div className="flex-1 mt-5">
            <img src={Logo} alt="" width={250} />
          </div>
          <h1 className="flex-1 text-4xl font-semibold text-center py-2 mb-0">
            Employee Attendance
          </h1>
          <div className="flex-1 text-center -mb-5">
            <span className="text-[22px] font-semibold">
              ({fromDate}&nbsp;-&nbsp;{toDate})
            </span>
          </div>
      </div>
      <div ref={pdfRef} className=" hidden mt-6">
        <div className="w-full mt-2 md:mt-3">
          <table className="min-w-max w-full border border-gray-300 pt-5">
            <thead className="bg-gray-400 w-full h-full top-0 z-10">
              <tr className="text-center w-full">
                <th className={tableHead}>Date</th>
                <th className={tableHead}>Entry Time</th>
                <th className={tableHead}>Leaving Time</th>
                <th className={tableHead}>Hours</th>
                <th className={tableHead}>Total Hours</th>
              </tr>
            </thead>
            {allEmployeeAttendance && (
              <tbody>
                {allEmployeeAttendance.map((employee) => (
                  <>
                    <tr className="text-xl border-b font-bold capitalize bg-black text-white text-center ">
                      <td className="px-5 py-2 rounded-r-full">
                        {employee.firstname}
                      </td>
                    </tr>
                    {(() => {
                      let totalHours = 0;
                      let totalMinutes = 0;
                      employee.attendanceData.forEach((attendance) => {
                        if (attendance.totalHours) {
                          const [hours, minutes] = attendance.totalHours
                            .split(":")
                            .map(Number);
                          totalHours += hours;
                          totalMinutes += minutes;
                        }
                      });
                      totalHours += Math.floor(totalMinutes / 60);
                      totalMinutes = totalMinutes % 60;
                      const formattedMinutes = String(totalMinutes).padStart(
                        2,
                        "0"
                      );
                      return (
                        <>
                          {employee.attendanceData.map((attendance, index) => (
                            <tr className={`${
                              attendance.remark == "SUNDAY" || attendance.remark == "SATURDAY" ? "bg-blue-300" : 
                              attendance.remark === "Absent" ? "bg-red-300" : 
                              attendance.late === 'Late' ? 'bg-yellow-100'  : 
                              attendance.remark === 'present' ? 'bg-white' : 'bg-green-100'}`}
                              key={index}>
                              <td className={`${tableBody}`}>
                                {attendance.date}
                                <span className="">{attendance.remark !== 'present' && attendance.remark !== 'SATURDAY' &&  attendance.remark !== 'SUNDAY' && `(${attendance.remark})`}</span>
                              </td>
                              <td className={`${tableBody}`}>{attendance.entryTime ? attendance.entryTime: attendance.remark}</td>
                              <td className={`${tableBody}`}>{attendance.leavingTime}</td>
                              <td className={`${tableBody}`}>{attendance.hours}</td>
                              <td className={`${tableBody}`}>{attendance.totalHours}</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-300">
                            <td className="px-6 pt-4 pb-6 border-b font-bold"></td>
                            <td className="px-6 pt-4 pb-6 border-b font-bold"></td>
                            <td className="px-6 pt-4 pb-6 border-b font-bold"></td>
                            <td className="px-6 pt-4 pb-6 border-b font-bold text-center text-[24px]">
                              Total Hours
                            </td>
                            <td className="px-6 pt-4 pb-6 border-b font-bold text-center text-[24px]">
                              {`${totalHours}:${formattedMinutes}`}
                            </td>
                          </tr>
                        </>
                      );
                    })()}
                  </>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  </>
  )
}

export default AllEmployee