import React from 'react'
import {Card} from 'antd'

const QuestionCard = props => {
    console.log(props.question)
    return (
        <Card
            size="small"
            style={{
                width: "20%"
            }}
        >
            <p>{props.question.body}</p>
            {/* <p>{props.question.answers[0]}</p> */}
            {props.question.answers[0] ? <p>{props.question.answers[0].body}</p> : null} 
        </Card>
    )
}

const RenderSurveyQuestions = props => {
    const { questions } = props.survey
    return (
        <>
            {questions.map((q, i) => {
                if (q.leader) {
                    return (
                        <QuestionCard question={q} key={i} />
                    )
                }
            })}
        </>
    )
}

export default RenderSurveyQuestions

