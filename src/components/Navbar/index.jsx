import React, { useState } from 'react';
import logo from '../../assets/nutrack.png';
import { Link, NavLink } from 'react-router-dom';
import { Drawer, } from 'antd';
import ModalComponents from '../modal';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../redux/userSlice';
import { emptyEmployee } from '../../redux/employeeSlice';
import { Bars3BottomRightIcon, ClipboardDocumentIcon, ClipboardDocumentListIcon, XMarkIcon } from "@heroicons/react/16/solid";
import {
  HomeIcon,
  FolderIcon,
  UserCircleIcon,
  // CreditCardIcon,
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon
} from "@heroicons/react/24/solid";
const Navbar = ({ setName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { users } = useSelector((state) => state.user || {})
  // const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setIsOpen(true);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(Logout())
    dispatch(emptyEmployee())
  }
  const menuItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeIcon className="w-5 h-5" />,
      link: "/"
    },
    // {
    //   key: "Attendancesheet",
    //   label: <ModalComponents titles="Attendance Sheet" isOpen={isOpen} setIsOpen={setIsOpen} message="responsive" setName={setName} />,
    //   icon: <FolderIcon className="w-5 h-5" />,
    //   // link:""
    // },
    ...(users && users.role === "HR") ?
      [
        {
          key: "MarkAttendance",
          label: "Mark Attendance",
          icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
          link: "/markatt"
        },
        {
          key: "Users",
          label: "Users",
          icon: <UserCircleIcon className="w-5 h-5" />,
          link: "allUser"
        },
        {
          key: "Employee",
          label: "Employee",
          icon: <UserCircleIcon className="w-5 h-5" />,
          link: "employee"
        },
        {
          key: "Department",
          label: "Department",
          icon: <ClipboardDocumentIcon className="w-5 h-5" />,
          link: "department"
        },
        {
          key: "Worksheet",
          label: "Worksheet",
          icon: <DocumentTextIcon className="w-5 h-5" />,
          link: "worksheet"
        },
        {
          key: "Holiday",
          label: "Holiday",
          icon: <DocumentTextIcon className="w-5 h-5" />,
          link: "holiday"
        },
        // {
        //   key: "PaySlip",
        //   label: "PaySlip",
        //   icon: <CreditCardIcon    className="w-5 h-5" />,
        //   link:"payslip"
        // },
        {
          key: "sickleave",
          label: "Sick Leave",
          icon: <DocumentTextIcon className="w-5 h-5" />,
          link: "sickleave"
        },
        {
          key: "annualleave",
          label: "Annual Leave",
          icon: <DocumentTextIcon className="w-5 h-5" />,
          link: "annualleave"
        },
      ] : []
  ];
  // const onMenuClick = (e) => {
  //   console.log("Selected menu item:", e.key); // Handle navigation
  // };
  // const menuStyle = 'w-full text-left font-semibold border-b border-white py-2 pl-4';

  return (
    <div className='sticky bg-gray-200 top-0 w-full h-full z-10'> {/* Added z-50 here */}
      <div className="flex justify-between h-20 items-center shadow-md">
        <div className='flex items-center gap-x-5'>
          <Link to="/">
            <img src={logo} alt="" width={150} height={150} />
          </Link>
          {users && users.role === "HR" && <span className='font-semibold flex gap-x-2 text-2xl bg-orange-400 rounded-md text-black px-3'>Role:<span className='text-2xl'>{users.role}</span></span>}

        </div>
        <div className="block pr-4 ">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {!isOpen ? <Bars3BottomRightIcon onClick={showDrawer} className="h-8 w-8 text-gray-700" /> : <XMarkIcon className="h-8 w-8 text-gray-500" />}
          </button>
        </div>
      </div>
      <div className='!max-w-72 w-full '>
        <Drawer
          title={
            <div className="flex items-center justify-center">
              <img
                src={logo}
                alt="Logo"
                className="bg-white p-2 rounded-full shadow-md"
                width={150}
                height={150}
              />
            </div>
          }
          placement="right"
          onClose={() => setIsOpen(false)}
          open={isOpen}
          className="!bg-gray-100 "
        >

          {/* Menu Items */}
          <div className="space-y-4 w-full">
            {menuItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-xl  ${!isActive
                    ? " w-full  text-black font-semibold  hover:bg-[#636D8E] hover:text-white hover:shadow-md"
                    : "bg-orange-400 font-bold text-white underline hover:text-black shadow-md"
                  }`
                }
                onClick={() => setIsOpen(false)} // Close drawer on click
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
          <span
            className="flex items-center gap-3 px-4 py-2  rounded-xl   w-full  text-black font-semibold  hover:bg-[#636D8E] hover:text-white hover:shadow-md hover:cursor-pointer "
            // onClick={() => setIsOpen(false)}  close on selected this tab
            >
            <FolderIcon className="w-5 h-5 !space-y-2 my-2" />
            <ModalComponents titles="Attendance Sheet" isOpen={isOpen} setIsOpen={setIsOpen} message="responsive" setName={setName} />
          </span>
          {/* Footer Section */}
          <div className="absolute bottom-6 left-6   w-full px-4">
            <button
              onClick={logout}
              className="flex items-center gap-3 font-semibold hover:bg-red-200 w-full p-4 rounded-xl text-red-600 hover:text-red-800"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </div>
        </Drawer>
      </div>
      {/* ya ha open close */}
      {/* <div
        className={`lg:hidden flex flex-col bg-gray-300 text-gray-800 z-9999 
  transition-all duration-300 ease-in-out transform 
  ${isOpen ? "scale-100 opacity-100 flex" : "scale-75 opacity-0 hidden"}
  fixed left-1/2 -translate-x-1/2 w-80 max-w-[300px] p-5 rounded-lg shadow-lg`}
      >
        <Link to="/" onClick={() => setIsOpen(false)}>
          <div className={menuStyle} color="default" variant="solid">
            <Button className="font-semibold text-[16px] bg-transparent border-0 text-inherit">Home</Button>
          </div>
        </Link>
        {users && users.role === "HR" &&(
          <>
           <Link to="/markAtt" onClick={() => setIsOpen(false)}>
          <div className={menuStyle} color="default" variant="solid">
            <Button className="font-semibold text-[16px] bg-transparent border-0 text-inherit">Mark Attendance</Button>
          </div>
        </Link>
        <Link to="/allUser" onClick={() => setIsOpen(false)}>
          <div className={menuStyle} color="default" variant="solid">
            <Button className="font-semibold text-[16px] bg-transparent border-0 text-inherit">User</Button>
          </div>
        </Link>
        <Link to="/employee" onClick={() => setIsOpen(false)}>
          <div className={menuStyle} color="default" variant="solid">
            <Button className="font-semibold text-[16px] bg-transparent border-0 text-inherit">Employee</Button>
          </div>
        </Link>
          </>
        )
        }
       
        <div className={menuStyle} 
         >
          <ModalComponents titles="Attendance Sheet" isOpen={isOpen} setIsOpen={setIsOpen} message="responsive" setName={setName} />
        </div>
        <Link to="/login" onClick={logout}>
          <div className={`${menuStyle} `}>
          <Button color="danger" variant="solid">Logout </Button>
          </div>
        </Link>
      </div> */}



    </div>
  );
}

export default Navbar;
