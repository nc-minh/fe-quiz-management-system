import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Radio, Select, message, Popconfirm } from "antd";
import "./styles.scss";
import clsx from "clsx";
import { DeleteOutlined } from "@ant-design/icons";
import NewAnswer from "./NewAnswer";
import { getOne } from "../../../../../../services/api/topics";
import { add } from "../../../../../../services/api/questions";
import { removeAnswer } from "../../../../../../services/api/answers";
import Notification from "../../../../../../components/Notification";

function AddQuestion() {
  const params = useParams();
  const navigate = useNavigate();
  const topicName = params.topic;
  const [content, setContent] = useState("");
  const [answers, setAnswers] = useState([]);
  const [answersID, setAnswersID] = useState([]);
  const [topicID, setTopicID] = useState("");
  const [result, setResult] = useState(0);
  const [level, setLevel] = useState(1);
  const title = `Add a new question for topic ${topicName}`;
  const { Option } = Select;

  const handleTyping = (e) => {
    setContent(e);
  };

  const preview = content !== "";

  const handleReceiveAnswer = (answerReceive) => {
    setAnswers((prev) => [...prev, answerReceive]);
    setAnswersID((prev) => [...prev, answerReceive.id]);
  };

  useEffect(() => {
    const getTopicID = async () => {
      const { data, success } = await getOne(topicName);
      if (success) {
        setTopicID(data.data._id);
      } else {
        navigate("../../questions");
        Notification("error", "Wrong path!");
      }
    };

    getTopicID();
  }, []);

  const createQuestion = () => {
    if (preview && answersID.length >= 2) {
      const createQuestionToServer = async () => {
        const { data, success } = await add({
          question: {
            question: content,
            topic: topicID,
            answers: answersID,
            result: answersID[result],
            level,
          },
        });
        if (success) {
          message.success("Created a question successfully!");
          navigate(`../../questions/${topicName}`);
        } else {
          Notification("error", "Have an error!");
        }
      };
      createQuestionToServer();
    } else {
      Notification(
        "error",
        "Require question title and answers more than two!"
      );
    }
  };

  const changeResult = (e) => {
    setResult(e.target.value);
  };

  const changeLevel = (value) => {
    setLevel(Number(value));
  };

  const handleDeleteAnswer = async (answerIDToDelete) => {
    const { data, success } = await removeAnswer(answerIDToDelete);
    if (success) {
      const answersAfterDelete = answers.filter((answer) => answer.id !== answerIDToDelete);
      setAnswers(answersAfterDelete);
      message.success("Delete a question successfully!");
    } else {
      message.error("Delete a question failure!");
    }
  };
  return (
    <div className="add-question">
      <h1 className="add-question__title">{title}</h1>
      <div className={clsx({ none: !preview }, "preview")}>
        <h3 className="preview__name">{content}</h3>
        <div className="preview__level">
          <span className="preview__level__text">Level: </span>
          <Select
            defaultValue="1"
            style={{ width: 120 }}
            onChange={changeLevel}
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        </div>
        <Radio.Group
          className="preview__wrapper"
          onChange={changeResult}
          value={result}
        >
          {answers.map((answer, index) => (
            <div key={index} className="preview__answers">
              <Radio
                className="preview__item preview__answers__item preview__answers__radio"
                value={index}
              >
                {answer.answer}
              </Radio>
              <Popconfirm
                title="Are you sure to delete this answer?"
                onConfirm={() => handleDeleteAnswer(answer.id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined className="preview__answers__icon preview__answers__item" />
              </Popconfirm>
            </div>
          ))}
        </Radio.Group>
      </div>
      <div className="form">
        <Input
          className="form__name"
          value={content}
          onChange={(e) => handleTyping(e.target.value)}
          placeholder="Question name..."
        />
        <NewAnswer handleReceiveAnswer={handleReceiveAnswer} />
        <Button onClick={createQuestion} type="primary">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default memo(AddQuestion);
