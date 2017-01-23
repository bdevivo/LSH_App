import React, {PropTypes as T} from 'react';
import {Form, FormGroup, FormControl, ControlLabel, Radio, Col} from 'react-bootstrap';
import PanelTextItemContainer from './PanelTextItemContainer';
import styles from './QuestionPanel.css';
import CSSModules from 'react-css-modules';

const QuestionPanel = ({qPanel, onPanelItemSave}) => {

    let panelNameItem = {
        name: "name",
        text: qPanel.name,
        placeholder: "add panel name"
    };


    return (
        <Form horizontal styleName="editForm">

            <FormGroup controlId="formControlsPanelName">
                <Col componentClass={ControlLabel} styleName="inlineLabel" sm={1}>Name</Col>
                <Col sm={11} styleName="inlineTextCol">
                    <PanelTextItemContainer onPanelItemSave={onPanelItemSave} panelTextItem={panelNameItem} />
                </Col>
            </FormGroup>

            <FormGroup controlId="formControlsQuestionText">
                <ControlLabel>{labelForFirstTextField}</ControlLabel>
                <div styleName="conditionalToggle">
                    <a onClick={onToggleConditionalQuestionText} title={toggleToolTip}>{conditionalToggleText}</a>
                </div>
                <FormControl name="text" componentClass="textarea" placeholder="add text" value={question.text}
                             required onChange={onTextFieldChanged}/>
            </FormGroup>

            <FormGroup controlId="formControlsQuestionAlternateText" styleName={createResourcesTextStyleName()}>
                <ControlLabel>Alternate Text for Resources</ControlLabel>

                <FormControl name="textForResources" componentClass="textarea" placeholder="add text"
                             value={question.textForResources}
                             onChange={onTextFieldChanged}/>
            </FormGroup>

            <FormGroup controlId="formControlsQuestionType">
                <Radio value="singleSelect" checked={answerType === "singleSelect"}
                       onChange={onAnswerTypeChanged}>Single Select</Radio>
                <Radio value="multiSelect" checked={answerType === "multiSelect"}
                       onChange={onAnswerTypeChanged}>Multiple Select</Radio>
                <Radio value="boolean" checked={answerType === "boolean"}
                       onChange={onAnswerTypeChanged}>Boolean</Radio>
                <Radio value="text" checked={answerType === "text"}
                       onChange={onAnswerTypeChanged}>Text</Radio>
            </FormGroup>

            <div styleName="answerTypeDetails">
                {answerTypeDetails}
            </div>


        </Form>
    );
    };

    QuestionPanel.propTypes = {
        qPanel: T.object.isRequired,
        onEditItemSave: T.func.isRequired
    };

    export default CSSModules(QuestionPanel, styles);
