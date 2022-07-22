import React, { memo } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import "./preview.scss";

const OptionsExam = ({ optionsExams, handleReceiveOptions }) => {
  function handleDeleteOptionsExam(index) {
    const arr = [...optionsExams];
    arr.splice(index, 1);
    const quantityDeleted = optionsExams[index].quantity;
    handleReceiveOptions(arr, quantityDeleted);
  }

  return (
    <div className="preview__wapper">
      {optionsExams.length !== 0
        ? optionsExams.map((option, index) => (
            <div key={index} className="preview__topic">
              <div className="preview__topic-item">
                <span>Topic: </span>
                <b>{option.topicName}</b>
              </div>
              <div className="preview__topic-item">
                <span>Level: </span>
                <b>{option.level}</b>
              </div>
              <div className="preview__topic-item">
                <span>Quantity: </span>
                <b>{option.quantity}</b>
              </div>
              <b
                onClick={() => handleDeleteOptionsExam(index)}
                className="preview__delete-item"
              >
                <DeleteOutlined />
              </b>
            </div>
          ))
        : ""}
    </div>
  );
};

export default memo(OptionsExam);
