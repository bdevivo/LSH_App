import React, {PropTypes as T} from 'react';
import {FormControl, Row, Col} from 'react-bootstrap';
import styles from './Boolean.css';
import CSSModules from 'react-css-modules';

const classNames = require('classnames');

class BooleanItemEdit extends React.Component {

    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.createCancelStyleName = this.createCancelStyleName.bind(this);
    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            this.props.onSave();
        }
    }

    createCancelStyleName() {
        return classNames({
            'showCancel': this.props.hasTextChanged,
            'hideCancel': !this.props.hasTextChanged
        });
    }

    render() {
        return (
            <Row styleName="editRow">
                <Col md={11}>
                    <FormControl type="text"
                                 styleName="editItemText"
                                 placeholder="add text and press Enter"
                                 value={this.props.item.text}
                                 onChange={this.props.onEditItemTextChange}
                                 onKeyPress={this.handleKeyPress}/>
                </Col>

                <Col md={1}>
                    <a onClick={this.props.onCancel} title="Cancel edit" styleName={this.createCancelStyleName()}><span
                        className="glyphicon glyphicon-remove"></span></a>
                </Col>


            </Row>
        );
    }
}

BooleanItemEdit.propTypes = {
    item: T.object.isRequired,
    onEditItemTextChange: T.func.isRequired,
    onSave: T.func.isRequired,
    onCancel: T.func.isRequired,
    hasTextChanged: T.bool.isRequired
};

export default CSSModules(BooleanItemEdit, styles);
