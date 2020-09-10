Proposed React Redux Global State
-------------------------------
    {
        user: {
            userid: 5,
            username: "Mark"
        },
        contextTopics: [
            {
                id: 1,
                name: "Software Manager",
                leaderQuestions: [
                    {
                        id: 1,
                        type: "text",
                        body: "What is the priorty for the week"
                    },
                    {
                        id: 2,
                        type: "text",
                        body: "What are our hard deadlines?"
                    },
                    {
                        id: 3,
                        type: "text",
                        body: "Is there any new information the team needs?"
                    }
                ],
                memberQuestions: [
                    {
                        id: 4,
                        type: "text",
                        body: "Do you have any blockers"
                    },
                    {
                        id: 5,
                        type: "text",
                        body: "What task are you working on?"
                    },
                    {
                        id: 6,
                        type: "text",
                        body: "Will you be able to meet the hard deadlines?"
                    }
                ],
            },
            {
                ...
            },
            {
                ...
            }
        ],
        userTopics: [
            {
                id: 4,
                name: "Labs 26 Standup",
                leaderQuestions: [
                    ...
                ],
                memberQuestions: [
                    ...
                ],
                members: [
                    {id: 1, name: "Joe"},
                    {id: 2, name: "Ian"},
                    {id: 3, name: "Nick"},
                    {id: 4, name: "Steven"},
                    {id: 5, name: "Mark"},
                ],
                defaultSurvey: 17,
                frequency: "weekly",
                ownerid: 5
            },
            {
                ...
            }
        ]
    }