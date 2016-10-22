import React, { PropTypes } from 'react';
import QuestionList from './QuestionList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as questionActions from '../../actions/questionWizardActions';


class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        //debugger;
        this.state = {
            questions: [...props.questions]
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.course.id != nextProps.course.id) {
        //     // Necessary to populate form when existing course is loaded directly.
        //     this.setState({course: Object.assign({}, nextProps.course)});
        // }
        //debugger;
        this.setState({questions: [...nextProps.questions]});
    }

    handleToggle(questionID)
    {   //debugger;
        //noinspection JSUnresolvedFunction (why do we need this?)
        this.props.actions.toggleQuestion(questionID);

    }

    render() {
        return <QuestionList questions={this.state.questions} handleToggle={this.handleToggle}/>;
    }
}

QuestionPage.propTypes = {
    questions: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
   // let immutableQuestion = state.get("questions").find(function(q){return q.get('id') === ownProps.questionID;});
    //debugger;

    let questionListImmutable = state.get("questions");
    let questionList = (questionListImmutable ? questionListImmutable.toJS() : []);
    return {
        questions: questionList
    };
}

function mapDispatchToProps(dispatch)
{
    //debugger;
    return {
        //toggleQuestion: () => dispatch(questionActions.toggleQuestion(ownProps.questionID))
        actions: bindActionCreators(questionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
