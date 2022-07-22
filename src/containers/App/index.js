import React, { useState, memo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import paths from "./paths";
import { ProtectedAdmin, ProtectedExam, ProtectedLogin } from "./authentication";
import Homepage from "../Homepage";
import ListExam from "../ListExam";
import LoginContainer from "../Login";
import AdminPage from "../Admin";
import Dashboard from "../Admin/interface/dashboard";
import Exam from "../Admin/interface/exam";
import Question from "../Admin/interface/questions";
import Users from "../Admin/interface/users";
import QuestionWithTopic from "../Admin/interface/questions/components/QuestionWithTopic";
import QuestionItem from "../Admin/interface/questions/components/Question";
import AddQuestion from "../Admin/interface/questions/components/Add";
import CreateNewExam from "../Admin/interface/exam/components/CreateNewExam";
import ExamIndex from "../Admin/interface/exam/components/ExamIndex";
import ExamDetail from "../Admin/interface/exam/components/ExamDetail";
import AppContext from "./AppContext";
import { getLocalStorage } from "../../services/storage/LocalStorage";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path={paths.Login}
            element={
              <ProtectedLogin>
                <LoginContainer />
              </ProtectedLogin>
            }
          />
          <Route
            path="/exam/start/:id"
            element={
              <AppContext.Provider
                value={{
                  questionNumber,
                  setQuestionNumber,
                  answeredQuestions,
                  setAnsweredQuestions,
                }}
              >
                <ProtectedExam>
                  <Homepage />
                </ProtectedExam>
              </AppContext.Provider>
            }
          />
          <Route
            path={paths.ListExam}
            element={
              <ProtectedExam>
                <ListExam />
              </ProtectedExam>
            }
          />
          <Route
            path={paths.Admin}
            element={
              <ProtectedAdmin>
                <AdminPage />
              </ProtectedAdmin>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="questions" element={<Question />}>
              <Route path=":topic" element={<QuestionWithTopic />} />
            </Route>
            <Route path="challenges">
              <Route path=":id" element={<QuestionItem />} />
            </Route>
            <Route path="add">
              <Route path=":topic" element={<AddQuestion />} />
            </Route>
            <Route path="exam" element={<Exam />}>
              <Route path="index" element={<ExamIndex />} />
              <Route path="detail">
                <Route path=":id" element={<ExamDetail />} />
              </Route>
              <Route path="create" element={<CreateNewExam />} />
            </Route>
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="*" element={<h1>Error ! 401 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default memo(App);
