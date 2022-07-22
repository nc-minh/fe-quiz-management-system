import React, { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import "./homepage.scss";
import ListQuestion from "./questions";
import Menu from "./menu";
import { getOne, start } from "../../services/api/userExams";

function Homepage() {
  const { id } = useParams();
  const [endTime, setEndTime] = useState();
  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState({});
  const [clickMenu, setClickMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    checkStartTime();
  }, []);

  const checkStartTime = async () => {
    const { data, success } = await getOne(id);
    if (success && data) {
      if (!data.data.startAt) {
        handleStart();
      } else {
        setEndTime(new Date(data.data.endAt).getTime());
        setQuestions(data.data.questions);
        setExam(data.data);
      }
    } else {
      navigate("../exams");
    }
  };

  const handleStart = async () => {
    const { data, success } = await start(id);
    if (success && data.data) {
      setEndTime(new Date(data.data.endAt).getTime());
      checkStartTime();
    }
  };

  const handleClickMenu = () => {
    const menu = document.getElementById("exam-menu");
    if (clickMenu) {
      menu.style.display = "none";
      setClickMenu(false);
    } else {
      menu.style.display = "block";
      setClickMenu(true);
    }
  }

  return (
    <div className="homepage-container">
      <div className="homepage-container-box">
        <div className="homepage-box-exam">
          {questions[0] ? (
            <ListQuestion questions={questions} examId={exam.id} />
          ) : (
            <div />
          )}
        </div>
      </div>

      <div
        className="homepage-container-icon"
        onClick={() => handleClickMenu()}
        aria-hidden
      >
        <MenuOutlined className="homepage-container-icon-btn" />
      </div>

      <div id="exam-menu" className="homepage-container-menu">
        {endTime ? (
          <Menu
            time={endTime}
            questions={questions}
            exam={exam}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default React.memo(Homepage);
