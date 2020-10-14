import React from 'react';
import { connect } from 'react-redux';
import Sider from 'antd/lib/layout/Sider';
import {
  ApartmentOutlined,
  NodeIndexOutlined,
  MobileOutlined,
  FundProjectionScreenOutlined,
  BugOutlined,
  AccountBookOutlined,
  AudioOutlined,
  CarOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { JoinTopic } from '../JoinTopic';

function TopicNav(props) {
  const topicLinkStyle = {
    color: 'white',
    border: '4px solid white',
    borderRadius: '50%',
    padding: '1rem',
    fontSize: '2rem',
  };
  const icons = [
    <ApartmentOutlined style={topicLinkStyle} />,
    <NodeIndexOutlined style={topicLinkStyle} />,
    <MobileOutlined style={topicLinkStyle} />,
    <FundProjectionScreenOutlined style={topicLinkStyle} />,
    <BugOutlined style={topicLinkStyle} />,
    <AccountBookOutlined style={topicLinkStyle} />,
    <AudioOutlined style={topicLinkStyle} />,
    <CarOutlined style={topicLinkStyle} />,
  ];

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
            style={{ display: 'block', width: '100%', margin: '2rem 0' }}
            onClick={() => console.log(topic)}
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

export default connect(mapStateToProps, {})(TopicNav);
