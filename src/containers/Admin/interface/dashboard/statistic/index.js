import React, { useCallback, memo, useState, useEffect } from "react";
import "./statisticDash.scss";
import { countUsers } from "../../../../../services/api/users";
import { countExams } from "../../../../../services/api/exams";
import { countQuestions } from "../../../../../services/api/questions";
import { countTopics } from "../../../../../services/api/topics";

function StatisticDash() {
  const [usersQuantity, setUsersQuantity] = useState();
  const [examsQuantity, setExamsQuantity] = useState();
  const [questionsQuantity, setQuestionsQuantity] = useState();
  const [topicsQuantity, setTopicsQuantity] = useState();

  const getUsersQuantity = async () => {
    const { data, success } = await countUsers({});
    if (success) {
      setUsersQuantity(data.data);
    } else {
      setUsersQuantity(0);
    }
  };

  const getExamsQuantity = async () => {
    const { data, success } = await countExams({});
    if (success) {
      setExamsQuantity(data.data);
    } else {
      setExamsQuantity(0);
    }
  };

  const getQuestionsQuantity = async () => {
    const { data, success } = await countQuestions({});
    if (success) {
      setQuestionsQuantity(data.data);
    } else {
      setQuestionsQuantity(0);
    }
  };

  const getTopicsQuantity = async () => {
    const { data, success } = await countTopics({});
    if (success) {
      setTopicsQuantity(data.data);
    } else {
      setTopicsQuantity(0);
    }
  };

  useEffect(() => {
    getUsersQuantity();
    getExamsQuantity();
    getQuestionsQuantity();
    getTopicsQuantity();
  }, []);
  const arrayInfo = [
    {
      number: usersQuantity,
      name: "Users",
      classIcon: "fas fa-users",
    },
    {
      number: examsQuantity,
      name: "Examinations",
      classIcon: "fab fa-product-hunt",
    },
    {
      number: questionsQuantity,
      name: "Questions",
      classIcon: "far fa-question-circle",
    },
    {
      number: topicsQuantity,
      name: "Topic",
      classIcon: "fas fa-eye",
    },
  ];

  const renderViewer = useCallback(() =>
    arrayInfo.map((item, index) => (
      <div key={index} className="statistic-quantity-group">
        <div className="statistic-quantity-title">
          <div className="statistic-title-number">{item.number}</div>
          <div className="statistic-title-name">{item.name}</div>
        </div>
        <div className="statistic-quantity-icon">
          <i className={item.classIcon} />
        </div>
      </div>
    ))
  );

  return (
    <div className="statistic-container">
      <div className="statistic-container-quantity">{renderViewer()}</div>
    </div>
  );
}

export default memo(StatisticDash);
