import React, { Component, PropTypes } from 'react';

class ConditionExpressionInputUserProp extends Component {
   render() {
      return (
         <tr>
            <td>
               <select id="andOr">
                  <option value="and">And</option>
                  <option value="or">Or</option>
               </select>
            </td>

            <td>
               <select id="userProp" >
                  <option value="type">User Type</option>
                  <option value="region">Region</option>
               </select>
            </td>

            <td>
               <select id="operator" >
                  <option value="equals">=</option>
                  <option value="notEquals">&lt;&gt;</option>
                  <option value="greaterThan">&gt;</option>
                  <option value="greaterThanOrEqual">&gt;=</option>
                  <option value="lessThan">&lt;</option>
                  <option value="lessThanOrEqual">&lt;=</option>
                  <option value="contains">contains</option>
                  <option value="notContains">does not contain</option>
               </select>
            </td>

            <td>
               <select id="userProp" >
                  <option value="indivBuyer">Individual Buyer</option>
                  <option value="corpBuyer">Corporate Buyer</option>
               </select>
            </td>
         </tr>
      );
   }
}

export default ConditionExpressionInputUserProp;
