import React from "react";
import {
  DownOutlined,
  SmileOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { clearToken } from "../../store/login/authSlice";


function MyHeader() {
    const onClick:MenuProps["onClick"] = ({key})=>{
        if (key==="1"){
            console.log("个人中心")
        }else if (key==="2"){
            
        }
    }
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          退出登录
        </a>
      ),
      icon: <PoweroffOutlined />
    },
  ];

  return (
    <div className="dropdown">
      <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            欢迎您，{sessionStorage.getItem("username")}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default MyHeader;
