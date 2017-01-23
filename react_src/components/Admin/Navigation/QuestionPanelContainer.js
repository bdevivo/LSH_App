import React, {PropTypes as T} from 'react';
import
import * as questionActions from '../../../actions/questionActions';
import CSSModules from 'react-css-modules';
import styles from './QuestionPanel.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class QuestionPanelContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            qPanelId: this.props.params.panelId,
            qPanel: this.props.qPanel
        };
    }

    render() {

        let question = this.state.question;
        let questionComponent = (question._id !== 0 // this is an existing question
            ? <Question
                question={this.state.question}
                handleToggle={this.toggleQuestion}
                isExpanded={this.state.isExpanded}
                modalVisible={this.props.modalVisible}   // if we are editing an existing question, show the Edit Question modal
                onAddQuestionClose={this.props.onAddQuestionClose}/>
            : <QuestionEditContainer  // this is a new question
                question={question}
                modalVisible={true}   // if we are adding a new question, show the Add Question modal
                onAddQuestionClose={this.props.onAddQuestionClose}/>);


        return <div>{questionComponent}</div>;
    }
}



QuestionPanelContainer.propTypes = {
    qPanel: T.object,
    params: T.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        qPanel: state.questionPanels.find(x => x.panelId === ownProps.params.panelId)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionActions: bindActionCreators(questionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(QuestionPanelContainer, styles));
