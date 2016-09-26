import React, { Component, PropTypes } from 'react';

class ConditionExpressionQuestionAnswer extends Component {
   render() {
      return (
         <tr>
            <td>{this.props.expressionData.andOr}</td>
            <td>{this.props.expressionData.question}</td>
            <td>{this.props.expressionData.operator}</td>
            <td>{this.props.expressionData.value}</td>
         </tr>
      );
   }
}

ConditionExpressionQuestionAnswer.propTypes = {
   expressionData: PropTypes.shape(
   {
      andOr: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      operator: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
   }).isRequired
};

export default ConditionExpressionQuestionAnswer;
