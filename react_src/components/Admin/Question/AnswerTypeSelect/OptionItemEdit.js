import React, {PropTypes as T} from 'react';
import {FormControl, Button, Row, Col} from 'react-bootstrap';
import styles from './SelectOptions.css';
import CSSModules from 'react-css-modules';


class OptionItemEdit extends React.Component {

    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            this.props.onSave();
        }
    }

    render() {
        return (
            <Row styleName="editRow">
                <Col md={11}>
                    <FormControl componentClass="textarea"
                                 styleName="editItemTextArea"
                                 value={this.props.item.text}
                                 autoFocus
                                 onChange={this.props.onEditItemTextChange}
                                 onKeyPress={this.handleKeyPress}/>
                </Col>

                <Col md={1}>
                    <a onClick={this.props.onCancel} title="Cancel edit"><span className="glyphicon glyphicon-remove"></span></a>
                </Col>


            </Row>
        );
    }
}

OptionItemEdit.propTypes = {
   item: T.object.isRequired,
   onEditItemTextChange: T.func.isRequired,
   onSave: T.func.isRequired,
   onCancel: T.func.isRequired
};

export default CSSModules(OptionItemEdit, styles);
