import React, {PropTypes} from 'react';
import styles from './Winterfell.css';
import CSSModules from 'react-css-modules';
import {Row, Col, Button} from 'react-bootstrap';
import QuestionSet from './questionSet';
import {confirm} from '../../../utils/confirm';

let _ = require('lodash').noConflict();
let KeyCodez = require('keycodez');

let Validation = require('./lib/validation');
let ErrorMessages = require('./lib/errors');

class QuestionPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            validationErrors: this.props.validationErrors
        };

        this.saveQuestionAnswers = this.saveQuestionAnswers.bind(this);
        this.getQuestionSets = this.getQuestionSets.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleAnswerValidate(questionId, questionAnswer, validations) {
        if (typeof validations === 'undefined'
            || validations.length === 0) {
            return;
        }

        /*
         * Run the question through its validations and
         * show any error messages if invalid.
         */
        let questionValidationErrors = [];
        validations
            .forEach(validation => {
                if (Validation.validateAnswer(questionAnswer,
                        validation,
                        this.props.questionAnswers)) {
                    return;
                }

                questionValidationErrors.push({
                    type: validation.type,
                    message: ErrorMessages.getErrorMessage(validation)
                });
            });

        let validationErrors = _.chain(this.state.validationErrors)
            .set(questionId, questionValidationErrors)
            .value();

        this.setState({
            validationErrors: validationErrors
        });
    }

    getQuestionSets() {
        /*
         * Get all the question sets for this panel.
         * Collate a list of the question set IDs required
         * and run through the schema to grab the question sets.
         */
        let questionSetIds = this.props.questionSets.map(qS => qS.questionSetId);
        return _.chain(this.props.schema.questionSets)
            .filter(qS => questionSetIds.indexOf(qS.questionSetId) > -1)
            .value();
    }

    saveQuestionAnswers(questionSets) {
        // Get any incorrect fields that need error messages.
        let invalidQuestions = Validation.getQuestionPanelInvalidQuestions(
            questionSets, this.props.questionAnswers
        );

        /*
         * If the panel isn't valid...
         */
        if (Object.keys(invalidQuestions).length > 0) {
            let validationErrors = _.mapValues(invalidQuestions, validations => {
                return validations.map(validation => {
                    return {
                        type: validation.type,
                        message: ErrorMessages.getErrorMessage(validation)
                    };
                });
            });

            this.setState({
                validationErrors: validationErrors
            });
            return false;
        }

        // panel is valid
        let activeQuestionsInPanel = Validation.getActiveQuestionsFromQuestionSets(questionSets, this.props.questionAnswers);
        let allQuestionsInPanel = questionSets.length === 0
            ? []
            : questionSets.map(qSet => qSet.questions).reduce((a, b) => {
                return a.questions.concat(b.questions);
            });
        this.props.saveQuestionAnswers(activeQuestionsInPanel, allQuestionsInPanel, this.props.questionAnswers);

        return true;
    }

    handleMainButtonClick() {
        let questionSets = this.getQuestionSets();
        if (!this.saveQuestionAnswers(questionSets)) {
            // panel is not valid
            return;
        }

        // Panel is valid, so check the conditions and act upon them, or invoke the default.
        let action = this.props.action.default;
        let conditions = this.props.action.conditions || [];

        conditions
            .forEach(condition => {
                let answer = this.props.questionAnswers[condition.questionId];

                action = answer === condition.value
                    ? {
                        action: condition.action,
                        target: condition.target
                    }
                    : action;
            });

        /*
         * Decide which action to take depending on
         * the action decided upon.
         */
        switch (action.action) {

            case 'GOTO':
                this.props.onSwitchPanel(action.target);
                break;

            case 'SUBMIT':
                this.props.onSubmit(action.target);
                break;
        }
    }

    handleSave() {
        let questionSets = this.getQuestionSets();
        if (!this.saveQuestionAnswers(questionSets)) {
            // panel is not valid
            return;
        }

        // Panel is valid, so save job and re-direct to dashboard
        this.props.onSaveJob();
    }

    handleBackButtonClick() {
        if (this.props.panelHistory.length === 0) {
            return;
        }

        this.props.onPanelBack();
    }

    handleAnswerChange(questionId, questionAnswer, validations, validateOn) {
        this.props.onAnswerChange(questionId, questionAnswer);

        this.setState({
            validationErrors: _.chain(this.state.validationErrors)
                .set(questionId, [])
                .value()
        });

        if (validateOn === 'change') {
            this.handleAnswerValidate(questionId, questionAnswer, validations);
        }
    }

    handleQuestionBlur(questionId, questionAnswer, validations, validateOn) {
        if (validateOn === 'blur') {
            this.handleAnswerValidate(questionId, questionAnswer, validations);
        }
    }

    handleInputKeyDown(e) {
        if (KeyCodez[e.keyCode] === 'enter') {
            e.preventDefault();
            this.handleMainButtonClick.call(this);
        }
    }

    handleCancel() {
        confirm("Cancel this job posting? (You will lose any data you have entered.)").then(() => {
            this.props.onCancelJob();
        }, () => {
            // user clicked Cancel -- do nothing
        });
    }

    render() {
        let questionSets = this.props.questionSets.map(questionSetMeta => {
            let questionSet = _.find(this.props.schema.questionSets, {
                questionSetId: questionSetMeta.questionSetId
            });

            if (!questionSet) {
                return undefined;
            }

            return (
                <QuestionSet key={questionSet.questionSetId}
                             id={questionSet.questionSetId}
                             name={questionSet.name}
                             questionSetHeader={questionSet.questionSetHeader}
                             questionSetText={questionSet.questionSetText}
                             questions={questionSet.questions}
                             classes={this.props.classes}
                             questionAnswers={this.props.questionAnswers}
                             renderError={this.props.renderError}
                             renderRequiredAsterisk={this.props.renderRequiredAsterisk}
                             validationErrors={this.state.validationErrors}
                             onAnswerChange={this.handleAnswerChange.bind(this)}
                             onQuestionBlur={this.handleQuestionBlur.bind(this)}
                             onKeyDown={this.handleInputKeyDown.bind(this)}/>
            );
        });

        return (

            <div>

                <Row>
                    <Col md={5}>
                        <p styleName="pageHeader">{this.props.headerText}</p>
                    </Col>

                    <Col md={6}>
                        {this.props.hasDraftAnswers &&
                        <Button type="button" className="btn btn-xs btn-default" styleName="saveButton"
                                onClick={this.onSave}>Save and Continue Later</Button>}
                        {' '}
                        <Button type="button" className="btn btn-xs btn-default" styleName="cancelButton"
                                onClick={this.handleCancel}>Cancel</Button>
                    </Col>

                </Row>

                <Row>

                    <div styleName={this.props.classes.questionPanel}>
                        {typeof this.props.panelHeader !== 'undefined'
                        || typeof this.props.panelText !== 'undefined'
                            ? (
                                <div className={this.props.classes.questionPanelHeaderContainer}>
                                    {typeof this.props.panelHeader !== 'undefined'
                                        ? (
                                            <h3 styleName="questionPanelHeaderText">
                                                {this.props.panelHeader}
                                            </h3>
                                        )
                                        : undefined}
                                    {typeof this.props.panelText !== 'undefined'
                                        ? (
                                            <p styleName={this.props.classes.questionPanelText}>
                                                {this.props.panelText}
                                            </p>
                                        )
                                        : undefined}
                                </div>
                            )
                            : undefined}
                        <div styleName={this.props.classes.questionSets}>
                            {questionSets}
                        </div>
                        <div styleName={this.props.classes.buttonBar}>
                            {  this.props.backButton
                            && this.props.backButton.text
                            && !this.props.backButton.disabled
                                ? (
                                    <Button onClick={this.handleBackButtonClick.bind(this)}
                                        className={this.props.classes.backButton}>{this.props.backButton.text || 'Back'}</Button>
                                )
                                : undefined}
                            {!this.props.button.disabled
                                ? (
                                    <Button onClick={this.handleMainButtonClick.bind(this)}
                                            className={this.props.classes.controlButton}>{this.props.button.text || 'Next'}</Button>
                                )
                                : undefined}
                        </div>
                    </div>
                </Row>
            </div>
        );
    }

}

QuestionPanel.propTypes = {
    questionAnswers: PropTypes.object.isRequired,
    questionSets: PropTypes.array.isRequired,
    onSwitchPanel: PropTypes.func,
    onAnswerChange: PropTypes.func,
    saveQuestionAnswers: PropTypes.func,
    onSubmit: PropTypes.func,
    onPanelBack: PropTypes.func,
    backButton: PropTypes.object,
    button: PropTypes.object,
    panelHistory: PropTypes.array.isRequired,
    schema: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    renderError: PropTypes.func,
    renderRequiredAsterisk: PropTypes.func,
    panelHeader: PropTypes.string,
    panelText: PropTypes.string,
    panelIndex: PropTypes.string,
    panelId: PropTypes.string,
    validationErrors: PropTypes.object,
    action: PropTypes.object,
    headerText: PropTypes.string.isRequired,
    hasDraftAnswers: PropTypes.bool.isRequired,
    onSaveJob: PropTypes.func.isRequired,
    onCancelJob: PropTypes.func.isRequired,
};

QuestionPanel.defaultProps = {
    validationErrors: {},
    schema: {},
    classes: {},
    panelId: undefined,
    panelIndex: undefined,
    panelHeader: undefined,
    panelText: undefined,
    action: {
        default: {},
        conditions: []
    },
    questionSets: [],
    questionAnswers: {},
    renderError: undefined,
    renderRequiredAsterisk: undefined,
    onAnswerChange: () => {
    },
    onSwitchPanel: () => {
    },
    onPanelBack: () => {
    },
    panelHistory: [],
    headerText: "Post a Project",
    hasDraftAnswers: true
};

export default CSSModules(QuestionPanel, styles);
