import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QuestionContainer from './QuestionContainer';
import * as questionActions from '../../actions/questionWizardActions';

class QuestionListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [...props.questions]
        };
    }

    componentWillMount()
    {
        this.props.questionActions.getAllQuestions();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({questions: [...nextProps.questions]});
    }



    render() {

        let questions = this.state.questions;

        let questionList = (
            questions.length > 0
                ? questions.map((q, index) => <QuestionContainer key={index} question={q} />)
                : <p>No items to display</p>
        );

        return (
            <div>
                {questionList}
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionListContainer);
