import React, { Component, PropTypes } from 'react';
import ConditionExpressionUserProp from './ConditionExpressionUserProp';
import ConditionExpressionInputUserProp from './ConditionExpressionInputUserProp';

class UserPropsCondition extends Component {
   render() {

      let userPropsExpressions = [
         {
            andOr: "",
            userProperty: "User Type",
            operator: "=",
            value: "buyer",
            index: 1
         },
         {
            andOr: "and",
            userProperty: "Region",
            operator: "=",
            value: 'northeast',
            index: 2
         }
      ];

   return (
         <table className="conditionTable">
            <thead>
               <tr>
                  <th>And/Or</th>
                  <th>User Property</th>
                  <th>Operator</th>
                  <th>Value</th>
               </tr>
            </thead>

            <tbody>
               {userPropsExpressions.map(
                  (exp) => <ConditionExpressionUserProp expressionData={exp} key={exp.index} />
               )}
               <ConditionExpressionInputUserProp />
            </tbody>
         </table>
      );
   }
}

UserPropsCondition.propTypes = {
   expressionData: PropTypes.array.isRequired
};

export default UserPropsCondition;
