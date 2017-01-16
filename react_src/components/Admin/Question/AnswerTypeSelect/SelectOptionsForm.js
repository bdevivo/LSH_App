import React, {PropTypes as T} from 'react';
import {FormControl, ControlLabel, Button, Row, Col} from 'react-bootstrap';
import OptionItemContainer from './OptionItemContainer';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styles from './SelectOptions.css';
import CSSModules from 'react-css-modules';

class SelectOptionsForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            this.props.onAddItem();
        }
    }

    render() {
        let optionItemList = this.props.options.map((item, i) => <OptionItemContainer
                optionItem={item}
                visualIndex={i}
                key={item.id}
                onDeleteItem={this.props.onDeleteItem}
                onEditItemSave={this.props.onEditItemSave}
                moveItem={this.props.moveItem}
            />
        );

        return (
            <div>
                <ControlLabel>Options</ControlLabel>

                <Row styleName="optionItemForm">
                    <Col md={11}>
                        <FormControl componentClass="textarea" value={this.props.newItemText}
                                     placeholder="add option text and press Enter"
                                     onChange={this.props.onAddOptionTextChange} onKeyPress={this.handleKeyPress}/>
                    </Col>
                </Row>

                <div styleName="optionItemList">
                    {optionItemList}
                </div>

            </div>
        );
    }
}

SelectOptionsForm.propTypes = {
    options: T.array.isRequired,
    newItemText: T.string.isRequired,
    onAddOptionTextChange: T.func.isRequired,
    onAddItem: T.func.isRequired,
    onDeleteItem: T.func.isRequired,
    onEditItemSave: T.func.isRequired,
    moveItem: T.func.isRequired
};

export default DragDropContext(HTML5Backend)(CSSModules(SelectOptionsForm, styles));
