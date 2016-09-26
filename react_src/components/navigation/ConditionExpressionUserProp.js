import React, { Component, PropTypes } from 'react';

class ConditionExpressionUserProp extends Component {
   render() {
      return (
         <tr>
            <td>{this.props.expressionData.andOr}</td>
            <td>{this.props.expressionData.userProperty}</td>
            <td>{this.props.expressionData.operator}</td>
            <td>{this.props.expressionData.value}</td>
         </tr>
      );
   }
}

ConditionExpressionUserProp.propTypes = {
   expressionData: PropTypes.shape(
   {
      andOr: PropTypes.string.isRequired,
      operator: PropTypes.string.isRequired,
      userProperty: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
   }).isRequired
};

export default ConditionExpressionUserProp;
