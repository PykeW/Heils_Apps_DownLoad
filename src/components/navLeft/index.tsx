import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { PieChartOutlined, DesktopOutlined } from "@ant-design/icons";
import { getMenu } from "../../API/users";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from 'axios';
import icons from "./iconList";
import logo from "../../asset/logo.jpg"
import "./index.scss"

interface menuItem{
  key:string,
  icon?:React.ReactNode,
  label:string,
  children?:menuItem[]
}

interface MenuItemFormData{
  key:string,
  icon:string,
  label:string,
  children?:MenuItemFormData[]
}

function NavLeft() {
  const [menuList, setMenuList] = useState<menuItem[]>([]);
  const token = useSelector((state:RootState)=>state.authReducer.token) as string;
  // 获取菜单
  async function configMenu(){
    try {
      const res = await getMenu(token);
      console.log("configMenu获取的原始res",res)
      const mappedMenuList = mapItems(res.data.data)
      console.log("mappedMenuList",mappedMenuList)
      setMenuList(mappedMenuList)
    } catch (error) {
      console.error('NavLeft请求失败:', error);
    }
  }
  useEffect(()=>{
    configMenu()
  },[])

  console.log("menuList",menuList)
  function mapItems(items:menuItem[]):any{
    return items.map((items)=>{
      return {
        key:items.key,
        icon:icons[items.icon as keyof typeof icons],
        label:items.label,
        children:items.children?mapItems(items.children):null
      }
    })
  }
  return (
    <div className="navLeft">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>园区管理系统</h1>
      </div>
      <Menu
        defaultSelectedKeys={["21"]}
        defaultOpenKeys={["2"]}
        mode="inline"
        theme="dark"
        items={menuList}
      />
    </div>
  );
}

export default NavLeft;
