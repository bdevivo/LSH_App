import React, {PropTypes as T} from 'react';
import {Row, Col, ControlLabel} from 'react-bootstrap';
import styles from './Boolean.css';
import CSSModules from 'react-css-modules';



const BooleanItem = ({item, onEditItem}) => {

    return (
        <div>

            <Row>
                <Col md={1}>
                    <a onClick={onEditItem} title="Edit"><span className="glyphicon glyphicon-pencil"></span></a>
                </Col>

                <Col md={11} styleName="itemTextCol">
                    <div>
                        {item.text}
                    </div>
                </Col>

            </Row>

        </div>
    );

};

BooleanItem.propTypes = {
    item: T.object.isRequired,
    onEditItem: T.func.isRequired,
};


export default CSSModules(BooleanItem, styles);

