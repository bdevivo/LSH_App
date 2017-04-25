import React, {PropTypes} from 'react';
import QuestionPanel from './questionPanel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from '../../../actions/uiActions';
import * as jobActions from '../../../actions/jobActions';
import update from 'immutability-helper';
import {browserHistory} from 'react-router';

let _ = require('lodash').noConflict();

class Winterfell extends React.Component {

    constructor(props) {
        super(props);

        // Set our default values for props.
        props = _.extend({
            schema: {
                formPanels: [],
                questionPanels: [],
                questionSets: [],
                classes: {}
            },
            questionAnswers: this.props.questionAnswers,
            ref: 'form',
            encType: 'application/x-www-form-urlencoded',
            method: 'POST',
            action: '',
            panelId: undefined,
            disableSubmit: false,
            renderError: undefined,
            renderRequiredAsterisk: undefined,
            onSubmit: () => {
            },
            onUpdate: () => {
            },
            onSwitchPanel: () => {
            },
            onRender: () => {
            }
        }, this.props);

        let schema = _.extend({
            classes: {},
            formPanels: [],
            questionPanels: [],
            questionSets: [],
        }, props.schema);

        schema.formPanels = schema.formPanels
            .sort((a, b) => a.index - b.index);

        //let panelId = this.getPanelId(props.panelId, schema);
        let panelId = this.getPanelId('0', schema);
        let currentPanel = this.getCurrentPanel(panelId, schema);

        if (!currentPanel) {
            throw new Error('Winterfell: Could not find initial panel and failed to render.');
        }

        this.state = {
            schema: schema,
            panelId: panelId,
            currentPanel: currentPanel,
            action: props.action,
            questionAnswers: props.questionAnswers,
            panelHistory: props.panelHistory
        };

        this.pushPanel = this.pushPanel.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let schema = nextProps.schema;
        let panelId = nextProps.panelId ? this.getPanelId(nextProps.panelId, schema) : this.state.panelId;
        let newCurrentPanel = this.getCurrentPanel(panelId, schema);

        this.setState({
            action: nextProps.action,
            schema: schema,
            questionAnswers: nextProps.questionAnswers,
            panelHistory: nextProps.panelHistory,
            panelId: panelId,
            currentPanel: newCurrentPanel
        });
    }

    getPanelId(panelId, schema) {
        return (panelId !== '0'
            ? panelId
            : schema.formPanels.length > 0
                ? schema.formPanels[0].panelId
                : undefined);
    }

    getCurrentPanel(panelId, schema) {
        return (typeof schema !== 'undefined'
        && typeof schema.formPanels !== 'undefined'
        && typeof panelId !== 'undefined'
            ? _.find(schema.formPanels, panel => panel.panelId === panelId)
            : undefined);
    }

    handleAnswerChange(questionId, questionAnswer) {
        let newState = update(this.state, {
            questionAnswers: {
                [questionId]: {$set: questionAnswer}
            }
        });

        this.setState(newState, this.props.onUpdate.bind(null, newState.questionAnswers));
    }

    handleSwitchPanel(panelId, preventHistory) {
        let panel = _.find(this.props.schema.formPanels, {
            panelId: panelId
        });

        if (!panel) {
            throw new Error('Winterfell: Tried to switch to panel "'
                + panelId + '", which does not exist.');
        }

        if (!preventHistory) {
            this.pushPanel(this.state.panelId);
        }

       // this.props.uiActions.setCurrentPanel(panel.panelId, this.props.gridName);
        this.setState(update(this.state, {
            panelId: {$set: panel.panelId}
        }));
    }

    saveQuestionAnswers(activeQuestionsInPanel, allQuestionsInPanel, questionAnswers) {
        let clonedAnswers = _.cloneDeep(questionAnswers);
        // filter out any answers that are not in the activeQuestions array (these
        // are questions that were answered at some point, but were not active (i.e.,
        // visible) at the time the panel was switched)
        let activeQuestionIds = activeQuestionsInPanel.map(x => x.questionId);
        let allQuestionIdsInPanel = allQuestionsInPanel.map(x => x.questionId);
        Object.keys(clonedAnswers).forEach((key) => {
            if (allQuestionIdsInPanel.includes(key) && !activeQuestionIds.includes(key)) {
                delete clonedAnswers[key];
            }
        });

        //this.props.jobActions.setQuestionAnswers(this.props.jobId, clonedAnswers);
        this.props.saveQuestionAnswers(clonedAnswers, activeQuestionsInPanel);
    }

    handleBackButtonClick() {
        //this.panelHistory.pop();
        this.props.uiActions.popPanelHistory(this.props.gridName);

        this.handleSwitchPanel.call(
            this, this.state.panelHistory[this.state.panelHistory.length - 1], true
        );
    }

    handleCancel() {
        //this.props.uiActions.toggleQuestionAnswerMode(false);
        browserHistory.push("/jobdash");
    }

    pushPanel(panelId) {
        //this.panelHistory.push(panelId);
        this.props.uiActions.pushPanelHistory(panelId, this.props.gridName);
    }

    handleSubmit() {

        if (this.props.disableSubmit) {
            this.props.onSubmit(this.state.questionAnswers);
        }

        /*
         * If we are not disabling the functionality of the form,
         * we need to set the action provided in the form, then submit.
         */
        // this.setState({
        //   action : action
        // }, () => {
        //   ReactDOM.findDOMNode(this.refs[this.props.ref])
        //        .submit();
        // });
    }

    render() {

        if (this.state.currentPanel === null) {
            return null;
        }

        let currentPanel = _.find(this.state.schema.questionPanels,
            panel => panel.panelId === this.state.currentPanel.panelId);

        return (
            <form method={this.props.method}
                  encType={this.props.encType}
                  action={this.state.action}
                //ref={this.props.ref}
                  className={this.state.schema.classes.form}>
                <div className={this.state.schema.classes.questionPanels}>
                    <QuestionPanel schema={this.state.schema}
                                   classes={this.state.schema.classes}
                                   panelId={currentPanel.panelId}
                                   panelIndex={currentPanel.panelIndex}
                                   panelHeader={currentPanel.panelHeader}
                                   panelText={currentPanel.panelText}
                                   action={currentPanel.action}
                                   button={currentPanel.button}
                                   backButton={currentPanel.backButton}
                                   questionSets={currentPanel.questionSets}
                                   questionAnswers={this.state.questionAnswers}
                                   panelHistory={this.state.panelHistory}
                                   renderError={this.props.renderError}
                                   renderRequiredAsterisk={this.props.renderRequiredAsterisk}
                                   onAnswerChange={this.handleAnswerChange.bind(this)}
                                   saveQuestionAnswers={this.saveQuestionAnswers.bind(this)}
                                   onPanelBack={this.handleBackButtonClick.bind(this)}
                                   onSwitchPanel={this.handleSwitchPanel.bind(this)}
                                   onSubmit={this.handleSubmit.bind(this)}
                                   headerText={this.props.headerText}
                                   hasDraftAnswers={this.props.hasDraftAnswers}
                                   onSaveJob={this.props.onSaveJob}
                                   onCancelJob={this.handleCancel}/>
                </div>
            </form>
        );
    }
}

Winterfell.propTypes = {
    schema: PropTypes.object.isRequired,
    gridName: PropTypes.string.isRequired,
    questionAnswers: PropTypes.object.isRequired,
    panelHistory: PropTypes.array.isRequired,
    disableSubmit: PropTypes.bool.isRequired,
    onRender: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    saveQuestionAnswers: PropTypes.func.isRequired,
    headerText: PropTypes.string.isRequired,
    hasDraftAnswers: PropTypes.bool.isRequired,
    onSaveJob: PropTypes.func.isRequired,

    onSwitchPanel: PropTypes.func,
    panelId: PropTypes.string,
    action: PropTypes.func,
    method: PropTypes.string,
    renderError: PropTypes.func,
    renderRequiredAsterisk: PropTypes.func,
    encType: PropTypes.string,
    uiActions: PropTypes.object,
    jobActions: PropTypes.object,
};

Winterfell.inputTypes = require('./inputTypes');
Winterfell.errorMessages = require('./lib/errors');
Winterfell.validation = require('./lib/validation');

Winterfell.addInputType = Winterfell.inputTypes.addInputType;
Winterfell.addInputTypes = Winterfell.inputTypes.addInputTypes;

Winterfell.addErrorMessage = Winterfell.errorMessages.addErrorMessage;
Winterfell.addErrorMessages = Winterfell.errorMessages.addErrorMessages;

Winterfell.addValidationMethod = Winterfell.validation.addValidationMethod;
Winterfell.addValidationMethods = Winterfell.validation.addValidationMethods;


// function mapStateToProps(state, ownProps) {
//
//     let gridState = state.ui[ownProps.gridName];
//
//     return {
//         panelId: gridState.currentPanelId
//     };
// }

function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(uiActions, dispatch),
        jobActions: bindActionCreators(jobActions, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(Winterfell);
