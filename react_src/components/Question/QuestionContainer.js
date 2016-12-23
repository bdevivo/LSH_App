import React, { PropTypes } from 'react';
import Question from './Question';


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
        return <Question question={this.state.question} handleToggle={this.toggleQuestion} isExpanded={this.state.isExpanded} />;
    }
}

QuestionContainer.propTypes = {
    question: PropTypes.object.isRequired
};


export default QuestionContainer;
