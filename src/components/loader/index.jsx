import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
const Loader = () => (
  <div className="flex justify-center items-center h-[75vh]">
    <Flex align="center" gap="middle">
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 72,
            }}
            spin
          />
        }
      />
    </Flex>
  </div>
);
export default Loader;
