import React, {PropTypes} from 'react';
import SelectOptionForm from './SelectOptionForm';
import update from 'immutability-helper';
import {uuid} from 'uuid';


class SelectOptionContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         options: this.props.options,
         newItemText: ""
      };

      this.onAddOptionTextChange = this.onAddOptionTextChange.bind(this);
      this.onAddOption = this.onAddOption.bind(this);
   }

   onAddOptionTextChange(event) {
      let newState = update(this.state, {
            newItemText: {$set: event.target.value}
         }
      );

      this.setState(newState);
   }

   onAddOption(optionText) {
      let newId = uuid.v1();
      let newIndex = this.state.options.length + 1;
      let newOption = {
         text: optionText,
         id: newId,
         index: newIndex
      };

      this.setState(update(this.state, {
         options: {$push: newOption}
      }));
   }

   onDeleteOption(optionId) {
      let delOption = this.state.options.filter(opt => opt.id === optionId)[0];
      this.setState(update(this.state.options, {$splice: [[delOption.index, 1]]}));
   }


   render() {
      return <SelectOptionForm
         options={this state.options}
         onAddOption={this.onAddOption}
         onAddOptionTextChange={this.onAddOptionTextChange}
      />;
   }
}

SelectOptionContainer.propTypes = {
   options: PropTypes.array.isRequired
};


export default SelectOptionContainer;
