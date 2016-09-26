import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class QuestionItem extends Component {
   render() {
      return <li>{this.props.name}</li>;
   }
}

QuestionItem.propTypes = {
   name: PropTypes.string.isRequired
};

export default QuestionItem;
