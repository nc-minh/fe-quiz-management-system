import React, { memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Input } from "antd";
import {
  getOne,
  remove,
  update,
} from "../../../../../../services/api/questions";
import { removeAnswer } from "../../../../../../services/api/answers";
import "./styles.scss";
import Question from "./Question";
import Notification from "../../../../../../components/Notification";

function QuestionItem() {
  const params = useParams();
  const [question, setQuestion] = useState([]);
  const [answersOfQuestion, setAnswersOfQuestion] = useState([]);
  const [resultOfQuestion, setResultOfQuestion] = useState([]);
  const [levelOfQuestion, setLevelOfQuestion] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [questionName, setQuestionName] = useState("");
  const [newQuestionName, setNewQuestionName] = useState(undefined);
  const navigate = useNavigate();


  const getQuestionById = async () => {
    const { id } = params;
    const { data, success } = await getOne(id);
    if (!success) {
      Notification("error", "Get data was failure!");
    } else {
      setQuestion(data.data);
      setAnswersOfQuestion(data.data.answers);
      setResultOfQuestion(data.data.result ? data.data.result.content : null);
      setLevelOfQuestion(data.data.level);
      setQuestionName(data.data.question);
    }
  };

  useEffect(() => {
    getQuestionById();
  }, []);

  function showConfirmDelete() {
    const { confirm } = Modal;
    confirm({
      title: "Do you Want to delete these items?",
      content:
        "Nếu bạn đồng ý xóa Cau này thi se khong khoi phuc duoc dau nha!",
      async onOk() {
        const { data, success } = await remove(question._id);
        if (success) {
          navigate("../../questions");
        }
      },
      onCancel() {
      },
    });
  }

  const handleReceiveNewAnswer = (newAnswerReceive) => {
    setAnswersOfQuestion((prev) => [...prev, newAnswerReceive]);
  };

  const handleReceiveNewLevel = (newLevelReceive) => {
    setLevelOfQuestion(newLevelReceive);
  };

  const handleReceiveNewResult = (newResultReceive) => {
    setResultOfQuestion((prev) => newResultReceive || prev);
  };

  const handleDeleteAnswer = async (answerID) => {
    const { data, success } = await removeAnswer(answerID);
    if (success) {
      getQuestionById();
    } else {
    }
  };

  const onUpdateDataOfQuestion = async (status, data) => {
    const newData = data;
    let result;
    if (newData.newResult.length === 0) {
      result = question.result;
    } else {
      result = newData.newResult;
    }
    if (status) {
      const { data, success } = await update(question._id, {
        question: {
          question: question.question,
          topic: question.topic,
          answers: answersOfQuestion,
          result,
          level: newData.newLevel || question.level,
        },
      });
      if (success) {
        setQuestion(data.data);
        return true;
      } else {
        return false;
      }
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    const { data, success } = await update(question._id, {
      question: {
        question: newQuestionName || questionName,
      },
    });

    if (success) {
      setQuestionName(newQuestionName || questionName);
      Notification("success", "Update successfully!");
    } else {
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewQuestionName(questionName);
  };

  const handleTypeNewName = (newName) => {
    // setQuestionName(newName);
    setNewQuestionName(newName);
  };

  return (
    <div className="question">
      <header className="question__header">
        <h1 className="question__name">
          <span className="question__name__text">{questionName}</span>
        </h1>
        <div className="question__header__menu">
          <div className="question__header__item" onClick={showModal}>
            <EditOutlined style={{ fontSize: "2rem" }} />
          </div>
          <div className="question__header__item" onClick={showConfirmDelete}>
            <DeleteOutlined style={{ fontSize: "2rem" }} />
          </div>
        </div>
      </header>

      <Question
        question={question}
        answersOfQuestion={answersOfQuestion}
        resultOfQuestion={resultOfQuestion}
        levelOfQuestion={levelOfQuestion}
        handleReceiveNewAnswer={handleReceiveNewAnswer}
        handleReceiveNewLevel={handleReceiveNewLevel}
        handleReceiveNewResult={handleReceiveNewResult}
        handleDeleteAnswer={handleDeleteAnswer}
        onUpdateDataOfQuestion={onUpdateDataOfQuestion}
      />
      <Modal
        title="Edit question name"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          onChange={(e) => handleTypeNewName(e.target.value)}
          value={newQuestionName || questionName}
          placeholder="New question name..."
        />
      </Modal>
    </div>
  );
}

export default memo(QuestionItem);
