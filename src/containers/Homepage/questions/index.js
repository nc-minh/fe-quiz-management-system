import React, { useState, useEffect, useContext } from "react";
import { Pagination } from "antd";

import "./questionsHome.scss";
import Question from "./question";
import AppContext from "../../App/AppContext";

function ListQuestion({ questions, examId }) {
  const limitQuestion = 6;
  const { questionNumber, setQuestionNumber } = useContext(AppContext);
  const pageNum = Math.ceil(questionNumber / limitQuestion);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setQuestionNumber(1);
  }, []);

  useEffect(() => {
    if (pageNum && pageNum !== pageNumber) {
      setPageNumber(pageNum);
    }
  }, [questionNumber]);

  const handleChangPage = (page) => {
    setPageNumber(page);
  };

  return (
    <div className={"listQuestion-container"}>
      {questions.map((question, index) => {
        const skip = (pageNumber - 1) * limitQuestion;
        if (index >= skip && index < skip + limitQuestion) {
          return (
            <Question
              question={question}
              index={index}
              examId={examId}
            />
          );
        }
        return <div />;
      })}
      <div className="listQuestion-pagination">
        <Pagination
          simple
          current={pageNumber}
          total={questions.length}
          defaultPageSize={limitQuestion}
          onChange={(page) => handleChangPage(page)}
        />
      </div>
    </div>
  );
}

export default React.memo(ListQuestion);
