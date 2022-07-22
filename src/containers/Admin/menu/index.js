import React, { memo, useLayoutEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./menuAdmin.scss";
import paths from "../../App/paths";
import { removeLocalStorage } from "../../../services/storage/LocalStorage";

function MenuAdmin() {
  let location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const [itemName, setItemName] = useState("Dashboard");
  const [classIcon, setClassIcon] = useState("fas fa-home");
  useLayoutEffect(() => {
    setPathname(location.pathname);
  }, [location]);
  const handleClickMenu = (namePath = pathname, nameItem = itemName, iconClass = classIcon) => {
    namePath !== pathname ? setPathname(namePath) : (namePath);
    nameItem !== itemName ? setItemName(nameItem) : (nameItem);
    iconClass !== classIcon ? setClassIcon(iconClass) : (iconClass);
    const header = document.getElementById("admin-menu");
    let isClose;
    header ? isClose = header.clientHeight === 50 : false;
    if (isClose) {
      header.style.height = "100%";
    } else {
      header.style.height = "50px";
    }
  };

  return (
    <div id="admin-menu" className="admin-navbar">
      <ul className="admin-navbar-menu">
        <div className="admin-menu-logo">
          <div className="admin-menu-img" />
        </div>

        <li className={"admin_active_mobile"}>
          <Link className="admin-menu-link" to={paths.AdminDash}>
            <i className={classIcon} />
            <span className="admin-menu-item">{itemName}</span>
          </Link>
        </li>

        <li
          className={
            pathname.includes("/admin/dashboard") ? "admin_active" : ""
          }
        >
          <Link
            className="admin-menu-link"
            to={paths.AdminDash}
            onClick={() =>
              handleClickMenu("/admin/dashboard", "Dashboard", "fas fa-home")
            }
          >
            <i className="fas fa-home" />
            <span className="admin-menu-item">Dashboard</span>
          </Link>
        </li>

        <li
          className={
            pathname.includes("/admin/questions") ? "admin_active" : ""
          }
        >
          <Link
            className="admin-menu-link"
            to={paths.AdminQuestion}
            onClick={() =>
              handleClickMenu(
                "/admin/questions",
                "Questions",
                "fas fa-question-circle"
              )
            }
          >
            <i className="fas fa-question-circle" />
            <span className="admin-menu-item">Questions</span>
          </Link>
        </li>

        <li className={pathname.includes("/admin/exam") ? "admin_active" : ""}>
          <Link
            className="admin-menu-link"
            to={`${paths.AdminExam}/index`}
            onClick={() =>
              handleClickMenu("/admin/exam", "Examinations", "fas fa-list-alt")
            }
          >
            <i className="fas fa-list-alt" />
            <span className="admin-menu-item">Examinations</span>
          </Link>
        </li>

        <li className={pathname.includes("/admin/users") ? "admin_active" : ""}>
          <Link
            className="admin-menu-link"
            to={paths.AdminUsers}
            onClick={() =>
              handleClickMenu("/admin/users", "Users", "fas fa-users")
            }
          >
            <i className="fas fa-users" />
            <span className="admin-menu-item">Users</span>
          </Link>
        </li>

        <li>
          <Link
            className="admin-menu-link"
            to="/exams"
          >
            <i class="fas fa-check-circle" />
            <span className="admin-menu-item">Testing</span>
          </Link>
        </li>

        <li className={pathname.includes("login") ? "admin_active" : ""}>
          <Link
            className="admin-menu-link"
            to={paths.Login}
            onClick={() => {
              setPathname("login");
              removeLocalStorage("user");
              removeLocalStorage("token_login");
            }}
          >
            <i className="fas fa-sign-out-alt" />
            <span className="admin-menu-item">Sign out</span>
          </Link>
        </li>
      </ul>

      <div
        className="admin-menu-icon"
        onClick={() => handleClickMenu()}
        aria-hidden
      >
        <MenuOutlined className="admin-menu-icon-btn" />
      </div>
    </div>
  );
}

export default memo(MenuAdmin);
