import React, { PropTypes } from 'react';
import Question from './Question';
import QuestionEditContainer from './QuestionEditContainer';

class QuestionContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            isExpanded: false
        };

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.toggleQuestion = this.toggleQuestion.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({question: nextProps.question});
    }

    toggleQuestion()
    {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    render() {
        let question = this.state.question;
        let questionComponent = (question._id !== 0 // this is an existing question
            ? <Question
                question={this.state.question}
                handleToggle={this.toggleQuestion}
                isExpanded={this.state.isExpanded}
                modalVisible={this.props.modalVisible}   // if we are editing an existing question, show the Edit Question modal
                onAddQuestionClose={this.props.onAddQuestionClose}
                moveItem={this.props.moveItem}
                visualIndex={this.props.visualIndex}
                isInReorderState={this.props.isInReorderState} />
            : <QuestionEditContainer  // this is a new question
                question={question}
                modalVisible={true}   // if we are adding a new question, show the Add Question modal
                onAddQuestionClose={this.props.onAddQuestionClose}
                isInReorderState={this.props.isInReorderState}/>);

        return <div>{questionComponent}</div>;
    }
}

QuestionContainer.propTypes = {
    question: PropTypes.object.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    onAddQuestionClose: PropTypes.func.isRequired,
    visualIndex: PropTypes.number.isRequired,
    moveItem: PropTypes.func.isRequired,
    isInReorderState: PropTypes.bool.isRequired
};


export default QuestionContainer;
