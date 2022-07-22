import React, { useState, useEffect, memo } from "react";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import { getAll, add } from "../../../../../../services/api/topics";
import Notification from "../../../../../../components/Notification";
import './styles.scss';

function Topic() {
  const [topics, setTopics] = useState([]);
  const [topicAdded, setTopicAdded] = useState("");
  const [change, setChange] = useState(false);

  useEffect(() => {
    const getTopic = async () => {
      setChange(true);
      const { data, success } = await getAll({});
      if (!success) {
        Notification("error", "No data!");
      } else {
        setTopics(data.data);
      }
    };
    getTopic();
  }, [change]);

  const handleAddTopic = async () => {
    setChange(false);
    const { data, success } = await add({
      topic: {
        name: topicAdded,
      },
    });
    if (success) {
      Notification("success", `Add success ${data.data.name}`);
    } else {
      Notification("error", "Add failed!");
    }
  };

  const handleTopicChange = (e) => {
    setTopicAdded(e.target.value);
  };

  return (
    <div>
      <div className="questions--add">
        <Input
          className="questions--input"
          placeholder="You want to add more topic?"
          onChange={handleTopicChange}
        />
        <Button
          className="questions--btn-add"
          type="primary"
          onClick={handleAddTopic}
        >
          ADD
        </Button>
      </div>

      <div className="topic">
        {topics.map((topic, index) => (
          <Link className="topic__item" to={topic.name} key={index}>
            {topic.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default memo(Topic);
