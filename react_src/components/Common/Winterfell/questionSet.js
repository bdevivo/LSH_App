import React, {PropTypes} from 'react';
import Question from './question';
import styles from './Winterfell.css';
import CSSModules from 'react-css-modules';

let _     = require('lodash').noConflict();

class QuestionSet extends React.Component {

  render() {
    let questions = this.props.questions.map(question => {
      return (
        <Question key={question.questionId}
                  questionSetId={this.props.id}
                  questionId={question.questionId}
                  question={question.question}
                  validateOn={question.validateOn}
                  validations={question.validations}
                  text={question.text}
                  postText={question.postText}
                  value={this.props.questionAnswers[question.questionId]}
                  input={question.input}
                  classes={this.props.classes}
                  renderError={this.props.renderError}
                  renderRequiredAsterisk={this.props.renderRequiredAsterisk}
                  questionAnswers={this.props.questionAnswers}
                  validationErrors={this.props.validationErrors}
                  onAnswerChange={this.props.onAnswerChange}
                  onQuestionBlur={this.props.onQuestionBlur}
                  onKeyDown={this.props.onKeyDown} />
      );
    });

    return (
      <div className={this.props.classes.questionSet}>
        {typeof this.props.questionSetHeader !== 'undefined'
           || typeof this.props.questionSetText !== 'undefined'
           ? (
               <div className={this.props.classes.questionSetHeaderContainer}>
                {typeof this.props.questionSetHeader !== 'undefined'
                  ? <h4 styleName="questionSetHeader">
                      {this.props.questionSetHeader}
                    </h4>
                  : undefined}
                {typeof this.props.questionSetText !== 'undefined'
                  ? <p className={this.props.classes.questionSetText}>
                      {this.props.questionSetText}
                    </p>
                  : undefined}
               </div>
             )
             : undefined}
        {questions}
      </div>
    );
  }

}

QuestionSet.propTypes = {
    id                     : PropTypes.string.isRequired,
    name                   : PropTypes.string.isRequired,
    questionSetHeader      : PropTypes.string.isRequired,
    questionSetText        : PropTypes.string.isRequired,
    questions              : PropTypes.array.isRequired,
    questionAnswers        : PropTypes.object.isRequired,
    classes                : PropTypes.object.isRequired,
    validationErrors       : PropTypes.object.isRequired,
    renderError            : PropTypes.func,
    renderRequiredAsterisk : PropTypes.func,
    onAnswerChange         : PropTypes.func.isRequired,
    onQuestionBlur         : PropTypes.func.isRequired,
    onKeyDown              : PropTypes.func.isRequired
};

QuestionSet.defaultProps = {
  id                     : undefined,
  name                   : '',
  questionSetHeader      : undefined,
  questionSetText        : undefined,
  questions              : [],
  questionAnswers        : {},
  classes                : {},
  validationErrors       : {},
  renderError            : undefined,
  renderRequiredAsterisk : undefined,
  onAnswerChange         : () => {},
  onQuestionBlur         : () => {},
  onKeyDown              : () => {}
};

//module.exports = QuestionSet;
export default CSSModules(QuestionSet, styles);