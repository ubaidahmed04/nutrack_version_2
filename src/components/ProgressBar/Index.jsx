import React from 'react'
import { Flex, Progress } from 'antd';
const ProgressBar = () => {
    return (
        <Flex gap="small" vertical>
            <Progress percent={50} showInfo={false} />
        </Flex>
    )
}

export default ProgressBar