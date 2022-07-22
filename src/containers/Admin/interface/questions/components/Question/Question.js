import React, { memo, useState, useEffect } from "react";
import { Radio, Button, Input, Select, Popconfirm, message } from "antd";
import { add } from "../../../../../../services/api/answers";
import "./question.scss";
import Notification from "../../../../../../components/Notification";
import { DeleteOutlined } from "@ant-design/icons";

const Question = ({
  question,
  answersOfQuestion,
  resultOfQuestion,
  levelOfQuestion,
  handleReceiveNewAnswer,
  handleReceiveNewLevel,
  handleReceiveNewResult,
  handleDeleteAnswer,
  onUpdateDataOfQuestion,
}) => {
  const { Option } = Select;
  const [answers, setAnswers] = useState(answersOfQuestion);
  const [newResult, setnewResult] = useState(resultOfQuestion);
  const [newResultName, setNewResultName] = useState("");
  const [value, setValue] = useState(() =>
    resultOfQuestion ? resultOfQuestion : "Not anwer"
  );
  const [newAnswer, setNewAnswer] = useState();
  const [newLevel, setNewLevel] = useState(levelOfQuestion);
  const [isUpdated, setIsUpdated] = useState(true);
  const [showExitPrompt, setShowExitPrompt] = useState(false);

  const initBeforeUnLoad = (showExitPrompt) => {
    window.onbeforeunload = (event) => {
      // Show prompt based on state
      if (showExitPrompt) {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
          e.returnValue = "";
        }
        return "";
      }
    };
  };

  window.onload = function () {
    initBeforeUnLoad(showExitPrompt);
  };

  // Re-Initialize the onbeforeunload event listener
  useEffect(() => {
    initBeforeUnLoad(showExitPrompt);
  }, [showExitPrompt]);

  const onChangeNewResult = (value) => {
    setIsUpdated(false);
    setNewResultName(answersOfQuestion.find((an) => an._id === value).content);
    setnewResult(value);
  };

  function onChangeLevel(level) {
    setIsUpdated(false);
    setNewLevel(level);
  }

  const onUpdateAnswersOfQuestion = async () => {
    const { data, success } = await add({
      answer: {
        content: newAnswer,
      },
    });

    if (success) {
      setShowExitPrompt(true);
      handleReceiveNewAnswer(data.data);
      setIsUpdated(false);
    } else {
      Notification("error", "Add was an error!");
    }
  };

  const getNewAnswer = (value) => {
    setNewAnswer(value);
  };

  const handleSendAnswerIdToDelete = (answerID) => {
    if (isUpdated) {
      handleDeleteAnswer(answerID);
      message.success("Click on Yes");
    } else {
      Notification(
        "error",
        "You should update answers to question before delete it!"
      );
    }
  };

  const onUpdateQuestion = async () => {
    handleReceiveNewLevel(newLevel || levelOfQuestion);
    handleReceiveNewResult(newResultName);
    const check = await onUpdateDataOfQuestion(true, {
      newResult,
      newLevel: Number(newLevel),
    });
    if (check) {
      setIsUpdated(true);
      setShowExitPrompt(false);
      Notification("success", "Update successfully!");
    } else {
      Notification("error", "Update failure!");
    }
  };
  return (
    <div className="question__container">
      <h3>You can change everything to update</h3>
      <div className="question__level">
        <span>Level: </span>
        {levelOfQuestion}
        {" =>> "}
        <Select
          defaultValue={levelOfQuestion}
          style={{ width: 120 }}
          onChange={onChangeLevel}
        >
          <Option value="1">Level 1</Option>
          <Option value="2">Level 2</Option>
          <Option value="3">Level 3</Option>
        </Select>
      </div>
      <Radio.Group
        className="question__wrapper"
        onChange={(e) => onChangeNewResult(e.target.value)}
        value={newResult}
      >
        {answersOfQuestion
          ? answersOfQuestion.map((answer, index) => (
              <div key={index} className="question__wrapper__item">
                <Radio className="question__item" value={answer._id}>
                  {answer.content}
                </Radio>

                <Popconfirm
                  title="Are you sure to delete this answer?"
                  onConfirm={() => handleSendAnswerIdToDelete(answer._id)}
                  onCancel={() => message.error("Click on No")}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined className="question__wrapper__icon" />
                </Popconfirm>
              </div>
            ))
          : "Not answers"}
      </Radio.Group>
      <div className="question__container__result">
        <label>Result:</label>
        <strong>
          {newResultName || resultOfQuestion || "Not result, pls select one!"}
        </strong>
      </div>
      <div className="question__container--add">
        <Input
          value={newAnswer}
          onChange={(e) => getNewAnswer(e.target.value)}
          placeholder="Add more answer"
        />
        <Button
          onClick={onUpdateAnswersOfQuestion}
          className="question__container__btn"
          type="primary"
        >
          Add
        </Button>
      </div>
      <Button onClick={onUpdateQuestion} type="primary">
        Update
      </Button>
    </div>
  );
};

export default memo(Question);
