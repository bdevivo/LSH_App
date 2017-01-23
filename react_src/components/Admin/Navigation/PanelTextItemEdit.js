import React, {PropTypes as T} from 'react';
import {FormControl, Button, Row, Col} from 'react-bootstrap';
import styles from './QuestionPanel.css';
import CSSModules from 'react-css-modules';


const PanelTextItemEdit = ({panelTextItem, onPanelItemTextChange, onSave, onCancel}) => {

    function handleKeyPress(event) {
        if (event.key == 'Enter') {
            onSave();
        }
    }

    return (
        <Row styleName="editRow">
            <Col md={11}>
                <FormControl type="text"
                             styleName="editItemTextArea"
                             value={panelTextItem.text}
                             placeholder={panelTextItem.placeholder}
                             autoFocus
                             onChange={onPanelItemTextChange}
                             onKeyPress={handleKeyPress}/>
            </Col>

            <Col md={1}>
                <a onClick={onCancel} title="Cancel edit"><span className="glyphicon glyphicon-remove"></span></a>
            </Col>


        </Row>
    );

};

PanelTextItemEdit.propTypes = {
    panelTextItem: T.object.isRequired,
    onPanelItemTextChange: T.func.isRequired,
    onSave: T.func.isRequired,
    onCancel: T.func.isRequired
};

export default CSSModules(PanelTextItemEdit, styles);
