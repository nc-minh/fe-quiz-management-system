import React, { useEffect, useState, memo } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../../../../../../services/api/exams";
import Notification from "../../../../../../components/Notification";
import QuestionExam from "../QuestionExam";
import "./ExamDetail.scss";

const FINISHED = "Finished";
const IN_PROCESS = "In process";
const NOT_STARTED = `Not started`;

const ExamDetail = (props) => {
  const params = useParams();
  const [exam, setExam] = useState();
  const [onChange, setOnChange] = useState(false);
  const [status, setStatus] = useState();

  const getExam = async () => {
    const { data, success } = await getOne(params.id);
    const exam = data.data;
    if (!success || !exam) {
      Notification("error", "No data!");
    } else {
      setExam(exam);
      let status;
      if (exam.startAt === null) status = NOT_STARTED;
      if (
        exam.startAt !== null &&
        new Date(exam.endAt).getTime() > new Date().getTime()
      )
        status = IN_PROCESS;
      if (
        exam.startAt !== null &&
        new Date(exam.endAt).getTime() <= new Date().getTime()
      )
        status = FINISHED;
      setStatus(status);
    }
  };

  useEffect(async () => {
    setOnChange(true);
    await getExam();
  }, [onChange]);
  return (
    <div className="exam-detail">
      {exam && (
        <div className="header">
          <h2 className="email">{`Email: ${exam.email}`}</h2>
          <h2 className="number">{`Number of questions: ${exam.questions.length}`}</h2>
          <h2 className="status">{`Status: ${status}`}</h2>
          <h2 className="score">{`Score: ${exam.score}`}</h2>
        </div>
      )}
      {exam &&
        exam.questions.map((question, index) => (
          <div>
            <QuestionExam
              question={question}
              userAnswer={question ? question.userAnswer : null}
              result={question.result}
              number={index}
              key={index}
            />
          </div>
        ))}
    </div>
  );
};

export default memo(ExamDetail);
