import React, {PropTypes} from 'react';
import styles from './Winterfell.css';
import CSSModules from 'react-css-modules';
import QuestionSet from './questionSet';

let _        = require('lodash').noConflict();
let KeyCodez = require('keycodez');

let Validation    = require('./lib/validation');
let ErrorMessages = require('./lib/errors');

let Button      = require('./button');

class QuestionPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      validationErrors : this.props.validationErrors
    };
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
          type    : validation.type,
          message : ErrorMessages.getErrorMessage(validation)
        });
      });

    let validationErrors = _.chain(this.state.validationErrors)
                            .set(questionId, questionValidationErrors)
                            .value();

    this.setState({
      validationErrors : validationErrors
    });
  }

  handleMainButtonClick() {
    let action     = this.props.action.default;
    let conditions = this.props.action.conditions || [];

    /*
     * We need to get all the question sets for this panel.
     * Collate a list of the question set IDs required
     * and run through the schema to grab the question sets.
     */
    let questionSetIds = this.props.questionSets.map(qS => qS.questionSetId);
    let questionSets   = _.chain(this.props.schema.questionSets)
                          .filter(qS => questionSetIds.indexOf(qS.questionSetId) > -1)
                          .value();

    /*
     * Get any incorrect fields that need error messages.
     */
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
            type    : validation.type,
            message : ErrorMessages.getErrorMessage(validation)
          };
        });
      });

      this.setState({
        validationErrors : validationErrors
      });
      return;
    }

    /*
     * Panel is valid. So what do we do next?
     * First, save the answers on this panel.
     * Then check our conditions and act upon them, or the default.
     */

    let activeQuestionsInPanel = Validation.getActiveQuestionsFromQuestionSets(questionSets, this.props.questionAnswers);
    this.props.saveQuestionAnswers(activeQuestionsInPanel, this.props.questionAnswers);

    conditions
      .forEach(condition => {
        let answer = this.props.questionAnswers[condition.questionId];

        action = answer == condition.value
                   ? {
                       action : condition.action,
                       target : condition.target
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

  handleBackButtonClick() {
    if (this.props.panelHistory.length == 0) {
      return;
    }

    this.props.onPanelBack();
  }

  handleAnswerChange(questionId, questionAnswer, validations, validateOn) {
    this.props.onAnswerChange(questionId, questionAnswer);

    this.setState({
      validationErrors : _.chain(this.state.validationErrors)
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

  render() {
    let questionSets = this.props.questionSets.map(questionSetMeta => {
      let questionSet = _.find(this.props.schema.questionSets, {
        questionSetId : questionSetMeta.questionSetId
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
                     onKeyDown={this.handleInputKeyDown.bind(this)} />
      );
    });

    return (
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
          { this.props.backButton.text        //this.props.panelHistory.length > 1
            && !this.props.backButton.disabled
            ? (
                <Button text={this.props.backButton.text || 'Back'}
                        onClick={this.handleBackButtonClick.bind(this)}
                        className={this.props.classes.backButton} />
              )
            : undefined}
          {!this.props.button.disabled
            ? (
                <Button text={this.props.button.text || 'Next'}
                        onClick={this.handleMainButtonClick.bind(this)}
                        className={this.props.classes.controlButton} />
              )
            : undefined}
        </div>
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
};

QuestionPanel.defaultProps = {
  validationErrors       : {},
  schema                 : {},
  classes                : {},
  panelId                : undefined,
  panelIndex             : undefined,
  panelHeader            : undefined,
  panelText              : undefined,
  action                 : {
    default    : {},
    conditions : []
  },
  button                 : {
    text : 'Submit'
  },
  backButton             : {
    text : 'Back'
  },
  questionSets           : [],
  questionAnswers        : {},
  renderError            : undefined,
  renderRequiredAsterisk : undefined,
  onAnswerChange         : () => {},
  onSwitchPanel          : () => {},
  onPanelBack            : () => {},
  panelHistory           : [],
};

export default CSSModules(QuestionPanel, styles);
