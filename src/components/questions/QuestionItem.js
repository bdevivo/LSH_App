import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class QuestionItem extends Component {
   render() {
      return <li>{this.props.title}</li>
   }
}

QuestionItem.propTypes = {
   title: PropTypes.string.isRequired
}

export default QuestionItem;
