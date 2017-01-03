import React, {PropTypes as T} from 'react';
import SelectOptionsForm from './SelectOptionsForm';
import update from 'immutability-helper';

class SelectOptionsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionItems: this.props.optionItems,
            newItemText: "",
            isMovingItem: false
        };

        this.onAddItemTextChange = this.onAddItemTextChange.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.moveItem = this.moveItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.isMovingItem && nextProps.optionItems !== this.state.optionItems) {
            this.setState({optionItems: nextProps.optionItems});
        }
    }

    onAddItemTextChange(event) {
        // do not process Enter key, since this action invokes Save
        if (event.target.value.charCodeAt(0) == 10) {
            return;
        }

        let newState = update(this.state, {
                newItemText: {$set: event.target.value}
            }
        );

        this.setState(newState);
    }

    onAddItem() {
        this.props.selectionOptionFunctions.onAddSelectOption(this.state.newItemText);
        let newState = update(this.state, {
                newItemText: {$set: ""}
            }
        );

        this.setState(newState);
    }

    moveItem(dragIndex, hoverIndex) {
        const {optionItems} = this.state;
        const dragItem = optionItems[dragIndex];

        let newState = update(this.state, {
            optionItems: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragItem]
                ]},
            isMovingItem: {$set: true}
        });

        this.setState(newState);
        this.props.selectionOptionFunctions.reOrderOptionItems(newState.optionItems);    // update the option items in the parent question
        this.setState(update(this.state, {isMovingItem: {$set: false}}));
    }

    render() {
        return (<SelectOptionsForm
            options={this.state.optionItems}
            newItemText={this.state.newItemText}
            onAddItem={this.onAddItem}
            onDeleteItem={this.props.selectionOptionFunctions.onDeleteSelectionOption}
            onAddOptionTextChange={this.onAddItemTextChange}
            onEditItemSave={this.props.selectionOptionFunctions.onEditSelectionOptionSave}
            moveItem={this.moveItem}
        />);
    }
}

SelectOptionsContainer.propTypes = {
    optionItems: T.array.isRequired,
    selectionOptionFunctions: T.object.isRequired
};

export default SelectOptionsContainer;
