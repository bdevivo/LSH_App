import React, { Component, PropTypes } from 'react';
import toggle_question from './actions/toggle_question';

class Question extends Component {

    constructor() {

        super();
    }

    handleToggle(qid){
        console.log("handle toggle for: " + qid);
        toggle_question(qid);
    }

    render() {



        let questionDivStyle = {
            paddingTop: 10,
            borderTop: 'solid 1px blue'
        };

        let question_body;
        if (this.props.QuestionData.visible)
        {
            question_body =
                (<div>
                    <p>name: {this.props.QuestionData.name}</p>
                    <p>id: {this.props.QuestionData.id}</p>
                    <p>other question info</p>
                </div>);
        }
        else
        {
            question_body =
                (<div>
                    <p>name: {this.props.QuestionData.name}</p>

                </div>);
        }

        return(
            <div style={questionDivStyle}>
                <button onClick={this.handleToggle.bind(this, this.props.QuestionData.id)}>{this.props.QuestionData.visible ? "-" : "+"}</button>
                { question_body }
            </div>
        );
    }
}

Question.propTypes = {
    QuestionData: PropTypes.object
};


export default Question;