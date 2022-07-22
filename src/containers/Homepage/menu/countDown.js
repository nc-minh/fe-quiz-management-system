import React from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import Notification from "../../../components/Notification";

function CountDown({ time }) {
  const navigate = useNavigate();
  const finish = () => {
    Notification("success", "Bạn đã hoàn thành bài thi!");
    navigate("../exams");
  };
  return (
    <p>
      <Countdown date={Date.now() + time} onComplete={finish} />
    </p>
  );
}

export default React.memo(CountDown);
