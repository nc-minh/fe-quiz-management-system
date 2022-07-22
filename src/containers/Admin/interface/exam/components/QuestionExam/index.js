import React, { memo } from "react";
import "./QuestionExam.scss";
import clsx from "clsx";

const QuestionExam = (props) => {
  const question = props.question;
  const userAnswer = props.userAnswer;
  const result = props.result;
  const number = props.number
  return (
    <div>
      <h3>
        Question{` ${number + 1}: `}
        {question.question}
      </h3>
      <h4>(Level: {` ${question.level})`}</h4>
      <ul className={clsx("answers", { not_answers: userAnswer === undefined })}>
        {question.answers.map((answer, index) => (
          <li
            className={clsx(
              "answers__item",
              {
                answers__incorrect: answer._id === userAnswer,
              },
              {
                answers__correct: answer._id === result,
              }
            )}
            key={index}
          >
            {answer.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(QuestionExam);
