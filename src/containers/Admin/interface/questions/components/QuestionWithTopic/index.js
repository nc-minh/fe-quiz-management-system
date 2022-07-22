
import React, {
	useEffect, useState, memo,
} from 'react';
import {
	Link, useParams, useNavigate,
} from 'react-router-dom';
import { DeleteOutlined, EditOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Modal, Button, Collapse } from 'antd';
import { getAll } from '../../../../../../services/api/questions';
import { remove, updateTopic } from '../../../../../../services/api/topics';
import Notification from '../../../../../../components/Notification';
import './styles.scss';
import ChangeTopicName from "./ChangeTopicName";

function QuestionWithTopic() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [topicID, setTopicID] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const [topicName, setTopicName] = useState('');
  const { Panel } = Collapse;

  useEffect(async () => {
    setTopicName(params.topic || undefined)

    const { data, success } = await getAll({
      topic: params.topic,
    });
    if (!success) {
      Notification("error", "Get data failure!");
    } else {
      setQuestions(data.data.result);
      setTopicID(data.data.topicID);
    }
  }, []);

  function showConfirmDelete() {
    const { confirm } = Modal;
    confirm({
      title: "Do you Want to delete these items?",
      content:
        "If you agree to delete this Topic, all the questions in the Topic will also be deleted!",
      async onOk() {
        const { data, success } = await remove(topicID);
        if (success) {
          navigate("..");
        }
      },
      onCancel() {
      },
    });
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleReceiveNewTopic = (value) => {
    setNewTopicName(value);
  };

  const handleOk = async () => {
	  setIsModalVisible(false);
    const { data, success } = await updateTopic(topicID, {
      topic: {
        name: newTopicName,
      },
    });
    if (success) {
      setTopicName(newTopicName);
    } else {
      Notification("error", "Renaming failed!");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <header className="questions__header">
        <h1 className="questions__title">
          <span className="questions__title__text">Câu hỏi của chủ đề</span>
          <span className="questions__title__name">{topicName}</span>
        </h1>
        <div className="questions__header__menu">
          <div className="question--add">
            <Link to={`../../add/${topicName}`}>
              <Button type="primary">Add Question</Button>
            </Link>
          </div>
          <div className="questions__header__item" onClick={showModal}>
            <EditOutlined style={{ fontSize: "2rem" }} />
          </div>
          <div className="questions__header__item" onClick={showConfirmDelete}>
            <DeleteOutlined style={{ fontSize: "2rem" }} />
          </div>
        </div>
      </header>

      <Modal
        title="Edit topic name"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ChangeTopicName handleReceiveNewTopic={handleReceiveNewTopic} />
      </Modal>

      {questions.map((question, index) => (
        <div className="questions__item" key={index}>
          <Collapse
            bordered={true}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse"
          >
            <Panel
              header={question.question}
              key={index}
              className="questions__item__name"
            >
              <ul className="questions__item__wrapper">
                {question.answers.map((answer, indexAnswer) => (
                  <li key={indexAnswer} className="questions__item__answer">
                    {answer.content}
                  </li>
                ))}
              </ul>
              <div className="questions__item__footer">
                <span className="questions__item__result">
                  {question.result
                    ? question.result.content
                    : "Câu này chưa có đáp án!"}
                </span>
                <Link to={`../../challenges/${question._id}`}>
                  <Button type="primary">Detail</Button>
                </Link>
              </div>
            </Panel>
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default memo(QuestionWithTopic);
