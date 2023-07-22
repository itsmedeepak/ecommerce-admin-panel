import React, { Fragment, useEffect, useState } from "react";
// import { MENUITEMS } from "./nav";
import Link from "next/link";
import { Scrollbars } from "react-custom-scrollbars";
import { useRouter } from "next/router";
import { horizontalmenusticky } from "../../../shared/data/switcherdata/switcherdata";
import dynamic from "next/dynamic";
// const horizontalmenusticky = dynamic(()=>import('../../../shared/data/switcherdata/switcherdata'), { ssr: false })
let history = [];

//Images
import logolight from "../../../public//assets/img/brand/logo-light.png";
import iconlight from "../../../public//assets/img/brand/icon-light.png";
import logo from "../../../public//assets/img/brand/logo.png";
import icon from "../../../public//assets/img/brand/icon.png";

function SideBar(props) {
  console.log(props);

  const [localStorageValue, setLocalStorageValue] = useState(null);
  const ITEMS = [
    {
      Items: [
        {
          path: "/components/ecommerce/dashboard",
          icon: "ti-home",
          type: "link",
          active: false,
          selected: false,
          title: "Dashboard",
        },
        {
          path: "/components/ecommerce/recentlyOrder",
          type: "link",
          icon: "ti-layout",
          active: false,
          selected: false,
          title: "Recently Purchased User",
        },
        
        {
          path: "/components/ecommerce/orders",
          type: "link",
          icon: "ti-layout",
          active: false,
          selected: false,
          title: "Order",
        },
        {
          path: "/components/ecommerce/users",
          type: "link",
          icon: "ti-briefcase",
          active: false,
          selected: false,
          title: "Users",
        },
        {
          path: "/components/ecommerce/restricted-view",
          type: "link",
          active: false,
          icon: "ti-briefcase",
          selected: false,
          title: "Products",
        },
        {
          path: "/components/ecommerce/restricted-view",
          type: "link",
          active: false,
          icon: "ti-briefcase",
          selected: false,
          title: "Add Products",
        },
        {
          path: "/components/ecommerce/restricted-view",
          type: "link",
          active: false,
          icon: "ti-briefcase",
          selected: false,
          title: "Blog",
        },
       
        {
          path: "/components/ecommerce/restricted-view",
          type: "link",
          active: false,
          icon: "ti-package",
          selected: false,
          title: "Manage Chart",
        },
        {
          path: "/components/ecommerce/restricted-view",
          type: "link",
          active: false,
          icon: "ti-package",
          selected: false,
          title: "Update Live Sessions",
        },
        {
          path: "/components/ecommerce/restricted-view",
          type: "link",
          active: false,
          icon: "ti-package",
          selected: false,
          title: "Manage Strategies",
        },
        {
          path: "/components/ecommerce/restricted-view",
          type: "link",
          active: false,
          icon: "ti-briefcase",
          selected: false,
          title: "Manage PatAlgo",
        },
        {
          path: "/components/ecommerce/restricted-view",
          type: "link",
          active: false,
          icon: "ti-package",
          selected: false,
          title: "Manage affliates",
        },
        {
          path: "/components/ecommerce/restricted-view",
          type: "link",
          icon: "ti-layout",
          active: false,
          selected: false,
          title: "Download Report",
        },
        {
          path: "/components/ecommerce/restricted-view",
          type: "link",
          active: false,
          icon: "ti-briefcase",
          selected: false,
          title: "Calendar",
        },
        {
          path: "/components/ecommerce/restricted-view",
          type: "link",
          active: false,
          icon: "ti-layout",
          selected: false,
          title: "Newsletter",
        },

        {
          path: "/logout",
          type: "link",
          active: false,
          icon: "ti-briefcase",
          selected: false,
          title: "Log Out",
        },
      ],
    },
  ];
  const [menuitems, setMenuitems] = useState(ITEMS);
  useEffect(() => {
    const myLocalStorageValue = window.localStorage.getItem("id");
    console.log(myLocalStorageValue);
    setLocalStorageValue(myLocalStorageValue);

    if (myLocalStorageValue=== "owner") {
      const indexesToKeep = [0, 2, 12, 13, 15];
      var newItems = ITEMS.map((item) => {
        const newItemsArray = item.Items.filter((_, index) => {
          return indexesToKeep.includes(index);
        });
  
        return { Items: newItemsArray };
      });
  
      setMenuitems(newItems);
    }


    if (myLocalStorageValue === "agent") {
      const indexesToKeep = [6, 7, 8, 9, 10,11, 14];
      var newItems = ITEMS.map((item) => {
        const newItemsArray = item.Items.filter((_, index) => {
          return indexesToKeep.includes(index);
        });
  
        return { Items: newItemsArray };
      });
  
      setMenuitems(newItems);
      
    }
  }, []);





 

  let location = useRouter();

  // const [menuIcontype, setmenuIcontype] = useState("hor-icon");
  // initial loading
  useEffect(() => {
    history.push(location.pathname); // add  history to history  stack for current location.pathname to prevent multiple history calls innerWidth  and innerWidth  calls from  multiple users. This is important because the history stack is not always empty when the user clicks  the history
    if (history.length > 2) {
      history.shift();
    }
    if (history[0] !== history[1]) {
      setSidemenu();
    }
    let mainContent = document.querySelector(".main-content");
    //when we click on the body to remove
    mainContent.addEventListener("click", mainContentClickFn);
    return () => {
      mainContent.removeEventListener("click", mainContentClickFn);
    };
  }, [location.pathname, mainContentClickFn, setSidemenu]);

  // location
  useEffect(() => {
    // setSidemenu();
    if (
      document.body.classList.contains("horizontalmenu") &&
      window.innerWidth >= 992
    ) {
      clearMenuActive();
    }
    // setTimeout(classnamechange, 0.1)
  }, []);
  // every chnage this effect calls
  let menuIcontype;
  if (document.querySelector("body").classList.contains("horizontalmenu")) {
    menuIcontype = "hor-icon";
  } else {
    menuIcontype = "sidemenu-icon";
  }
  //  In Horizontal When we click the body it should we Closed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function mainContentClickFn() {
    if (
      document.body.classList.contains("horizontalmenu") &&
      window.innerWidth >= 992
    ) {
      // clearMenuActive();
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setSidemenu() {
    if (menuitems) {
      menuitems.filter((mainlevel) => {
        if (mainlevel.Items) {
          mainlevel.Items.filter((items) => {
            items.active = false;
            items.selected = false;
            if (
              location.pathname === "/Patalgo/preview/" ||
              location.pathname === "/Patalgo/preview"
            ) {
              location.pathname = "/Patalgo/preview/dashboard/";
            }
            if (location.pathname === items.path) {
              items.active = true;
              items.selected = true;
            }
            if (items.children) {
              items.children.filter((submenu) => {
                submenu.active = false;
                submenu.selected = false;
                if (location.pathname === submenu.path) {
                  items.active = true;
                  items.selected = true;
                  submenu.active = true;
                  submenu.selected = true;
                }
                if (submenu.children) {
                  submenu.children.filter((submenu1) => {
                    submenu1.active = false;
                    submenu1.selected = false;
                    if (location.pathname === submenu1.path) {
                      items.active = true;
                      items.selected = true;
                      submenu.active = true;
                      submenu.selected = true;
                      submenu1.active = true;
                      submenu1.selected = true;
                    }
                    return submenu1;
                  });
                }
                if (
                  location.pathname ==
                    "/components/ecommerce/product-detail/[id]" &&
                  submenu.path == "/components/ecommerce/product-details"
                ) {
                  items.active = true;
                  items.selected = true;
                  submenu.active = true;
                  submenu.selected = true;
                }
                return submenu;
              });
            }
            return items;
          });
        }
        setMenuitems((arr) => [...arr]);
        return mainlevel;
      });
    }
  }
  function toggleSidemenu(item) {
    if (
      !document.body.classList.contains("horizontalmenu-hover") ||
      window.innerWidth < 992
    ) {
      // To show/hide the menu
      if (!item.active) {
        menuitems.filter((mainlevel) => {
          if (mainlevel.Items) {
            mainlevel.Items.filter((sublevel) => {
              sublevel.active = false;
              if (item === sublevel) {
                sublevel.active = true;
              }
              if (sublevel.children) {
                sublevel.children.filter((sublevel1) => {
                  sublevel1.active = false;
                  if (item === sublevel1) {
                    sublevel.active = true;
                    sublevel1.active = true;
                  }
                  if (sublevel1.children) {
                    sublevel1.children.filter((sublevel2) => {
                      sublevel2.active = false;
                      if (item === sublevel2) {
                        sublevel.active = true;
                        sublevel1.active = true;
                        sublevel2.active = true;
                      }
                      return sublevel2;
                    });
                  }
                  return sublevel1;
                });
              }
              return sublevel;
            });
          }
          return mainlevel;
        });
      } else {
        item.active = !item.active;
      }
      setMenuitems((arr) => [...arr]);
    }
  }
  function clearMenuActive() {
    MENUITEMS.filter((mainlevel) => {
      if (mainlevel.Items) {
        mainlevel.Items.filter((sublevel) => {
          sublevel.active = false;
          if (sublevel.children) {
            sublevel.children.filter((sublevel1) => {
              sublevel1.active = false;
              if (sublevel1.children) {
                sublevel1.children.filter((sublevel2) => {
                  sublevel2.active = false;
                  return sublevel2;
                });
              }
              return sublevel1;
            });
          }
          return sublevel;
        });
      }
      return mainlevel;
    });
    setMenuitems((arr) => [...arr]);
  }

  // //Hover effect
  function Onhover() {
    if (document.querySelector(".main-body")) {
      if (
        document
          .querySelector(".main-body")
          .classList.contains("main-sidebar-hide")
      )
        document.querySelector(".main-body").classList.add("main-sidebar-open");
    }
  }
  function Outhover() {
    if (document.querySelector(".main-body")) {
      document
        .querySelector(".main-body")
        .classList.remove("main-sidebar-open");
    }
  }

  return (
    <Fragment>
      <div
        className="sticky "
        style={{ marginBottom: "-64px" }}
        onScroll={horizontalmenusticky()}
      >
        <div className="main-menu main-sidebar main-sidebar-sticky side-menu">
          <div className="main-container-1 active main-sidebar-header">
            <Scrollbars
              options={{ removeTrackXWhenNotUsed: true }}
              className="hor-scroll"
              style={{ position: "absolute" }}
            >
              <div className="sidemenu-logo">
                <h4 style={{color:"white", display:"flex", justifyItems:"center", justifyContent:"center", padding:"10px"}}>Admin Panel</h4>
              </div>
              <div
                className="main-body-1 main-sidebar-body"
                onMouseOver={() => Onhover()}
                onMouseOut={() => Outhover()}
              >
                <div className="slide-left " id="slide-left">
                  <i className="fe fe-chevron-left"></i>
                </div>

                <ul className="menu-nav nav" style={{ marginLeft: "0px" }}>
                  {menuitems.map((Item, itemi) => (
                    <Fragment key={itemi + Math.random() * 100}>
                      <li className="nav-header">
                        <span className="nav-label">{Item.menutitle}</span>
                      </li>
                      {Item.Items.map((menuItem, i) => (
                        <li
                          className={`nav-item ${
                            menuItem.selected ? "active" : ""
                          }`}
                          key={i}
                        >
                          {menuItem.type === "sub" ? (
                            <a
                              href="#"
                              className={`nav-link with-sub`}
                              onClick={(event) => {
                                event.preventDefault();
                                toggleSidemenu(menuItem);
                              }}
                            >
                              <span className="shape1"></span>
                              <span className="shape2"></span>
                              <i
                                className={`${menuItem.icon} ${menuIcontype} menu-icon`}
                              ></i>
                              <span className="sidemenu-label">
                                {menuItem.title}
                                {menuItem.active}
                              </span>
                              {menuItem.badge ? (
                                <label className={menuItem.badge}>
                                  {menuItem.badgetxt}
                                </label>
                              ) : (
                                ""
                              )}
                              <div className="according-menu">
                                {menuItem.active ? (
                                  <i
                                    className={`${menuItem.background} fa angle fa-angle-down `}
                                  ></i>
                                ) : (
                                  <i
                                    className={`${menuItem.background} fa angle fa-angle-right `}
                                  ></i>
                                )}
                              </div>
                            </a>
                          ) : (
                            ""
                          )}

                          {menuItem.type === "link" ? (
                            <Link href={`${menuItem.path}`}>
                              <a
                                className={`nav-link ${
                                  menuItem.selected ? " active" : ""
                                }`}
                              >
                                <span className="shape1"></span>
                                <span className="shape2"></span>
                                <i
                                  className={`${menuItem.icon} ${menuIcontype} menu-icon`}
                                ></i>
                                <span className="sidemenu-label">
                                  {menuItem.title}
                                </span>
                                {menuItem.badge ? (
                                  <label className={menuItem.badge}>
                                    {menuItem.badgetxt}
                                  </label>
                                ) : (
                                  ""
                                )}
                              </a>
                            </Link>
                          ) : (
                            ""
                          )}
                          {menuItem.children ? (
                            <ul
                              className={`nav-sub ${
                                menuItem.active ? "open" : ""
                              }`}
                              style={
                                menuItem.active
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              {menuItem.children.map((childrenItem, index) => {
                                return (
                                  <li
                                    key={index}
                                    className={`nav-sub-item ${
                                      childrenItem.selected ? "active show" : ""
                                    }`}
                                  >
                                    {childrenItem.type === "sub" ? (
                                      <a
                                        href="javascript"
                                        className="nav-sub-link sub-with-sub"
                                        onClick={(event) => {
                                          event.preventDefault();
                                          toggleSidemenu(childrenItem);
                                        }}
                                      >
                                        <span className="sidemenu-label">
                                          {childrenItem.title}
                                          {childrenItem.active}
                                        </span>
                                        {childrenItem.active ? (
                                          <i className="angle fa fa-angle-down"></i>
                                        ) : (
                                          <i
                                            className={`${menuItem.background} fa angle fa-angle-right `}
                                          ></i>
                                        )}
                                      </a>
                                    ) : (
                                      ""
                                    )}

                                    {childrenItem.type === "link" ? (
                                      <Link href={`${childrenItem.path}`}>
                                        <a
                                          className={`nav-sub-link ${
                                            menuItem.selected ? " active" : ""
                                          }`}
                                        >
                                          {childrenItem.title}
                                        </a>
                                      </Link>
                                    ) : (
                                      ""
                                    )}
                                    {childrenItem.children ? (
                                      <ul
                                        className="sub-nav-sub"
                                        style={
                                          childrenItem.active
                                            ? { display: "block" }
                                            : { display: "none" }
                                        }
                                      >
                                        {childrenItem.children.map(
                                          (childrenSubItem, key) => (
                                            <li
                                              className={`nav-sub-item ${
                                                childrenSubItem.selected
                                                  ? " active"
                                                  : ""
                                              }`}
                                              key={key}
                                            >
                                              {childrenSubItem.type ===
                                              "link" ? (
                                                <Link
                                                  href={`${childrenSubItem.path}`}
                                                >
                                                  <a
                                                    className={`nav-sub-link ${
                                                      location.pathname ==
                                                      childrenSubItem.path
                                                        ? " active"
                                                        : ""
                                                    }`}
                                                  >
                                                    {childrenSubItem.title}
                                                  </a>
                                                </Link>
                                              ) : (
                                                ""
                                              )}

                                              {childrenSubItem.type ===
                                              "sub" ? (
                                                <Link href="#">
                                                  <a
                                                    onClick={(event) => {
                                                      event.preventDefault();
                                                      toggleSidemenu(
                                                        childrenSubItem
                                                      );
                                                    }}
                                                    className="nav-sub-item"
                                                  >
                                                    <span className="sidemenu-label">
                                                      {childrenSubItem.title}
                                                    </span>
                                                    {childrenSubItem.active ? (
                                                      <i className="fa fa-angle-down"></i>
                                                    ) : (
                                                      <i className="fa fa-angle-right"></i>
                                                    )}
                                                  </a>
                                                </Link>
                                              ) : (
                                                ""
                                              )}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : (
                                      ""
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            ""
                          )}
                        </li>
                      ))}
                    </Fragment>
                  ))}
                </ul>
                <div className="slide-right" id="slide-right">
                  <i className="fe fe-chevron-right"></i>
                </div>
              </div>
            </Scrollbars>
          </div>
        </div>
      </div>
      <div className="jumps-prevent" style={{ paddingTop: "64px" }}></div>
    </Fragment>
  );
}

export default SideBar;
