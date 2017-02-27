import React, {PropTypes} from 'react';
import styles from './Winterfell.css';
import CSSModules from 'react-css-modules';
let ReactDOM = require('react-dom');

import {Overlay, Tooltip} from 'react-bootstrap';
let _ = require('lodash').noConflict();

let InputTypes = require('./inputTypes');

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showValidationError: false
        };

        //this.onAddQuestion = this.onAddQuestion.bind(this);
        //this.onAddQuestionClose = this.onAddQuestionClose.bind(this);
    }

    componentDidMount() {
        if (typeof this.props.input.default === 'undefined'
            || (this.props.input.type === 'checkboxInput'
            && typeof this.props.questionAnswers[this.props.questionId] === 'undefined')) {
            return;
        }

        this.handleInputChange.call(
            this,
            this.props.questionId,
            this.props.input.default
        );
    }

    handleInputChange(questionId, value) {
        this.props.onAnswerChange(
            questionId,
            value,
            this.props.validations,
            this.props.validateOn
        );
    }

    handleInputBlur(questionId, value) {
        this.props.onQuestionBlur(
            questionId,
            value,
            this.props.validations,
            this.props.validateOn
        );
    }

    render() {
        let Input = InputTypes[this.props.input.type];
        if (!Input) {
            throw new Error('Winterfell: Input Type "' + this.props.input.type +
                '" not defined as Winterfell Input Type');
        }

        /*
         * Conditional Questions
         */
        let conditionalItems = [];
        let classes = {...this.props.classes};
        classes.question = "conditionalQuestion";

        if (typeof this.props.input.options !== 'undefined') {
            this.props.input.options
                .filter(option => {
                    return this.props.value instanceof Array
                        ? this.props.value.indexOf(option.value) > -1
                        : this.props.value == option.value;
                })
                .filter(option => {
                    return typeof option.conditionalQuestions !== 'undefined'
                        && option.conditionalQuestions.length > 0;
                })
                .forEach(option =>
                    [].forEach.bind(option.conditionalQuestions, conditionalQuestion => {
                            conditionalItems.push(
                                <Question key={conditionalQuestion.questionId}
                                          questionSetId={this.props.questionSetId}
                                          questionId={conditionalQuestion.questionId}
                                          question={conditionalQuestion.question}
                                          text={conditionalQuestion.text}
                                          postText={conditionalQuestion.postText}
                                          validateOn={conditionalQuestion.validateOn}
                                          validations={conditionalQuestion.validations}
                                          value={this.props.questionAnswers[conditionalQuestion.questionId]}
                                          input={conditionalQuestion.input}
                                          classes={classes}
                                          renderError={this.props.renderError}
                                          questionAnswers={this.props.questionAnswers}
                                          validationErrors={this.props.validationErrors}
                                          onAnswerChange={this.props.onAnswerChange}
                                          onQuestionBlur={this.props.onQuestionBlur}
                                          onKeyDown={this.props.onKeyDown}/>
                            );
                        }
                    )());
        }

        let value = typeof this.props.value !== 'undefined'
            ? this.props.value
            : typeof this.props.input.default !== 'undefined'
                ? this.props.input.default
                : undefined;

        let validationErrors = typeof this.props.validationErrors[this.props.questionId] !== 'undefined'
            ? this.props.validationErrors[this.props.questionId]
                .map(error => {
                    return typeof this.props.renderError === 'function'
                        ? this.props.renderError(error, this.props.questionId)
                        : (

                        <Overlay show={true}
                                 key={this.props.questionId + 'Error' + error.type}
                                 container={() => ReactDOM.findDOMNode(this.questionInputContainer)}
                                 target={() => ReactDOM.findDOMNode(this.questionInputContainer)}
                                 placement="left">
                            <Tooltip id="overload-left">{error.message}</Tooltip>
                        </Overlay>


                            // <div key={this.props.questionId + 'Error' + error.type}
                            //      className={this.props.classes.errorMessage}>
                            //     {error.message}
                            // </div>
                        );
                })
            : [];

        let extraprops = {};

        if (this.props.input.props) {
            extraprops = this.props.input.props;
        }

        let labelId = `${this.props.questionId}-label`;

        const inputContainerStyle = {
            position: 'relative',
        };

        return (
            <div className={this.props.classes.question}>
                {this.props.question
                    ? (
                        <label className={this.props.classes.label}
                               id={labelId}
                               htmlFor={this.props.questionId}>
                            {this.props.question}
                            {typeof this.props.renderRequiredAsterisk !== 'undefined'
                            && this.props.input.required
                                ? this.props.renderRequiredAsterisk()
                                : undefined}
                        </label>
                    )
                    : undefined}
                {this.props.text
                    ? (
                        <p className={this.props.classes.questionText}>
                            {this.props.text}
                        </p>
                    )
                    : undefined}
                {validationErrors}
                <div ref={input => this.questionInputContainer = input} style={inputContainerStyle}>
                    <Input name={this.props.questionId}
                           id={this.props.questionId}
                           labelId={labelId}
                           value={value}
                           text={this.props.input.text}
                           options={this.props.input.options}
                           placeholder={this.props.input.placeholder}
                           required={this.props.input.required}
                           classes={this.props.classes}
                           onChange={this.handleInputChange.bind(this, this.props.questionId)}
                           onBlur={this.handleInputBlur.bind(this, this.props.questionId)}
                           onKeyDown={this.props.onKeyDown}
                           {...extraprops}
                    />
                </div>
                {this.props.postText
                    ? (
                        <p className={this.props.classes.questionPostText}>
                            {this.props.postText}
                        </p>
                    )
                    : undefined}
                {conditionalItems}
            </div>
        );
    }

}

Question.propTypes = {
    questionAnswers: PropTypes.object,
    questionSetId: PropTypes.string,
    questionId: PropTypes.string,
    question: PropTypes.string,
    validateOn: PropTypes.string,
    validations: PropTypes.array,
    text: PropTypes.string,
    postText: PropTypes.string,
    value: PropTypes.any,
    input: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    validationErrors: PropTypes.object,
    onAnswerChange: PropTypes.func.isRequired,
    onQuestionBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    renderError: PropTypes.func,
    renderRequiredAsterisk: PropTypes.func,
};

Question.defaultProps = {
    questionSetId: undefined,
    questionId: undefined,
    question: '',
    validateOn: 'blur',
    validations: [],
    text: undefined,
    postText: undefined,
    value: undefined,
    input: {
        default: undefined,
        type: 'textInput',
        limit: undefined,
        placeholder: undefined
    },
    classes: {},
    questionAnswers: {},
    validationErrors: {},
    onAnswerChange: () => {
    },
    onQuestionBlur: () => {
    },
    onKeyDown: () => {
    },
    renderError: undefined,
    renderRequiredAsterisk: undefined
};

export default CSSModules(Question, styles);
