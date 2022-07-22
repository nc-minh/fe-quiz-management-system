import React, { useState, useEffect, memo } from "react";
import "./styles.scss";
import { Column, Bar } from "@ant-design/plots";
import { Input, InputNumber, Select, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { getAll } from "../../../../../../services/api/topics";
import { add } from "../../../../../../services/api/exams";
import Notification from "../../../../../../components/Notification";
import OptionsExam from "./OptionsExam";
import { getQuantityOfQuestions } from "../../../../../../services/api/questions";

const CreateNewExam = () => {
  const [topics, setTopics] = useState([]);
  const [email, setEmail] = useState("");
  const [time, setTime] = useState(60);
  const [quantityQuestion, setQuantityQuestion] = useState(10);
  const [level, setLevel] = useState(1);
  const [topicOfExam, setTopicOfExam] = useState(topics[0]);
  const [optionsExams, setOptionsExams] = useState([]);
  const [preview, setPreview] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [quantityOfQuestions, setQuantityOfQuestions] = useState([]);
  const levels = [1, 2, 3];
  const [total, setTotal] = useState(0);
  // Time of exam (minute)
  const MIN_TIME = 5;
  const MAX_TIME = 360;
  const DEFAULT_VALUE_OF_TIME = 60;
  const STEP_OF_TIME = 30;
  // Quantity of questions (number)
  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = 100;
  const DEFAULT_VALUE_OF_QUANTITY = 10;
  const STEP_OF_QUANTITY = 10;

  useEffect(() => {
    const getTopics = async () => {
      const { data, success } = await getAll({});
      if (!success) {
        Notification("error", "No data!");
      } else {
        setTopics(data.data);
      }
    };

    const getQuantityQuestionsAndTopics = async () => {
      const { data, success } = await getQuantityOfQuestions({});
      if (success) {
        setQuantityOfQuestions(data.data);
      } else {
        Notification("error", "Have an error!");
      }
    };

    getTopics();
    getQuantityQuestionsAndTopics();
  }, []);

  const { Option } = Select;
  const config = {
    data: quantityOfQuestions,
    isStack: true,
    xField: "quantity",
    yField: "name",
    seriesField: "level",
    label: {
      position: "middle", // 'top', 'bottom', 'middle'
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
    height: 700,
  };

  function handleChangeTopic(topicID) {
    setTopicOfExam(topicID);
    setTopicName(topics.find((topic) => topic._id === topicID).name);
  }

  function handleChangeLevelQuestion(level) {
    setLevel(level);
  }

  function onChangeQuantityQuestion(quantity) {
    setQuantityQuestion(quantity);
  }

  function AddOptionExam() {
    if (topicOfExam === undefined) {
      Notification("error", "You have to choose topic for option!");
    } else {
      setTotal((prev) => prev + quantityQuestion);
      setOptionsExams((prev) => {
        let quantityOptionDuplicete = 0;
        prev.map((p, index) => {
          if (p.topicID === topicOfExam && p.level === level) {
            setTotal(prev => prev - p.quantity)
            // quantityOptionDuplicete = p.quantity;
            prev.splice(index, 1);
          }
        })

        return [
          ...prev,
          {
            topicID: topicOfExam,
            level,
            quantity: quantityQuestion,
            topicName: topicName,
          },
        ];
      });
    }
  }

  const handleReceiveOptions = (arr, quantityDeleted) => {
    setOptionsExams(arr);
    setTotal((prev) => prev - quantityDeleted);
  };

  const handleGetEmail = (email) => {
    setEmail(email);
    if (email === "") {
      setPreview(false);
    } else {
      setPreview(true);
    }
  };

  const handleGetTime = (time) => {
    setTime(time);
  };
  async function handleCreateExam() {
    if (optionsExams.length === 0) {
      Notification("error", "Not options!");
    } else {
      const { data, success } = await add({
        email,
        duration: time,
        required: optionsExams.map((option) => ({
          topicID: option.topicID,
          level: option.level,
          quantity: option.quantity,
        })),
      });
      if (!success) {
        Notification(
          "error",
          "There was an error in the exam creation process!"
        );
      } else {
        Notification("success", "Create successfully!");
      }
    }
  }

  return (
    <div className="create-new">
      <h1 className="create-new__title">Create new exam</h1>
      <div className="create-new__topic-quantity">
        <h2 className="create-new__topic-quantity__title">
          Number of questions by topic
        </h2>
        <Bar {...config} />
      </div>

      <div className="create-new__exam">
        <h2 className="create-new__exam__title">Create a quiz by options</h2>
        <div className={clsx("preview", { none: !preview })}>
          <h3 className="preview-title">Preview</h3>
          <div className="preview-item preview__email">
            <b>Email:</b> {email}
          </div>
          <div className="preview-item preview__time">
            <b>Time take exam:</b> {time} <span>minute</span>
          </div>
          <div className="preview-item preview__options">
            <b className="preview__title">Options:</b>
            <OptionsExam
              handleReceiveOptions={handleReceiveOptions}
              optionsExams={optionsExams}
            />
          </div>
          <div className="preview-item preview__total">
            <b className="preview__title">Total questions:</b>
            <span>{total}</span>
          </div>
          <Button
            onClick={handleCreateExam}
            className="preview-done"
            type="primary"
          >
            Create
          </Button>
        </div>
        <div className="create-new__exam__wrapper">
          <Input
            value={email}
            className="create-new__exam__item"
            size="large"
            placeholder="Email of user take a exam"
            prefix={<UserOutlined />}
            onChange={(e) => handleGetEmail(e.target.value)}
          />
          <div className="create-new__exam__item create-new__exam__wrapper__timer">
            <span className="create-new__exam__wrapper__timer__text">
              Time:{" "}
            </span>
            <InputNumber
              min={MIN_TIME}
              max={MAX_TIME}
              step={STEP_OF_TIME}
              defaultValue={DEFAULT_VALUE_OF_TIME}
              onChange={(e) => handleGetTime(e)}
            />
          </div>

          <div className="create-new__exam__content">
            <h3 className="create-new__exam__content__name">
              Choose options of Exam
            </h3>
            <div className="create-new__exam__content__wrapper">
              <div className="create-new__exam__content__item">
                <span className="create-new__exam__content__label">
                  Topic:{" "}
                </span>
                <Select
                  defaultValue={""}
                  placeholder="Selec topic"
                  style={{ width: 120 }}
                  onChange={handleChangeTopic}
                >
                  {topics.length !== 0
                    ? topics.map((topic, index) => (
                        <Option
                          value={topic._id}
                          label={topic.name}
                          key={index}
                        >
                          {topic.name}
                        </Option>
                      ))
                    : "helo"}
                </Select>
              </div>
              <div className="create-new__exam__content__item">
                <span className="create-new__exam__content__label">
                  Level:{" "}
                </span>
                <Select
                  defaultValue={levels[0]}
                  placeholder="Selec level"
                  style={{ width: 120 }}
                  onChange={handleChangeLevelQuestion}
                >
                  {levels.map((level, index) => (
                    <Option value={level} label={level} key={index}>
                      {level}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="create-new__exam__content__item">
                <span className="create-new__exam__content__label">
                  Quantity:{" "}
                </span>
                <InputNumber
                  min={MIN_QUANTITY}
                  max={MAX_QUANTITY}
                  defaultValue={DEFAULT_VALUE_OF_QUANTITY}
                  step={STEP_OF_QUANTITY}
                  onChange={onChangeQuantityQuestion}
                />
              </div>
              <div className="create-new__exam__content__item">
                <Button onClick={AddOptionExam} type="primary">
                  ADD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CreateNewExam);
