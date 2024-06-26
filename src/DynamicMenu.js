import React, { useEffect, useState } from "react";
import { Button,Menu } from "antd";
import axios from "axios";
import {
   
   
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    
  } from '@ant-design/icons';
const { SubMenu } = Menu;

const DynamicMenu = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };  
  const onClick = (e) => {
    console.log('click ', e);
  };
  useEffect(() => {
    const fetchToken = async () => {
      const data = {
        user: "AdminPro",
        password: "Mnop@1234",
      };
      try {
        const response = await axios.post("http://appnox-tm.it/api/login", 
          data
        );
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
    //     let res=response.data.result.data;
    //     const MenuItems = (res) => {  
    //         return res?.map((item) => {
    //             console.log(item.children)
    //           if (item.children && item.children.length > 0 ) {
    //             console.log(item.children)
    //             item.children.key=item.menuId;
    //             item.children.label=item.item;
    //             return (
                  
    //                 MenuItems(item.children)
                
    //             );
    //           }
    //           item.key=item.menuId;
    //           item.label=item.item;
    //         })
    //         }
    //         MenuItems(res);
    //         console.log(res)    
    // //     response.data.result.data.map((item) => {
    // //         console.log("item",item,item.children)
    // //         if (item.children && item.children.length > 0) {
    // //             item.children.map((child)=>{
    // //                 child.key=child.menuId;
    // //                 child.label=child.item;
                   
    // //             })
    // //           }
    // //           item.key=item.menuId;
    // //           item.label=item.item;
    // //   })
    //   console.log("nweData",response.data.result.data)
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
        item.children.key=item.menuId;
        item.children.label=item.item;
        return (
          <SubMenu key={item.menuId} title={item.item} icon={item.type} >
            {MenuItems(item.children)}
          </SubMenu>
        );
      }
      item.key=item.menuId;
      item.label=item.item;
      return <Menu.Item key={item.menuId} icon={item.type}>{item.item} </Menu.Item>;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return( 
  <div  style={{
    width: 256,
  }}>
 <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{    
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
  <Menu  mode="inline" style={{
      width: 256,
      marginLeft:"16px"
      
    }}
    onClick={onClick}
    inlineCollapsed={collapsed}
    theme="dark"
    >{MenuItems(data)}</Menu>
    
    </div>
    );

};

export default DynamicMenu;
