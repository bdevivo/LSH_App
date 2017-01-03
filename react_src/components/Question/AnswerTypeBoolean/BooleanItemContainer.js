import React, {PropTypes as T} from 'react';
import {Row, Col, ControlLabel} from 'react-bootstrap';
import BooleanItem from './BooleanItem';
import BooleanItemEdit from './BooleanItemEdit';
import update from 'immutability-helper';

class BooleanItemContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booleanItem: this.props.booleanItem,
            inEditMode: this.props.booleanItem.text.length == 0,  // if no text has been specified yet, start in Edit mode
            hasTextChanged: false
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.onEditItem = this.onEditItem.bind(this);
        this.onEditItemTextChange = this.onEditItemTextChange.bind(this);
        this.onEditItemSave = this.onEditItemSave.bind(this);
        this.onEditItemCancel = this.onEditItemCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.booleanItem !== this.state.booleanItem) {
            this.setState({booleanItem: nextProps.booleanItem});
        }
    }

    toggleEditMode() {
        this.setState(update(this.state, {
            inEditMode: {$set: !this.state.inEditMode}
        }));
    }

    ///////////////////////////////
    // Callbacks for booleanItem
    ///////////////////////////////

    onEditItem() {
        this.toggleEditMode();
    }

    ///////////////////////////////
    // Callbacks for booleanItemEdit
    ///////////////////////////////

    onEditItemTextChange(event) {
        // do not process Enter key, since this action invokes Save
        if (event.target.value.charCodeAt(0) == 10) {
            return;
        }

        let newState = update(this.state, {
            booleanItem: {text: {$set: event.target.value}},
            hasTextChanged: {$set: true}
        });

        this.setState(newState);
    }

    onEditItemSave() {
        this.props.onEditItemSave(this.state.booleanItem);
        this.setState(update(this.state, {
            inEditMode: {$set: !this.state.inEditMode},
            hasTextChanged: {$set: false}
        }));
    }

    onEditItemCancel() {
        // restore option text state
        let newState = update(this.state, {
            booleanItem: {text: {$set: this.props.booleanItem.text}},
            inEditMode: {$set: false},
            hasTextChanged: {$set: false}
        });

        this.setState(newState);
    }


    render() {

        let item = this.state.booleanItem;

        let booleanItem = (<BooleanItem
            item={item}
            onEditItem={this.onEditItem}
        />);

        let booleanItemEdit = (<BooleanItemEdit
            item={item}
            onEditItemTextChange={this.onEditItemTextChange}
            onSave={this.onEditItemSave}
            onCancel={this.onEditItemCancel}
            hasTextChanged={this.state.hasTextChanged}
        />);

        return (
            <div>
                <Row>
                    <ControlLabel>{item.prompt}</ControlLabel>
                </Row>
                {!this.state.inEditMode && booleanItem}
                {this.state.inEditMode && booleanItemEdit}
            </div>);
    }
}

BooleanItemContainer.propTypes = {
    booleanItem: T.object.isRequired,
    onEditItemSave: T.func.isRequired,
};


export default BooleanItemContainer;
