import { QuestionMarkCircleIcon } from '@heroicons/react/16/solid';
import { Button, Popconfirm ,message} from 'antd';
import React from 'react'

const DeleteModal = ({children}) => {
    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
      };
      const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      };
  return (
    <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    icon={
        <QuestionMarkCircleIcon 
          style={{
            color: 'red',
          }}
        />
    }
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    {children}
    {/* <Button danger>Delete</Button> */}
  </Popconfirm>
  )
}

export default DeleteModal