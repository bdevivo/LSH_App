import Question from './Question';

import React, { Component, PropTypes } from 'react';

class TestPage extends Component {

    constructor() {

        super();
    }

    render() {

        let outerDivStyle = {
            marginTop: 40
        };

        let questionList;
        //console.log("Rendering TestStore");

        if (typeof(this.props.Questions) !== "undefined" && this.props.Questions !== null)
        {
            questionList = this.props.Questions.map(
                (q) => <Question key={q.id} QuestionData={q} />

            );
        }

        return(
            <div style={outerDivStyle}>

                    {questionList}

            </div>
        );
    }
}

TestPage.propTypes = {
    Questions: PropTypes.array
};


export default TestPage;