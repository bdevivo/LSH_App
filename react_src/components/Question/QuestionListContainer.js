import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap';
import update from 'immutability-helper';
import QuestionContainer from './QuestionContainer';
import * as questionActions from '../../actions/questionWizardActions';
import CSSModules from 'react-css-modules';
import styles from './Question.css';

class QuestionListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [...props.questions],
            newQuestion: {_id: -1}    // -1 is code for "there is no new question in the current state"
        };

        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onAddQuestionClose = this.onAddQuestionClose.bind(this);
    }

    componentDidMount() {
        this.props.questionActions.getAllQuestions();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({questions: [...nextProps.questions]});
    }

    onAddQuestion() {

        // Calculate the index number for the question to be added
        let nextIndex;
        if(this.state.questions.length === 0) {
            nextIndex = 1;
        }
        else {
            let questionIds = this.state.questions.map(q => q.index);
            nextIndex = Math.max(...questionIds) + 1;
        }

        let newQuestion = {
            _id: 0,
            index: nextIndex,
            text: "",
            textForResources: "",
            selectOptionItems: [],
            answerType: "none"
        };

        let newState = update(this.state, {
                newQuestion: {$set: newQuestion}
            }
        );

        this.setState(newState);
    }

    onAddQuestionClose() {

        let newQuestion = {
            _id: -1
        };

        let newState = update(this.state, {
                newQuestion: {$set: newQuestion}
            }
        );

        this.setState(newState);
    }


    render() {

        let questions = this.state.questions;
        let newQuestion = this.state.newQuestion;

        let questionList = (
            questions.length > 0
                ? questions.map((q, index) => <QuestionContainer key={index} question={q} modalVisible={false}
                                                                 onAddQuestionClose={this.onAddQuestionClose}/>)
                : <p>No items to display</p>
        );

        let newQuestionForm = (
            newQuestion._id === 0
                ? <QuestionContainer question={newQuestion} modalVisible={true}
                                     onAddQuestionClose={this.onAddQuestionClose}/>
                : null
        );

        return (
            <div>
                <h3>Questions</h3>

                <div styleName="addQuestionDiv">
                    <Button type="button" className="btn btn-sm btn-default" onClick={this.onAddQuestion}>Add
                        Question</Button>
                </div>

                {questionList}

                {newQuestionForm}

            </div>
        );
    }
}

QuestionListContainer.propTypes = {
    questions: PropTypes.array.isRequired,
    questionActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        questions: [...state.questions]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionActions: bindActionCreators(questionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(QuestionListContainer, styles));
