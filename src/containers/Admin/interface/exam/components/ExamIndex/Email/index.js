import React, { useRef, memo } from "react";
import ContentEditable from "react-contenteditable";
import "./Email.scss";
import { Modal } from "antd";
import { update } from "../../../../../../../services/api/exams";
import Notification from "../../../../../../../components/Notification";

const Email = (props) => {
  const text = useRef("");
  let exam = props.exam;
  text.current = exam.email;
  const showConfirm = () => {
    const { confirm } = Modal;
    confirm({
      title: "Do you want to change this email?",
      content: "After your changing, this email can't be restored!",
      async onOk() {
        const body = {
          exam: {
            ...exam,
            email: text.current,
          },
        };
        const { data, success } = await update(exam._id, body);
        if (!success) {
          Notification("error", "Can't change email");
        } else {
          exam = body.exam;
        }
      },
      onCancel() {
        props.reRender();
      },
    });
  };

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  const handleBlur = () => {
    if (text.current !== exam.email) {
      showConfirm();
    }
  };

  //   useEffect(() => {

  //   }, [email]);

  return (
    <div className="email">
      <ContentEditable
        className="content-editable"
        html={text.current}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default memo(Email);
