import React, {PropTypes as T} from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import ConditionalQuestionEditContainer from './ConditionalQuestionEditContainer';
import styles from './QuestionSet.css';
import CSSModules from 'react-css-modules';
const classNames = require('classnames');

const QSetQuestionAddEdit = ({qSetQuestion, questions, qSetQuestionFunctions, canAddConditionalQuestion, isAddMode, isSaveEnabled}) => {

    let {onQuestionChanged, addConditionalQuestion, onSave, onCancel, onRemove} = qSetQuestionFunctions;

    let conditionalQuestionList = qSetQuestion.conditionalQuestions.map((cq, i) =>
        <ConditionalQuestionEditContainer
            key={i}
            qSetQuestion={qSetQuestion}
            conditionalQuestion={cq}
            questions={questions}
            qSetQuestionFunctions={qSetQuestionFunctions}/>
    );

    let questionOptions = questions.map((q, i) =>
        <option key={i} value={q._id}>{q.name}</option>
    );
    if (qSetQuestion && qSetQuestion.questionId == '0') {
        questionOptions.unshift(<option key="select" value="0">select question...</option>);
    }

    let buttonGroup = isAddMode
        ? (<div styleName="buttonDiv">

            <Button type="button" className="btn btn-xs btn-default" onClick={onSave}
                    disabled={!isSaveEnabled}>Save</Button>
            {' '}
            <Button type="button" className="btn btn-xs btn-default" onClick={onCancel}>Cancel</Button>

        </div>)
        : (<div styleName="buttonDiv">
            <Button type="button" className="btn btn-xs btn-default" onClick={onRemove}>
                <span className="glyphicon glyphicon-remove"></span>
            </Button>

        </div>);

    return (
        <Row styleName="questionSetQuestionDiv">
            <Col>

                <Row>
                    {/* QUESTION */}
                    <Col componentClass={ControlLabel} styleName="inlineLabel"
                         sm={2}>Question: {qSetQuestion.index}</Col>
                    <Col sm={10}>
                        <FormControl styleName="inputSelectQuestionSet"
                                     componentClass="select"
                                     placeholder="select question"
                                     name="question"
                                     defaultValue={qSetQuestion.questionId}
                                     onChange={onQuestionChanged}>
                            {questionOptions}
                        </FormControl>

                    </Col>
                </Row>

                {/* CONDITIONAL QUESTIONS */}
                <Row styleName="conditionalQuestionsRow">
                    <Col componentClass={ControlLabel} styleName="inlineLabelNoPadding" sm={2}>Sub-Questions:</Col>

                    <Col sm={9}>
                        <Button type="button" className="btn btn-xs btn-default"
                                disabled={!canAddConditionalQuestion}
                                onClick={addConditionalQuestion}>Add Sub-Question</Button>

                        {conditionalQuestionList}
                    </Col>

                </Row>

                <Row styleName="qSetQuestionButtonRow">
                    {buttonGroup}
                </Row>
            </Col>

        </Row>
    );


};

QSetQuestionAddEdit.propTypes = {
    qSetQuestion: T.object.isRequired,
    questions: T.array.isRequired,
    qSetQuestionFunctions: T.object.isRequired,
    canAddConditionalQuestion: T.bool.isRequired,
    isAddMode: T.bool.isRequired,
    isSaveEnabled: T.bool.isRequired
};

export default CSSModules(QSetQuestionAddEdit, styles);
