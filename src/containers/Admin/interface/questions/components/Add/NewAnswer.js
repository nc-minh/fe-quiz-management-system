
import React, { memo, useState } from 'react';
import { Input, Button } from 'antd';
import './newAnwerStyle.scss';
import { add } from '../../../../../../services/api/answers';
import Notification from '../../../../../../components/Notification';

function NewAnswer({ handleReceiveAnswer }) {
  const [answer, setAnswer] = useState("");
  const handleTypingName = (e) => {
    setAnswer(e);
  };

  const handleSendAnswerToParent = async () => {
    if (answer=== "") {
      Notification("error", "The answer cannot be missing!");
    } else {
      const { data, success } = await add({
        answer: {
          content: answer,
        },
      });
      if (success) {
        handleReceiveAnswer({
          answer,
          id: data.data._id,
        });
      } else {
        Notification("error", "Add error!");
      }
      setAnswer("");
    }
  };
  return (
    <div className="new-answer">
      <Input
        value={answer}
        className="new-answer__input"
        onChange={(e) => handleTypingName(e.target.value)}
        placeholder="Answer..."
      />
      <Button onClick={handleSendAnswerToParent} type="primary">
        Add
      </Button>
    </div>
  );
}

export default memo(NewAnswer);
