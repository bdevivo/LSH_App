import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import ConditionalQuestionEditContainer from './ConditionalQuestionEditContainer';
import styles from './QuestionSet.css';
import CSSModules from 'react-css-modules';
const classNames = require('classnames');

const QSetQuestionAddEdit = ({qSetQuestion, questions, qSetQuestionFunctions, canAddConditionalQuestion}) => {

    let {onQuestionChanged, addConditionalQuestion} = qSetQuestionFunctions;
    let labelColSize = 2;
    let inputColSize = 8;


    let conditionalQuestionList = qSetQuestion.conditionalQuestions.map((cq, i) =>
        <ConditionalQuestionEditContainer
            key={i}
            qSetQuestion={qSetQuestion}
            conditionalQuestion={cq}
            questions={questions}
            questionSetFunctions={qSetQuestionFunctions}/>
    );

    let questionOptions = questions.map((q, i) =>
        <option key={i} value={q._id}>{q.name}</option>
    );
    questionOptions.unshift(<option key="select" value="0">select question...</option>);

    return (
        <div>


            <Form horizontal styleName="editForm">

                {/* QUESTION */}
                <Col componentClass={ControlLabel} styleName="inlineLabel" sm={1}>Question:</Col>
                <FormControl styleName="formInputActionSelectWide"
                             componentClass="select"
                             placeholder="select question"
                             name="question"
                             defaultValue={qSetQuestion.questionId}
                             onChange={onQuestionChanged}>
                    {questionOptions}
                </FormControl>


                {/* CONDITIONAL QUESTIONS */}
                <FormGroup styleName="conditionalQuestionFormGroup">
                    <Col sm={3} styleName="subHeaderLeftCol">
                        <h4>Conditional Questions</h4>
                    </Col>
                    <Col sm={6}>
                        <Button type="button" className="btn btn-sm btn-default"
                                disabled={!canAddConditionalQuestion}
                                onClick={addConditionalQuestion}>Add New</Button>
                    </Col>
                </FormGroup>

                {conditionalQuestionList}

            </Form>


        </div>
    );


};

QSetQuestionAddEdit.propTypes = {
    qSetQuestion: T.object.isRequired,
    questions: T.array.isRequired,
    qSetQuestionFunctions: T.object.isRequired,
    canAddConditionalQuestion: T.bool.isRequired
};

export default CSSModules(QSetQuestionAddEdit, styles);
