import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap';
import update from 'immutability-helper';
import QuestionContainer from './QuestionContainer';
import * as questionActions from '../../../actions/questionActions';
import CSSModules from 'react-css-modules';
import styles from './Question.css';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class QuestionListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [...props.questions],
            newQuestion: {_id: -1},    // -1 is code for "there is no new question in the current state" (new question would have _id == 0)
            isMovingItem: false
        };

        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onAddQuestionClose = this.onAddQuestionClose.bind(this);
        this.moveItem = this.moveItem.bind(this);
    }

    componentDidMount() {
        if (!this.props.areQuestionsLoaded) {
            this.props.questionActions.getAllQuestions();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({questions: [...nextProps.questions]});
    }

    moveItem(dragIndex, hoverIndex) {
        const {questions} = this.state;
        const dragItem = questions[dragIndex];

        let newState = update(this.state, {
            questions: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragItem]
                ]},
            //isMovingItem: {$set: true}
        });

        this.setState(newState);
        //this.reOrderOptionItems(newState.optionItems);    // update the option items in the parent question
        //this.setState(update(this.state, {isMovingItem: {$set: false}}));
    }

    // reOrderOptionItems(orderedItems) {
    //     let newState = update(this.state, {
    //         reOrderedOptionItems: {$set: orderedItems},
    //         areOptionsReordered: {$set: true}
    //     });
    //
    //     this.setState(newState);
    // }

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
            name: "",
            text: "",
            textForResources: "",
            answerType: "none",
            function: "none"
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

        let {questions} = this.state;
        let newQuestion = this.state.newQuestion;

        let questionList = (
            questions.length > 0
                ? questions.map((q, i) => <QuestionContainer
                    key={q.index}
                    visualIndex={i}
                    question={q}
                    modalVisible={false}
                    onAddQuestionClose={this.onAddQuestionClose}
                    moveItem={this.moveItem}/>)

                : <p>No items to display</p>
        );

        let newQuestionForm = (
            newQuestion._id === 0
                ? <QuestionContainer
                question={newQuestion}
                modalVisible={true}
                onAddQuestionClose={this.onAddQuestionClose}
                visualIndex="1"
                moveItem={this.moveItem}/>
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
    questionActions: PropTypes.object.isRequired,
    areQuestionsLoaded: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        questions: [...state.questions],
        areQuestionsLoaded: state.loadedData.questions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionActions: bindActionCreators(questionActions, dispatch)
    };
}

//export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(QuestionListContainer, styles));

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(CSSModules(QuestionListContainer, styles)));
