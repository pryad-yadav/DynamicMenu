import React, { useEffect, useState } from "react";
import { Button, Menu } from "antd";
import axios from "axios";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;

const DynamicMenu = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const items=[
            {
                "menuId": 23,
                "parentId": 0,
                "displayOrder": 1,
                "type": "Image",
                "item": "HOME",
                "script": "/",
                "children": []
            },
            {
                "menuId": 161,
                "parentId": 0,
                "displayOrder": 2,
                "type": "Text",
                "item": "TRAVEL",
                "script": "/modules/travel",
                "children": []
            },
            {
                "menuId": 162,
                "parentId": 0,
                "displayOrder": 3,
                "type": "Image",
                "item": "HELP",
                "script": "help",
                "children": []
            },
            {
                "menuId": 160,
                "parentId": 0,
                "displayOrder": 10,
                "type": "Text",
                "item": "ADMIN",
                "script": "/admin",
                "children": [
                    {
                        "menuId": 24,
                        "parentId": 160,
                        "displayOrder": 1,
                        "type": "Image",
                        "item": "Configuration",
                        "script": "about",
                        "children": [
                            {
                                "menuId": 29,
                                "parentId": 24,
                                "displayOrder": 1,
                                "type": "Text",
                                "item": "Company",
                                "script": "/modules/company",
                                "children": []
                            },
                            {
                                "menuId": 30,
                                "parentId": 24,
                                "displayOrder": 2,
                                "type": "Text",
                                "item": "Person",
                                "script": "/modules/person",
                                "children": []
                            },
                            {
                                "menuId": 31,
                                "parentId": 24,
                                "displayOrder": 3,
                                "type": "Text",
                                "item": "User",
                                "script": "/modules/users",
                                "children": []
                            }
                        ]
                    },
                    {
                        "menuId": 174,
                        "parentId": 160,
                        "displayOrder": 2,
                        "type": "Text",
                        "item": "Application Forms",
                        "script": "/modules/application",
                        "children": []
                    },
                    {
                        "menuId": 26,
                        "parentId": 160,
                        "displayOrder": 3,
                        "type": "Image",
                        "item": "Reports",
                        "script": "logs",
                        "children": [
                            {
                                "menuId": 33,
                                "parentId": 26,
                                "displayOrder": 1,
                                "type": "Text",
                                "item": "Session",
                                "script": "/logs/session",
                                "children": []
                            },
                            {
                                "menuId": 34,
                                "parentId": 26,
                                "displayOrder": 2,
                                "type": "Text",
                                "item": "Activity",
                                "script": "/logs/activity",
                                "children": []
                            },
                            {
                                "menuId": 35,
                                "parentId": 26,
                                "displayOrder": 3,
                                "type": "Text",
                                "item": "Audit",
                                "script": "/logs/audit",
                                "children": []
                            },
                            {
                                "menuId": 36,
                                "parentId": 26,
                                "displayOrder": 4,
                                "type": "Text",
                                "item": "Error",
                                "script": "/logs/error",
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "menuId": 194,
                "parentId": 0,
                "displayOrder": 30,
                "type": "Text",
                "item": "SYSTEM",
                "script": "dummy",
                "children": [
                    {
                        "menuId": 28,
                        "parentId": 194,
                        "displayOrder": 1,
                        "type": "Text",
                        "item": "Menu",
                        "script": "/modules/menu",
                        "children": []
                    },
                    {
                        "menuId": 32,
                        "parentId": 194,
                        "displayOrder": 3,
                        "type": "Text",
                        "item": "Scope",
                        "script": "/modules/scope",
                        "children": []
                    },
                    {
                        "menuId": 164,
                        "parentId": 194,
                        "displayOrder": 4,
                        "type": "Text",
                        "item": "Activity Types",
                        "script": "/modules/activity_type",
                        "children": []
                    },
                    {
                        "menuId": 165,
                        "parentId": 194,
                        "displayOrder": 5,
                        "type": "Text",
                        "item": "IP Address Book",
                        "script": "/modules/ip_address_book",
                        "children": []
                    },
                    {
                        "menuId": 192,
                        "parentId": 194,
                        "displayOrder": 8,
                        "type": "Text",
                        "item": "Fees",
                        "script": "/modules/fees",
                        "children": []
                    },
                    {
                        "menuId": 186,
                        "parentId": 194,
                        "displayOrder": 9,
                        "type": "Text",
                        "item": "Knowledge Base",
                        "script": "/modules/knowledgeBase",
                        "children": []
                    },
                    {
                        "menuId": 181,
                        "parentId": 194,
                        "displayOrder": 10,
                        "type": "Text",
                        "item": "Messages",
                        "script": "message",
                        "children": [
                            {
                                "menuId": 159,
                                "parentId": 181,
                                "displayOrder": 2,
                                "type": "Text",
                                "item": "Translation",
                                "script": "/modules/translation",
                                "children": []
                            },
                            {
                                "menuId": 183,
                                "parentId": 181,
                                "displayOrder": 6,
                                "type": "Text",
                                "item": "Canned Message Key",
                                "script": "/modules/cannedMessagekey",
                                "children": []
                            },
                            {
                                "menuId": 182,
                                "parentId": 181,
                                "displayOrder": 7,
                                "type": "Text",
                                "item": "Canned Message Details",
                                "script": "/modules/cannedMessage",
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "menuId": 195,
                "parentId": 0,
                "displayOrder": 40,
                "type": "Text",
                "item": "SUPPLIERS",
                "script": "suppliers",
                "children": [
                    {
                        "menuId": 175,
                        "parentId": 195,
                        "displayOrder": 1,
                        "type": "Text",
                        "item": "Bus Carriers",
                        "script": "/modules/bus-carriers",
                        "children": []
                    },
                    {
                        "menuId": 199,
                        "parentId": 195,
                        "displayOrder": 10,
                        "type": "Text",
                        "item": "Supplier",
                        "script": "/modules/supplier",
                        "children": []
                    },
                    {
                        "menuId": 176,
                        "parentId": 195,
                        "displayOrder": 16,
                        "type": "Text",
                        "item": "Bus Locations",
                        "script": "/modules/bus_locations",
                        "children": []
                    },
                    {
                        "menuId": 173,
                        "parentId": 195,
                        "displayOrder": 18,
                        "type": "Text",
                        "item": "Airline Policies",
                        "script": "/modules/airline_policies",
                        "children": []
                    },
                    {
                        "menuId": 190,
                        "parentId": 195,
                        "displayOrder": 24,
                        "type": "Text",
                        "item": "Malpractice Limits",
                        "script": "/modules/malpractice",
                        "children": []
                    }
                ]
            },
            {
                "menuId": 196,
                "parentId": 0,
                "displayOrder": 50,
                "type": "Text",
                "item": "GLOBAL",
                "script": "global",
                "children": [
                    {
                        "menuId": 167,
                        "parentId": 196,
                        "displayOrder": 5,
                        "type": "Text",
                        "item": "Airlines",
                        "script": "/modules/airline",
                        "children": []
                    },
                    {
                        "menuId": 171,
                        "parentId": 196,
                        "displayOrder": 6,
                        "type": "Text",
                        "item": "Flight Alliances",
                        "script": "/modules/flight_alliances",
                        "children": []
                    },
                    {
                        "menuId": 166,
                        "parentId": 196,
                        "displayOrder": 7,
                        "type": "Text",
                        "item": "Airline Classes",
                        "script": "/modules/airline_class",
                        "children": []
                    },
                    {
                        "menuId": 168,
                        "parentId": 196,
                        "displayOrder": 10,
                        "type": "Text",
                        "item": "Exchange Rates",
                        "script": "/modules/exchangeRate",
                        "children": []
                    },
                    {
                        "menuId": 172,
                        "parentId": 196,
                        "displayOrder": 13,
                        "type": "Text",
                        "item": "Loyality Cards",
                        "script": "/modules/loyalty_cards",
                        "children": []
                    },
                    {
                        "menuId": 187,
                        "parentId": 196,
                        "displayOrder": 14,
                        "type": "Text",
                        "item": "Credit Cards",
                        "script": "/modules/creditCard",
                        "children": []
                    },
                    {
                        "menuId": 193,
                        "parentId": 196,
                        "displayOrder": 17,
                        "type": "Text",
                        "item": "Countries",
                        "script": "/modules/countries",
                        "children": []
                    }
                ]
            },
            {
                "menuId": 197,
                "parentId": 0,
                "displayOrder": 60,
                "type": "Text",
                "item": "CUSTOMER",
                "script": "company",
                "children": [
                    {
                        "menuId": 169,
                        "parentId": 197,
                        "displayOrder": 1,
                        "type": "Text",
                        "item": "Cost Centers",
                        "script": "/modules/cost_centers",
                        "children": []
                    },
                    {
                        "menuId": 177,
                        "parentId": 197,
                        "displayOrder": 2,
                        "type": "Text",
                        "item": "Company Group",
                        "script": "/modules/company_group",
                        "children": []
                    },
                    {
                        "menuId": 179,
                        "parentId": 197,
                        "displayOrder": 3,
                        "type": "Text",
                        "item": "Company Groups Member",
                        "script": "/modules/company_groups_member",
                        "children": []
                    },
                    {
                        "menuId": 178,
                        "parentId": 197,
                        "displayOrder": 4,
                        "type": "Text",
                        "item": "Branches",
                        "script": "/modules/branches",
                        "children": []
                    },
                    {
                        "menuId": 185,
                        "parentId": 197,
                        "displayOrder": 5,
                        "type": "Text",
                        "item": "Orders",
                        "script": "/modules/orders",
                        "children": []
                    },
                    {
                        "menuId": 188,
                        "parentId": 197,
                        "displayOrder": 6,
                        "type": "Text",
                        "item": "Travel Reason",
                        "script": "/modules/travelReason",
                        "children": []
                    },
                    {
                        "menuId": 189,
                        "parentId": 197,
                        "displayOrder": 7,
                        "type": "Text",
                        "item": "Expense Type",
                        "script": "/modules/expenseType",
                        "children": []
                    },
                    {
                        "menuId": 184,
                        "parentId": 197,
                        "displayOrder": 8,
                        "type": "Text",
                        "item": "Communications",
                        "script": "/modules/communications",
                        "children": []
                    }
                ]
            }
        ]
    

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

    // const fetchMenuTree = async (token) => {
    //   try {
    //     const response = await axios.get(
    //       "http://appnox-tm.it/api/v1/menu/tree",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );

    //     setData(response.data.result.data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching menu tree:", error);
    //   }
    // };

    // const initialize = async () => {
    //   const token = await fetchToken();
    //   if (token) {
    //     fetchMenuTree(token);
    //   }
    // };

    // initialize();
  }, []);

  const MenuItems = (items) => {
    console.log(items);
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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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
        {MenuItems(items)}
      </Menu>
    </div>
  );
};

export default DynamicMenu;
