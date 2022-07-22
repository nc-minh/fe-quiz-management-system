import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import HeaderExam from "./components/Header";

function Exam() {
  return (
    <div className="exam">
      <HeaderExam />
      <Outlet />
    </div>
  );
}

export default memo(Exam);
