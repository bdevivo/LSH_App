import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, Button, ButtonGroup} from 'react-bootstrap';
import * as optionHelpers from '../../../utils/questionHelpers';
import styles from './QuestionSet.css';
import CSSModules from 'react-css-modules';
const classNames = require('classnames');

const ConditionalQuestionEdit = ({conditionalQuestion, conditionalQuestionFunctions, questions, isAddMode, isSaveEnabled}) => {

    let {onUpdateConditionalResponse, onUpdateConditionalTarget, onSave, onCancel, onRemove} = conditionalQuestionFunctions;

    // Each response is a selectOptionItem or booleanOption member of the question
   let potentialResponses = optionHelpers.getPotentialResponses(conditionalQuestion);
    let responseOptions = potentialResponses.map((response, i) =>
        <option key={i} value={response.id}>{response.text}</option>
    );
    responseOptions.unshift(<option key="select" value="0">select answer...</option>);


   let targetOptions = questions.map((q, i) =>
      <option key={i} value={q._id}>{q.name}</option>
   );
   targetOptions.unshift(<option key="select" value="0">select question...</option>);


    let buttonGroup = isAddMode
        ? (<div styleName="buttonDiv">

            <Button type="button" className="btn btn-xs btn-default" onClick={onSave} disabled={!isSaveEnabled}>Save</Button>
            {' '}
            <Button type="button" className="btn btn-xs btn-default" onClick={onCancel}>Cancel</Button>

        </div>)
        : (<div styleName="buttonDiv">
            <Button type="button" className="btn btn-xs btn-default" onClick={onRemove}>
                <span className="glyphicon glyphicon-remove"></span>
            </Button>

        </div>);

    return (
        <div styleName="formInputActionDiv">
            <FormGroup controlId="formControlsSelectConditionalQuestion">
               {/*SELECT RESPONSE*/}
                <Col sm={12} styleName="selectColLeft">
                    if answer is {' '}
                    <FormControl styleName="formInputActionSelectWide"
                                 componentClass="select"
                                 placeholder="select answer"
                                 name="response"
                                 value={conditionalQuestion.responseId}
                                 onChange={onUpdateConditionalResponse}>
                        {responseOptions}
                    </FormControl>
                </Col>

            </FormGroup>

           {/*SELECT TARGET*/}
            <FormGroup controlId="formControlsSelectConditionalQuestion2">
                <Col sm={10} styleName="selectColLeft">
                    then show question {' '}
                    <FormControl styleName="formInputActionSelectWide"
                                 componentClass="select"
                                 name="target"
                                 value={conditionalQuestion.targetQuestionId}
                                 onChange={onUpdateConditionalTarget}>
                       {targetOptions}
                    </FormControl>
                </Col>

                <Col sm={2}>
                    {buttonGroup}
                </Col>

            </FormGroup>


        </div>
    );


};

ConditionalQuestionEdit.propTypes = {
    conditionalQuestion: T.object.isRequired,
    questions: T.array.isRequired,
    conditionalQuestionFunctions: T.object.isRequired,
    isAddMode: T.bool.isRequired,
    isSaveEnabled: T.bool.isRequired
};

export default CSSModules(ConditionalQuestionEdit, styles);
