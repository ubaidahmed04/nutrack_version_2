import React from 'react';
import { Select } from 'antd';
const onSearch = (value) => {
};
const SelectInput = ({emloyeeList,onChange,selectedEmployee}) => (
    <Select
        className='w-full'
        size='large'
        showSearch
        placeholder="Select a person"
        value={selectedEmployee || undefined}
        optionFilterProp="label"
        onChange={onChange}
        onSearch={onSearch}
        options={[
            { value: 'All', label: 'All' },
            ...emloyeeList.map(employee=>({
            value: employee.ID, label: employee.NAME
        }))]}
    />
);

const SelectDepart = ({departList,onChange,selectedDepartment}) => (
    <Select
        className='w-full'
        size='large'
        showSearch
        placeholder="Select a person"
        value={selectedDepartment || undefined}
        optionFilterProp="label"
        onChange={onChange}
        onSearch={onSearch}
        options={[
            { value: 'All', label: 'All' },
            ...departList.map(dept=>({
            value: dept.CODE, label: dept.DEPT
        }))]}
    />
);


const SelectEmployee = ({employeeList,onChange,selectedEmployee}) => (
    <Select
        className='w-full'
        size='large'
        showSearch
        placeholder="Select a person"
        value={selectedEmployee || undefined}
        optionFilterProp="label"
        onChange={onChange}
        onSearch={onSearch}
        options={[
            { value: 'All', label: 'All' },
            ...employeeList.map(emp=>({
            value: emp.ID, label: emp.NAME
        }))]}
    />
);

export {SelectInput , SelectDepart , SelectEmployee};