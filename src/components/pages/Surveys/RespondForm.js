import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { createAnswer } from '../../../api/index';
import { getCurrentTopic } from '../../../state/actions/apolloActions';
import { getTopicById } from '../../../api/index';

const RespondForm = props => {
  const { currentRequest, toggleResponseForm } = props;
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (currentRequest) {
      let responses = [];
      let memberQuestions = [];
      let allQuestions = currentRequest.questions
        ? currentRequest.questions
        : [];
      // construct responses to correct format for API
      for (let i = 0; i < allQuestions.length; i++) {
        if (allQuestions[i].leader === false) {
          responses.push({ body: '', questionid: allQuestions[i].questionId });
        }
      }
      for (let i = 0; i < allQuestions.length; i++) {
        if (allQuestions[i].leader === false) {
          memberQuestions.push(allQuestions[i]);
        }
      }
      setQuestions(memberQuestions);
      setResponses(responses);
    }
  }, [currentRequest]);

  const responseChange = e => {
    let newResponses = [...responses];
    newResponses[parseInt(e.target.name)].body = e.target.value;
    setResponses(newResponses);
  };

  // check if response has be entered
  // if all form inputs are empty, don't show submit button
  const checkResponses = () => {
    for (let i = 0; i < responses.length; i++) {
      if (responses[i].body !== '') {
        return true;
      }
    }
    return false;
  };

  const responseSubmit = e => {
    createAnswer(
      responses,
      getTopicById(props.getCurrentTopic, props.currentTopic.topicId)
    )
      .then(result => {
        toggleResponseForm();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    // antd form component
    <Form
      name="response-form"
      layout="vertical"
      labelAlign="left"
      style={{
        height: '85%',
        maxHeight: '60vh',
        overflow: 'auto',
        overflowX: 'hidden',
        borderBottom: '1px solid grey',
        width: '90%',
      }}
    >
      {/* map through questions and make a form item for each one */}
      {props.currentRequest && (
        <>
          {questions.map((question, index) => (
            <Form.Item key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: '2%',
                }}
              >
                <h4 style={{ textAlign: 'left' }}>{`Question ${index + 1}`}</h4>
                <p>{question.body}</p>
              </div>
              <Input
                htmlFor={index}
                key={index}
                name={index}
                value={responses ? responses[index].body : ''}
                onChange={responseChange}
                size="large"
                style={{ textAlign: 'left' }}
              />
            </Form.Item>
          ))}
          {checkResponses() && <Button onClick={responseSubmit}>Submit</Button>}
        </>
      )}
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    ...state,
    currentTopic: state.currentTopic,
  };
};

export default connect(mapStateToProps, { getCurrentTopic })(RespondForm);
