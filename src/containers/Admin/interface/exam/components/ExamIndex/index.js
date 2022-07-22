import React, { memo, useEffect, useState } from "react";
import { Table } from "antd";
import "./ExamIndex.scss";
import { getAll, update } from "../../../../../../services/api/exams";
import { Link, Outlet, useParams } from "react-router-dom";
import Notification from "../../../../../../components/Notification";
import DeleteButton from "./DeleteButton";
import Email from "./Email";

const FINISHED = "Finished";
const IN_PROCESS = "In process";
const NOT_STARTED = `Not started`;

const columns = [
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    filters: [
      {
        text: FINISHED,
        value: FINISHED,
      },
      {
        text: IN_PROCESS,
        value: IN_PROCESS,
      },
      {
        text: NOT_STARTED,
        value: NOT_STARTED,
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    sorter: (a, b) => a.score / a.questionsNumber - b.score / b.questionsNumber,
    render: (text, record) =>
      record.score !== null
        ? `${record.score} / ${record.questionsNumber}`
        : "",
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
  {
    dataIndex: "detailId",
    key: "detailId",
    render: (text, record) => (
      <Link to={`../detail/${record.detailId}`}>Detail</Link>
    ),
  },
];

function ExamIndex() {
  const [exams, setExams] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [change, setChange] = useState(false);

  const getExams = async () => {
    const { data, success } = await getAll({});
    if (!success) {
      Notification("error", "No data!");
    } else {
      data.data.map(async (exam) => {
        if (
          exam.endAt !== null &&
          new Date(exam.endAt).getTime() < new Date().getTime() &&
          exam.score === null
        ) {
          const { data, success } = update(exam._id, { exam });
          if (success) {
            return {
              ...exam,
              score: data.data.score,
            };
          }
          return exam;
        }
        return exam;
      });
      setExams(data.data);
    }
  };

  useEffect(async () => {
    await getExams();
    setChange(true);
    setTableData(
      exams.map((exam) => {
        const score = exam.score;
        const createdAt = new Date(exam.createdAt).toLocaleString();
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
        return {
          exam,
          questionsNumber: exam.questions.length,
          score,
          status,
          createdAt,
          detailId: exam._id,
          deleteId: exam._id,
        };
      })
    );
  }, [change]);

  const reRender = () => {
    setChange(false);
  };

  const emailColumn = {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text, record) => <Email exam={record.exam} reRender={reRender} />,
  };

  const deleteColumn = {
    dataIndex: "deleteId",
    key: "deleteId",
    render: (text, record) => (
      <DeleteButton id={record.deleteId} reRender={reRender} />
    ),
  };
  return (
    <div className="exam">
      <Table
        className="exam-table"
        dataSource={tableData}
        columns={[emailColumn, ...columns, deleteColumn]}
      />
    </div>
  );
}

export default memo(ExamIndex);
