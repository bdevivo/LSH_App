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

      this.onAddOptionTextChange = this.onAddOptionTextChange.bind(this);
      this.onAddOption = this.onAddOption.bind(this);
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
      this.setState(update(this.state.optionItem, {
            text: {$set: event.target.value}
         }
      ));
   }

   onEditItemSave() {
      this.props.onEditItemSave(this.state.optionItem);
      this.toggleEditMode();
   }

   onEditItemCancel() {
      // restore option text state
      this.setState(update(this.state.optionItem, {
            text: {$set: this.props.optionItem.text}
         }
      ));
      this.toggleEditMode();
   }

   render() {

      let optionItem = (<OptionItem
                           item={this.state.optionItem}
                           onEditItem={this.onEditItem}
                           onDeleteItem={this.props.onDeleteItem}
                        />);

      let optionItemEdit = (<OptionItemEdit
                              item={this.state.optionItem}
                              onEditItemTextChange={this.onEditItemTextChange}
                              onSave={this.onEditItemSave}
                              onCancel={this.onEditItemCancel()}
                        />);

      return (<div>
               {!this.state.inEditMode && optionItem}
               {this.state.inEditMode && optionItemEdit}
            </div>);
   }
}

OptionItemContainer.propTypes = {
   optionItem: T.object.isRequired,
   onDeleteItem: T.func.isRequired,
   onEditItemSave: T.func.isRequired
};


export default OptionItemContainer;
