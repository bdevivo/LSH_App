import React, {PropTypes as T} from 'react';
import OptionItem from './OptionItem';
import OptionItemEdit from './OptionItemEdit';
import update from 'immutability-helper';

class OptionItemContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionItem: this.props.optionItem,
            inEditMode: false,
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.onEditItem = this.onEditItem.bind(this);
        this.onEditItemTextChange = this.onEditItemTextChange.bind(this);
        this.onEditItemSave = this.onEditItemSave.bind(this);
        this.onEditItemCancel = this.onEditItemCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.optionItem !== this.state.optionItem) {
            this.setState({optionItem: nextProps.optionItem});
        }
    }

    toggleEditMode() {
        this.setState(update(this.state, {
            inEditMode: {$set: !this.state.inEditMode}
        }));
    }

    ///////////////////////////////
    // Callbacks for OptionItem
    ///////////////////////////////

    onEditItem() {
        this.toggleEditMode();
    }

    ///////////////////////////////
    // Callbacks for OptionItemEdit
    ///////////////////////////////

    onEditItemTextChange(event) {
        // do not process Enter key, since this action invokes Save
        if (event.target.value.charCodeAt(0) == 10) {
            return;
        }

        let newState = update(this.state, {
            optionItem: {text: {$set: event.target.value}}
        });

        this.setState(newState);
    }

    onEditItemSave() {
        this.props.onEditItemSave(this.state.optionItem);
        this.toggleEditMode();
    }

    onEditItemCancel() {
        // restore option text state
        let newState = update(this.state, {
            optionItem: {text: {$set: this.props.optionItem.text}},
            inEditMode: {$set: false}
        });

        this.setState(newState);
       // this.toggleEditMode();
    }


    render() {

        let optionItem = (<OptionItem
            item={this.state.optionItem}
            visualIndex={this.props.visualIndex}
            onEditItem={this.onEditItem}
            onDeleteItem={this.props.onDeleteItem}
            moveItem={this.props.moveItem}
        />);

        let optionItemEdit = (<OptionItemEdit
            item={this.state.optionItem}
            onEditItemTextChange={this.onEditItemTextChange}
            onSave={this.onEditItemSave}
            onCancel={this.onEditItemCancel}
        />);

        return (<div>
            {!this.state.inEditMode && optionItem}
            {this.state.inEditMode && optionItemEdit}
        </div>);
    }
}

OptionItemContainer.propTypes = {
    optionItem: T.object.isRequired,
    visualIndex: T.number.isRequired,
    onDeleteItem: T.func.isRequired,
    onEditItemSave: T.func.isRequired,
    moveItem: T.func.isRequired
};


export default OptionItemContainer;
