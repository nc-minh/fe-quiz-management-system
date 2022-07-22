import React, { memo } from "react";
import { Modal } from "antd";
import Notification from "../../../../../../../components/Notification";
import { remove } from "../../../../../../../services/api/exams";

const DeleteButton = (props) => {

  const showConfirm = () => {
    const { confirm } = Modal;
    const id = props.id;
    confirm({
      title: "Do you want to delete these exam?",
      content: "After your deleting, this exam can't be restored!",
      async onOk() {
        const { data, success } = await remove(id);
        if (!success) {
          Notification("error", "Can't delete");
        } else {
          props.reRender();
        }
      },
    });
  };
  return <a onClick={showConfirm}>Delete</a>;
};

export default memo(DeleteButton);
