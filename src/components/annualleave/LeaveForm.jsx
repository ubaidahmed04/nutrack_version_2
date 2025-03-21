import { Button, DatePicker, Input, Select } from 'antd'
import React from 'react'
const { TextArea } = Input;

const LeaveForm = () => {
    const onChange = (value) => {
        console.log(`selected ${value}`);
      };
      const onSearch = (value) => {
        console.log('search:', value);
      };
  return (
    <span className='flex md:justify-start  flex-wrap gap-4 items-center px-4 py-4'>
    <span>
    <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    size='large'
    style={{
        width: 300,
      }}
    options={[
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
      {
        value: 'tom',
        label: 'Tom',
      },
    ]}
  />    
    </span>   
    <span>
    <Select
    showSearch
    placeholder="Leave Type"
    optionFilterProp="label"
    // onChange={onChange}
    // onSearch={onSearch}
    size='large'
    style={{
        width: 300,
      }}
    options={[
      {
        value: 'Annualleave',
        label: 'Annual leaves',
      },
      {
        value: 'sickleave',
        label: 'Sick leaves',
      },
      
    ]}
  />    
    </span>   
    <span>
      <DatePicker placeholder="From Date ..."
        style={{
          width: 300,
        }}
        size='large' />
    </span>
    <span>
      <DatePicker placeholder="To Date ..."
        style={{
          width: 300,
        }}
        size='large' />
    </span>
    <span>
    <TextArea
     placeholder="Remarks..."
     rows={2}
  />
    </span>
        <span>
      <Button color="primary" size="large" className='ml-4 text-lg font-bold text-gray-100 p-4 px-12' variant="solid">
        Submit
      </Button>
        </span>
  </span>
  )
}

export default LeaveForm