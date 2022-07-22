import React, { memo } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const HeaderExam = () => {
  return (
    <div className="header-exam">
      <Link to={"create"} className="header-exam__item">
        Create new exam
      </Link>
    </div>
  );
};

export default memo(HeaderExam);
