import React, {PropTypes as T} from 'react';
import PanelTextItem from './PanelTextItem';
import PanelTextItemEdit from './PanelTextItemEdit';
import update from 'immutability-helper';

class PanelItemContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panelTextItem: this.props.panelTextItem,
            inEditMode: false,
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.onEditItem = this.onEditItem.bind(this);
        this.onEditItemTextChange = this.onEditItemTextChange.bind(this);
        this.onEditItemSave = this.onEditItemSave.bind(this);
        this.onEditItemCancel = this.onEditItemCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.panelTextItem !== this.state.panelTextItem) {
            this.setState({panelTextItem: nextProps.panelTextItem});
        }
    }

    toggleEditMode() {
        this.setState(update(this.state, {
            inEditMode: {$set: !this.state.inEditMode}
        }));
    }

    ///////////////////////////////
    // Callbacks for panelTextItem
    ///////////////////////////////

    onEditItem() {
        this.toggleEditMode();
    }

    ///////////////////////////////
    // Callbacks for panelItemEdit
    ///////////////////////////////

    onPanelItemTextChange(event) {
        // do not process Enter key, since this action invokes Save
        if (event.target.value.charCodeAt(0) == 10) {
            return;
        }

        let newState = update(this.state, {
            panelTextItem: {text: {$set: event.target.value}}
        });

        this.setState(newState);
    }

    onEditItemSave() {
        this.props.onPanelItemSave(this.state.panelTextItem);
        this.toggleEditMode();
    }

    onEditItemCancel() {
        // restore option text state
        let newState = update(this.state, {
            panelTextItem: {text: {$set: this.props.panelTextItem.text}},
            inEditMode: {$set: false}
        });

        this.setState(newState);
    }


    render() {

        let panelItem = (<PanelTextItem
            itemText={this.state.panelTextItem.text}
            onEditItem={this.onEditItem}
        />);

        let panelItemEdit = (<PanelTextItemEdit
            itemText={this.state.panelTextItem.text}
            onPanelItemTextChange={this.onPanelItemTextChange}
            onSave={this.onEditItemSave}
            onCancel={this.onEditItemCancel}
        />);

        return (<div>
            {!this.state.inEditMode && panelItem}
            {this.state.inEditMode && panelItemEdit}
        </div>);
    }
}

PanelItemContainer.propTypes = {
    panelTextItem: T.object.isRequired,
    onPanelItemSave: T.func.isRequired,
};


export default PanelItemContainer;
