import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import {
  MobileOutlined,
  MobileFilled,
  BugOutlined,
  BugFilled,
  AccountBookOutlined,
  AccountBookFilled,
  AudioFilled,
  AudioOutlined,
  CarOutlined,
  CarFilled,
  BellOutlined,
  BellFilled,
} from '@ant-design/icons';
import { JoinTopic } from '../JoinTopic';
import { getCurrentTopic } from '../../../state/actions/apolloActions';
import { getTopicById } from '../../../api/index';

const { Sider } = Layout;

function TopicNav(props) {
  const topicLinkStyle = {
    color: 'white',
    border: '4px solid white',
    borderRadius: '50%',
    padding: '1rem',
    // fontSize: '2rem',
  };
  const outlinedicons = [
    <MobileOutlined className="topicIcon" style={topicLinkStyle} />,
    <BugOutlined style={topicLinkStyle} />,
    <AccountBookOutlined style={topicLinkStyle} />,
    <AudioOutlined style={topicLinkStyle} />,
    <BugOutlined style={topicLinkStyle} />,
    <CarOutlined style={topicLinkStyle} />,
  ];

  const filledicons = [
    <MobileFilled style={topicLinkStyle} />,
    <BugFilled style={topicLinkStyle} />,
    <AccountBookFilled style={topicLinkStyle} />,
    <AudioFilled style={topicLinkStyle} />,
    <BugFilled style={topicLinkStyle} />,
    <CarFilled style={topicLinkStyle} />,
  ];

  const [icons, setIcons] = useState(outlinedicons);

  // sets the icon to be filled icon if it is the current Topic
  useEffect(() => {
    const newIcons = [];

    props.topics.forEach((topic, idx) => {
      if (topic.topicId === props.currentTopic.topicId) {
        newIcons.push(filledicons[idx]);
      } else {
        newIcons.push(outlinedicons[idx]);
      }
    });

    setIcons(newIcons);
  }, [props.currentTopic]);

  return (
    <div className="topicNav">
      {props.topics.map((topic, index) => {
        return (
          <span
            key={index}
            onClick={() => {
              getTopicById(props.getCurrentTopic, topic.topicId);
            }}
          >
            {icons[index]}
          </span>
        );
      })}
      <JoinTopic />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ...state,
    topics: state.topics,
    currentTopic: state.currentTopic,
  };
};

export default connect(mapStateToProps, { getCurrentTopic })(TopicNav);
