import React, {PropTypes as T} from 'react';
import {Row, Col} from 'react-bootstrap';
import styles from './QuestionPanel.css';
import CSSModules from 'react-css-modules';

const PanelTextItem = ({itemText, onEditItem}) => {

    return (
        <div>
            <Row>
                <Col md={3}>
                    <a onClick={onEditItem}><span className="glyphicon glyphicon-pencil"></span></a>
                </Col>
                <Col md={8} styleName="itemTextCol">
                    <div>
                        {itemText}
                    </div>
                </Col>

            </Row>
        </div>
    );
};

PanelTextItem.propTypes = {
    itemText: T.string.isRequired,
    onEditItem: T.func.isRequired
};

export default CSSModules(PanelTextItem, styles);

