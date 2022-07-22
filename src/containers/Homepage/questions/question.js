import React, { useContext, useEffect, useState } from "react";
import { Radio, Space } from "antd";

import "./questionsHome.scss";
import questions from ".";
import { getOne, add, update } from "../../../services/api/userAnswers";
import Notification from "../../../components/Notification";
import { useParams } from "react-router-dom";
import AppContext from "../../App/AppContext";

function Question({ question, index, examId }) {
  const [value, setValue] = useState();
  const [userAnswer, setUserAnswer] = useState({});
  const params = useParams();
  const { answeredQuestions, setAnsweredQuestions } = useContext(AppContext);

  useEffect(async () => {
    const info = {
      exam: params.id,
      question: question._id,
    };
    const { data, success } = await getOne(info);
    setUserAnswer(data.data);
    setValue(data.data.answer);
  }, []);

  const onChange = async (e) => {
    setValue(e.target.value);
    if (!userAnswer.answer) {
      setAnsweredQuestions([...answeredQuestions, question._id]);
      const { data, success } = await add({
        userAnswer: {
          exam: params.id,
          question: question._id,
          answer: e.target.value,
        },
      });
      if (!success) Notification("error", "Có lỗi gì đó!");
      else {
        setUserAnswer(data.data);
      }
    } else {
      const { data, success } = await update(userAnswer._id, {
        userAnswer: {
          exam: params.id,
          question: question._id,
          answer: e.target.value,
        },
      });
      if (!success) Notification("error", "Có lỗi gì đó!");
      else
        setUserAnswer({
          ...data.data,
          answer: e.target.value,
        });
    }
  };

  return (
    <div className="question-container" id={index + 1}>
      <div className="question-number">
        <span>{index + 1}</span>
      </div>
      <Radio.Group onChange={onChange} value={value}>
        <div className="question-title">{question.question}</div>
        <Space direction="vertical" className="question-answer">
          {question.answers.map((an) => (
            <Radio value={an._id}>
              {`${String.fromCharCode(65 + question.answers.indexOf(an))}. `}{" "}
              {an.content}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
}

export default Question;
