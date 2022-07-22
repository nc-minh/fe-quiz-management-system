import React, { useContext, useEffect } from "react";
import { Button, Modal } from "antd";

import "./menuHome.scss";
import AppContext from "../../App/AppContext";
import CountDown from "./countDown";
import { finish } from "../../../services/api/userExams";
import Notification from "../../../components/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { getAnsweredQuestions } from "../../../services/api/userExams";

function Menu({ time, questions, exam }) {
  const { setQuestionNumber } = useContext(AppContext);
  const { answeredQuestions, setAnsweredQuestions } = useContext(AppContext);
  const setTime = time - Date.now();
  const navigate = useNavigate();
  const params = useParams();

  const handleClickCard = (questionNumber) => {
    setQuestionNumber(questionNumber);
    //setLocalStorage("questionNumber", questionNumber);
  };

  const handleFinishExam = async () => {
    const { confirm } = Modal;
    confirm({
      title: "Are you sure to submit your exam?",
      content: "After you submit, this exam cannot be continued!",
      async onOk() {
        const { data, success } = await finish(params.id);
        if (success) {
          Notification("success", "Nộp bài thành công!");
          navigate("../exams");
        }
      },
    });
    
  };

  useEffect(async () => {
    const { data, success } = await getAnsweredQuestions(params.id);
    if (success) {
      setAnsweredQuestions(data.data);
    }
  }, []);

  return (
    <div className="menu-page">
      <div className="menu-page-container">
        <div className="menu-container-info">
          Email:
          <p>{exam.email}</p>
        </div>

        <div className="menu-container-time">
          Thời gian làm bài:
          <CountDown time={setTime} />
        </div>

        <div className="menu-container-info">Câu hỏi:</div>
        <div className="menu-container-card">
          {questions.map((item, index) => {
            return (
              <a
                href={`#${index + 1}`}
                key={index}
                onClick={() => handleClickCard(index + 1)}
                className={
                  answeredQuestions && answeredQuestions.includes(item._id)
                    ? "menu-card-box card-completed"
                    : "menu-card-box"
                }
              >
                {index + 1}
              </a>
            );
          })}
        </div>

        <div className="menu-container-submit">
          <Button
            type="primary"
            className={"menu-submit-btn"}
            onClick={handleFinishExam}
          >
            NỘP BÀI
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
