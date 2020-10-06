import LocaleProvider from 'antd/lib/locale-provider'
import React, {useState} from 'react'

const QuestionCard = props => {
    return (
        <>
           { props.body }
        </>
    )
}


const RenderSurveyQuestions = props => {

    const {surveysrequests} = props.topic

    const getQuestions = surveysrequests => {
        if (surveysrequests.surveyId == props.surveyId) {
            return {
                questions : surveysrequests.questions,
                matchesSurvey : true
            }
        } 
        return {
            questions : [],
            matchesSurvey : false
        } 
    }

    const {questions, matchesSurvey} = getQuestions(surveysrequests)

    console.log(questions)

    const [leaderQuestions, setLeaderQuestions] = useState(
        matchesSurvey ? leaderQuestions.filter((q, i) => {
            return q.leader
        }) : questions)
            
    console.log(leaderQuestions)
    
    return (
        <>  
            {leaderQuestions.map((q, i) => {
                return (
                    <QuestionCard question={q} key={i} />
                )
            } )}
        </>
    )
}


export default RenderSurveyQuestions

