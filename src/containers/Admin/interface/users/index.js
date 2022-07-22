import React, { useEffect, useState, useRef, memo } from "react";
import { Table, Space, Tooltip } from "antd";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { Modal, Button } from "antd";

import "./userAdmin.scss";
import { get, remove, add, update } from "../../../../services/api/users";
import Notification from "../../../../components/Notification";
import { getLocalStorage } from "../../../../services/storage/LocalStorage";
import EditUser from "./EditUser";

function Users() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [idModal, setIdModal] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    role: "ADMIN",
  });
  const [action, setAction] = useState("");

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    const token_login = getLocalStorage("token_login");
    const headers = {
      token_login,
    };
    const { data, success } = await get(headers);
    if (success && data.data) {
      const users = data.data.map((user) => ({
        key: user._id,
        id: user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.slice(0, 10),
      }));
      setAllUsers(users);
      setUserData(users);
    }
  };
  function handleChange(event) {
    const users = allUsers.filter(
      (user) =>
        user.email.includes(event.target.value) ||
        user.role.includes(event.target.value)
    );
    setUserData(users);
  }

  const onSearch = (e) => {
    e.preventDefault();
  };

  const handleRemove = async (id, user) => {
    const { confirm } = Modal;
    confirm({
      title: "Do you Want to delete this user?",
      content: "Click ok to confirm",
      async onOk() {
        const { data, success } = await remove(id);
        if (success) {
          setUserData(userData.filter((user) => user.id !== id));
          setAllUsers(allUsers.filter((user) => user.id !== id));
        }
      },
      onCancel() {
      },
    });
  };

  const { Column } = Table;

  const showModal = (action, id) => {
    setAction(action);
    id && setIdModal(id);
    setIsModalVisible(true);
  };

  const handleEditOk = async () => {
    const { data, success } = await update(idModal, userInfo);
    if (!success || !data.data) {
      Notification("error", "Edit unsuccesfully!");
    } else {
      setAllUsers(
        allUsers.map((user) => {
          if (user.id !== idModal) return user;
          else
            return {
              ...user,
              email: userInfo.email,
              role: userInfo.role,
            };
        })
      );
      setUserData(
        userData.map((user) => {
          if (user.id !== idModal) return user;
          else
            return {
              ...user,
              email: userInfo.email,
              role: userInfo.role,
            };
        })
      );
    }
    setIsModalVisible(false);
  };

  const handleCreateOk = async () => {
    const { data, success } = await add(userInfo);
    if (!success || !data.data) {
      Notification("error", "This email is existed!");
    } else {
      const newUser = {
        key: data.data_id,
        id: data.data._id,
        email: data.data.email,
        role: data.data.role,
        createdAt: data.data.createdAt.slice(0, 10),
      };
      setAllUsers([...allUsers, newUser]);
      setUserData([...userData, newUser]);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalChange = (updateUserInfo) => {
    setUserInfo({
      ...userInfo,
      ...updateUserInfo,
    });
  };

  return (
    <div className={"userAdmin__base"}>
      <div className={"userAdmin__header"}>
        <form
          className="form-inline userAdmin__header--search"
          onSubmit={(e) => onSearch(e)}
          onChange={(key) => handleChange(key)}
        >
          <input
            className="userAdmin__header--search-input"
            type="search"
            placeholder="Nhập tên, email"
            aria-label="Search"
          />
        </form>
        <button
          className="userAdmin__header--search-btn"
          onClick={() => showModal("Create")}
        >
          Add new user
        </button>
      </div>

      <div className={"userAdmin__container"}>
        <Table dataSource={userData} className="userAdmin-table-mobile">
          <Column
            title="Email"
            dataIndex="email"
            key="email"
            className="userAdmin-table-mobile"
          />
          <Column
            title="Role"
            dataIndex="role"
            key="role"
            className="userAdmin-table-mobile"
          />
          <Column
            title="Created At"
            dataIndex="createdAt"
            key="createdAt"
            className="userAdmin-table-mobile"
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <Tooltip title={"Delete user"} placement={"left"}>
                  <span
                    className="post-action-btn"
                    onClick={() => {
                      handleRemove(record.id, record);
                    }}
                  >
                    <DeleteOutlined
                      style={{
                        color: "red",
                        fontSize: "14px",
                        marginBottom: "6px",
                      }}
                    />
                  </span>
                </Tooltip>
                <Tooltip title={"Edit user"} placement={"right"}>
                  <span
                    className="post-action-btn"
                    onClick={() => showModal("Edit", record.id)}
                  >
                    <EditFilled
                      style={{
                        color: "blue",
                        fontSize: "14px",
                        marginBottom: "6px",
                      }}
                    />
                  </span>
                </Tooltip>
              </Space>
            )}
            className="userAdmin-table-mobile"
          />
        </Table>
      </div>

      <Modal
        title={`${action} user`}
        visible={isModalVisible}
        onOk={() => {
          if (action === "Edit") handleEditOk();
          else handleCreateOk();
        }}
        onCancel={handleCancel}
      >
        <EditUser handleChange={handleModalChange} action={true} />
      </Modal>
    </div>
  );
}

export default memo(Users);
