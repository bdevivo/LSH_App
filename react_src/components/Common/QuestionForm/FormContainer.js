import schema from './TestSchema';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
//import update from 'immutability-helper';
//import QuestionContainer from './QuestionContainer';
//import * as questionActions from '../../../actions/questionActions';
import Winterfell from '../Winterfell/Winterfell';

class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //questions: [...props.questions],
            //newQuestion: {_id: -1}    // -1 is code for "there is no new question in the current state"
        };

        //this.onAddQuestion = this.onAddQuestion.bind(this);
        //this.onAddQuestionClose = this.onAddQuestionClose.bind(this);
    }

    componentDidMount() {
        //this.props.questionActions.getAllQuestions();
    }

    componentWillReceiveProps(nextProps) {
        //this.setState({questions: [...nextProps.questions]});
    }

    onRender() {
        console.log('Great news! Winterfell rendered successfully');
    }

    onUpdate(questionAnswers) {
        console.log('Question Updated! The current set of answers is: ', questionAnswers);
    }

    onSwitchPanel(panel) {
        console.log('Moving on to the panel that is identified as "' + panel.panelId + '"');
    }

    onSubmit (questionAnswers, target) {
        console.log('Form submitted!', questionAnswers);
        console.log('-----');
        console.log('For this example, we disabled normal form submission functionality. ');
        console.log('-----');
        alert('Submitted. Check the console to see the answers!');
    }

    render() {

        let questionAnswers = [];

        return (
            <Winterfell schema={schema}
                        questionAnswers={questionAnswers}
                        disableSubmit={true}
                        onRender={this.onRender}
                        onUpdate={this.onUpdate}
                        onSwitchPanel={this.onSwitchPanel}
                        onSubmit={this.onSubmit} />
        );
    }
}

FormContainer.propTypes = {
    //questions: PropTypes.array.isRequired,
    //questionActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        //questions: [...state.questions]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //questionActions: bindActionCreators(questionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
