import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Progress, Switch } from 'antd';
import ProgressBar from '../ProgressBar/Index';
const actions = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];
export const SummaryCard = () => {
  const [loading, setLoading] = useState(false);
  return (

    <div className="p-4  min-h-full">


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full ">
        {/* Employee Leaves Details */}
        <div className="bg-white shadow-lg border border-gray-300  shadow-gray-400 rounded-lg p-4  transition duration-300 transform hover:scale-105  hover:shadow-2xl hover:z-10 hover:shadow-gray-800">
          <h2 className="text-xl font-semibold mb-2">Employee Leaves Details</h2>

          <div className="flex justify-between mb-1">
            <span>Annual Leaves (12)</span>          
          </div>                                      



          <div className="flex  justify-between">
            <span className='w-11/12 '>
              <ProgressBar />
            </span>
            <span>5/12</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Sick Leaves(10)</span>
            
          </div>
          <div className="flex  justify-between">
            <span className='w-11/12 '>
              <ProgressBar />
            </span>
            <span>5/10</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Total Late</span>
          </div>
          <div className="flex  justify-between">
            <span className='w-11/12 '>
            <ProgressBar />
            </span>
            <span>10</span>
          </div>
        </div>

        {/* Employee Attendance Details */}
        <div className="bg-white shadow-lg border border-gray-300 shadow-gray-400 rounded-lg p-4  transition duration-300  transform hover:scale-105 hover:shadow-2xl hover:z-10 hover:shadow-gray-800">
          <h2 className="text-xl font-semibold mb-2">Employee Attendance Details</h2>
          <div className="grid grid-cols-2 gap-2 text-center mb-4">
            <div className="p-2 border rounded">Total Days<br /><span className="font-bold">18</span></div>
            <div className="p-2 border rounded">Total Present<br /><span className="font-bold">10</span></div>
            <div className="p-2 border rounded">Total Absent<br /><span className="font-bold">8</span></div>
            <div className="p-2 border rounded">Total Leave<br /><span className="font-bold">0</span></div>
            <div className="p-2 border rounded">Total Absent<br /><span className="font-bold">8</span></div>
            <div className="p-2 border rounded">Total Leave<br /><span className="font-bold">0</span></div>
          </div>

        </div>


      </div>

    </div>


  );
};