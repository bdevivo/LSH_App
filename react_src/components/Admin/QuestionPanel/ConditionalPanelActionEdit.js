import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, Button, ButtonGroup} from 'react-bootstrap';
import styles from './QuestionPanel.css';
import CSSModules from 'react-css-modules';
const classNames = require('classnames');

const ConditionalPanelActionEdit = ({conditionalAction, conditionalActionsFunctions, questions, potentialResponses, panelTargets, isAddMode, isSaveEnabled}) => {

    let {onUpdateConditionalQuestion, onUpdateConditionalResponse, onUpdateConditionalTarget, onUpdateConditionalAction, onSave, onCancel, onRemove} = conditionalActionsFunctions;

    let questionOptions = questions.map((q, i) =>
        <option key={i} value={q._id}>{q.name}</option>
    );
    questionOptions.unshift(<option key="select" value="0">select question...</option>);

    // Each response is a selectOptionItem or booleanOption member of a Question
    let responseOptions = potentialResponses.map((response, i) =>
        <option key={i} value={response.id}>{response.text}</option>
    );
    responseOptions.unshift(<option key="select" value="0">select answer...</option>);

    let panelTargetOptions = panelTargets.map((panel, i) =>
        <option key={i} value={panel.id}>{panel.name}</option>
    );
    panelTargetOptions.unshift(<option key="select" value="0">select panel...</option>);

    const createTargetDivStyleName = () => {
        return classNames({
            'showTargetDiv': conditionalAction.action === "goto",
            'hideTargetDiv': conditionalAction.action === "submit"
        });
    };

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
            <FormGroup controlId="formControlsSelectConditionalAction">

                <Col sm={12} styleName="selectColLeft">
                    if{' '}
                    <FormControl styleName="formInputActionSelectWide"
                                 componentClass="select"
                                 placeholder="select question"
                                 name="question"
                                 value={conditionalAction.questionId}
                                 onChange={onUpdateConditionalQuestion}>
                        {questionOptions}
                    </FormControl>

                    {' '}has answer{' '}
                    <FormControl styleName="formInputActionSelectWide"
                                 componentClass="select"
                                 placeholder="select answer"
                                 name="response"
                                 value={conditionalAction.questionResponseId}
                                 onChange={onUpdateConditionalResponse}>
                        {responseOptions}
                    </FormControl>
                </Col>

            </FormGroup>

            <FormGroup controlId="formControlsSelectConditionalAction2">
                <Col sm={10} styleName="selectColLeft">
                    then{' '}
                    <FormControl styleName="formInputActionSelectSmall"
                                 componentClass="select"
                                 name="goto"
                                 value={conditionalAction.action}
                                 onChange={onUpdateConditionalAction}>
                        <option key="goto" value="goto">GO TO</option>
                        <option key="submit" value="submit">SUBMIT</option>
                    </FormControl>

                    <div styleName={createTargetDivStyleName()}>
                        {' '}panel{' '}
                        <FormControl styleName="formInputActionSelectWide"
                                     componentClass="select"
                                     placeholder="select panel"
                                     name="targetPanel"
                                     value={conditionalAction.targetPanelId}
                                     onChange={onUpdateConditionalTarget}>
                            {panelTargetOptions}
                        </FormControl>
                    </div>

                </Col>

                <Col sm={2}>
                    {buttonGroup}
                </Col>

            </FormGroup>


        </div>
    );


};

ConditionalPanelActionEdit.propTypes = {
    conditionalAction: T.object.isRequired,
    questions: T.array.isRequired,
    potentialResponses: T.array.isRequired,
    conditionalActionsFunctions: T.object.isRequired,
    panelTargets: T.array.isRequired,
    isAddMode: T.bool.isRequired,
    isSaveEnabled: T.bool.isRequired
};

export default CSSModules(ConditionalPanelActionEdit, styles);
