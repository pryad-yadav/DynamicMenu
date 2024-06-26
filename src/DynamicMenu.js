import React, { useEffect, useState } from "react";
import { Button, Menu } from "antd";
import axios from "axios";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;

const DynamicMenu = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onClick = (e) => {
    console.log("click ", e);
  };
  useEffect(() => {
    const fetchToken = async () => {
      const data = {
        user: "AdminPrime",
        password: "vbnm123VBNM!@#",
      };
      try {
        const response = await axios.post(
          "http://appnox-tm.it/api/login",
          data
        );
        console.log(response)
        return response.data.result.key;
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    const fetchMenuTree = async (token) => {
      try {
        const response = await axios.get(
          "http://appnox-tm.it/api/v1/menu/tree",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu tree:", error);
      }
    };

    const initialize = async () => {
      const token = await fetchToken();
      if (token) {
        fetchMenuTree(token);
      }
    };

    initialize();
  }, []);

  const MenuItems = (items) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        
        return (
          <SubMenu key={item.menuId} title={item.item} >
            {MenuItems(item.children)}
          </SubMenu>
        );
      }
    
      return (
        <Menu.Item key={item.menuId} >
          {item.item}
        </Menu.Item>
      );
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        mode="inline"
        style={{
          width: 256,
          marginLeft: "16px",
        }}
        onClick={onClick}
        inlineCollapsed={collapsed}
        theme="dark"
      >
        {MenuItems(data)}
      </Menu>
    </div>
  );
};

export default DynamicMenu;
