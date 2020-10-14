import React, { useState } from 'react';
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
    fontSize: '2rem',
  };
  const outlinedicons = [
    <MobileOutlined style={topicLinkStyle} />,
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

  const highlightLink = id => {
    const newIcons = [];

    props.topics.map((topic, idx) => {
      if (id === topic.topicId) {
        newIcons.push(filledicons[idx]);
      } else {
        newIcons.push(outlinedicons[idx]);
      }
    });

    setIcons(newIcons);
  };
  return (
    <Sider
      style={{
        backgroundColor: 'indigo',
        borderTopRightRadius: '4rem',
        borderBottomRightRadius: '4rem',
      }}
    >
      {props.topics.map((topic, index) => {
        return (
          <span
            style={{
              display: 'block',
              width: '100%',
              margin: '2rem 0',
              backgroundColor: 'light indigo',
            }}
            onClick={() => {
              getTopicById(props.getCurrentTopic, topic.topicId);
              highlightLink(topic.topicId);
            }}
          >
            {icons[index]}
          </span>
        );
      })}
      <JoinTopic />
    </Sider>
  );
}

const mapStateToProps = state => {
  return {
    ...state,
    topics: state.topics,
  };
};

export default connect(mapStateToProps, { getCurrentTopic })(TopicNav);
