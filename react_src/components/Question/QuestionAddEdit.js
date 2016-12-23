import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Radio, Modal} from 'react-bootstrap';
import styles from './Question.css';
import CSSModules from 'react-css-modules';


const QuestionAddEdit = ({question, pageTitle, handleSubmit, handleCancel, selectedQuestionOption, onQuestionTypeSelectionChanged}) => {

    let answerTypeDetails = [];
    switch (selectedQuestionOption) {
        case "singleSelect":
        case "multiSelect": {
            answerTypeDetails.push("SELECTION");
            break;
        }

        case "boolean": {
            answerTypeDetails.push("BOOLEAN");
            break;
        }

        case "text": {
            answerTypeDetails.push("TEXT");
            break;
        }

        default:
        // do nothing
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>{pageTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form horizontal>

                    <FormGroup controlId="formControlsQuestionText">
                        <ControlLabel>Question Text</ControlLabel>
                        <FormControl className="textarea" placeholder="add question text" value={question.text} />
                    </FormGroup>

                    <FormGroup controlId="formControlsQuestionType">
                        <Radio value="singleSelect" checked={selectedQuestionOption === "singleSelect"}
                               onChange={onQuestionTypeSelectionChanged}>Single Select</Radio>
                        <Radio value="multiSelect" checked={selectedQuestionOption === "multiSelect"}
                               onChange={onQuestionTypeSelectionChanged}>Multiple Select</Radio>
                        <Radio value="boolean" checked={selectedQuestionOption === "boolean"}
                               onChange={onQuestionTypeSelectionChanged}>Boolean</Radio>
                        <Radio value="text" checked={selectedQuestionOption === "text"}
                               onChange={onQuestionTypeSelectionChanged}>Text</Radio>
                    </FormGroup>

                    <FormGroup>
                        <label>Answer Type: </label>
                        <p>{answerTypeDetails}</p>
                    </FormGroup>


                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col md={3} mdOffset={2}>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </Col>
                    <Col md={3}>
                        <Button onClick={handleSubmit}>Save</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </div>
    );


};

QuestionAddEdit.propTypes = {
    question: T.object.isRequired,
    pageTitle: T.string.isRequired,
    handleSubmit: T.func.isRequired,
    handleCancel: T.func.isRequired,
    selectedQuestionOption: T.string.isRequired,
    onQuestionTypeSelectionChanged: T.func.isRequired
};

export default CSSModules(QuestionAddEdit, styles);