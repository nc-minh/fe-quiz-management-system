import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd";

import { getAll } from "../../services/api/userExams";

import "./listExam.scss";
import paths from "../App/paths";
import { getLocalStorage, removeLocalStorage } from "../../services/storage/LocalStorage";

function ListExam() {
  const { Panel } = Collapse;
  const [listExam, setListExam] = useState([]);
  const user = getLocalStorage('user');

  const titleString = "Bài Test đầu vào của bạn";
  const nameString = "Chào mừng bạn đến với TELIO";
  const messageString =
    "Đây là bài test đầu vào bắt buộc với mọi thí sinh. Vui lòng hoàn thành.";

  useEffect(() => {
    getAllExam();
  }, []);

  const getAllExam = async () => {
    const { data, success } = await getAll();
    if (success && data.data) {
      setListExam(data.data);
    } else {
    }
  };

  const getAction = (exam) => {
    if (!exam.endAt) return "Start";
    if (new Date(exam.endAt).getTime() > Date.now()) return "Continue";
    return "Completed";
  };

  return (
    <div className="listExam-page">
      <div className="listExam-page-container">

        <div className="listExam-page-menu">  
          <Link
            className="listExam-menu-btn"
            to={user.role === "ADMIN" ? paths.AdminDash : paths.Login}
            onClick={() => {
              user.role === "ADMIN" ? '' : removeLocalStorage("user");
              user.role === "ADMIN" ? '' : removeLocalStorage("token_login");
            }}
          >
            <span className="listExam-menu-btn-text">{user.role === "ADMIN" ? "Back to dashboard" : "Sign out"}</span>
            <i className="fas fa-sign-out-alt" />
          </Link>
        </div>

        {listExam[0] ? listExam.map((exam, index) => (
          <div className="listExam__item" key={index}>
            <Collapse
              bordered={true}
              defaultActiveKey={["0"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              <Panel
                header={`${titleString} ${index + 1}`}
                key={index}
                className="listExam__item__name"
              >
                <div className="listExam__item__wrapper">
                  <div key={index} className="listExam__item__answer">
                    {nameString}
                  </div>
                  <div key={index} className="listExam__item__answer">
                    Email của bạn: {exam.email}
                  </div>
                  <div key={index} className="listExam__item__answer">
                    Bài thi bao gồm: {exam.numberOfQuestions} câu hỏi
                  </div>
                  <div key={index} className="listExam__item__answer">
                    Thời gian làm bài của bạn: {exam.duration} phút
                  </div>
                </div>
                <div className="listExam__item__footer">
                  <span className="listExam__item__message">
                    {messageString
                      ? messageString
                      : "Bạn cần hoàn thành bài thi này!"}
                  </span>
                  <Link
                    to={
                      !exam.endAt || new Date(exam.endAt).getTime() > Date.now()
                        ? paths.Homepage(exam._id)
                        : "#"
                    }
                  >
                    <Button
                      type="primary"
                      className={
                        !exam.endAt ||
                          new Date(exam.endAt).getTime() > Date.now()
                          ? "listExam-btn listExam-btn-start"
                          : "listExam-btn listExam-btn-complete"
                      }
                    >
                      {getAction(exam)}
                    </Button>
                  </Link>
                </div>
              </Panel>
            </Collapse>
          </div>
        )) : <h1 style={{ color: "red", margin: 20 }}>Bạn chưa có bài thi nào!</h1>}
      </div>
    </div>
  );
}

export default ListExam;
