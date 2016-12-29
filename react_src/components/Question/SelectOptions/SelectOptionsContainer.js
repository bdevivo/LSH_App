import React, {PropTypes as T} from 'react';
import SelectOptionForm from './SelectOptionsForm';
import update from 'immutability-helper';

class SelectOptionsContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         optionItems: this.props.optionItems,
         newItemText: ""
      };

      this.onAddOptionTextChange = this.onAddOptionTextChange.bind(this);
      this.onAddOption = this.onAddOption.bind(this);
   }

   onAddItemTextChange(event) {
      let newState = update(this.state, {
            newItemText: {$set: event.target.value}
         }
      );

      this.setState(newState);
   }

   render() {
      return (<SelectOptionForm
         options={this.state.options}
         onAddItem={this.props.onAddItem}
         onDeleteItem={this.props.onDeleteItem}
         onAddOptionTextChange={this.onAddItemTextChange}
         onEditItemSave={this.props.onEditItemSave}
      />);
   }
}

SelectOptionsContainer.propTypes = {
   optionItems: T.array.isRequired,
   onAddItem:  T.func.isRequired,
   onDeleteItem:  T.func.isRequired,
   onEditItemSave:  T.func.isRequired
};


export default SelectOptionsContainer;
