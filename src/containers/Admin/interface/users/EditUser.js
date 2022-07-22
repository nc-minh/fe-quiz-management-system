import React, { memo, useState } from "react";
import { Input, Select } from "antd";
import "./editUser.scss";

const EditUser = (props, { action }) => {
  const handleChange = props.handleChange;

  const handleRoleChange = (value) => {
    handleChange({
      role: value,
    });
  };
  const handleEmailChange = (event) => {
    handleChange({
      email: event.target.value,
    });
  };

  return (
    <div className="edit-user">
      <div className="edit-user__item">
        <lable className="edit-user__item__lable">Email :</lable>
        <Input
          placeholder="Typing new email..."
          onChange={handleEmailChange}
          defaultValue={action ? "" : ""}
        />
      </div>
      <div className="edit-user__item">
        <lable className="edit-user__item__lable">Role :</lable>
        <Select
          defaultValue="ADMIN"
          style={{ width: `100%` }}
          onChange={handleRoleChange}
        >
          <Option value="ADMIN">ADMIN</Option>
          <Option value="USER">USER</Option>
        </Select>
      </div>
    </div>
  );
};

export default memo(EditUser);
