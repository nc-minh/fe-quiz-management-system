import React, { memo } from "react";
import { Input } from "antd";

const ChangeTopicName = ({ handleReceiveNewTopic }) => {
  const handleChangeTopicName = (value) => {
    handleReceiveNewTopic(value);
  };
  return (
    <div>
      <Input
        placeholder="Typing new topic name..."
        onChange={(e) => handleChangeTopicName(e.target.value)}
      />
    </div>
  );
};

export default memo(ChangeTopicName);
