import React, { Component, PropTypes } from 'react';
import ConditionExpressionQuestionAnswer from './ConditionExpressionQuestionAnswer';

class QuestionAnswerCondition extends Component {
   render() {

      let questionAnswerExpressions = [
         {
            andOr: "",
            question: "Major Field",
            operator: "contains",
            value: "biostatistics",
            index: 1
         },
         {
            andOr: "and",
            question: "Years of Experience",
            operator: ">=",
            value: "10",
            index: 2
         }
      ];

      return (
         <table className="conditionTable">

            <thead>
            <tr>
               <th>And/Or</th>
               <th>Answer for Question</th>
               <th>Operator</th>
               <th>Value</th>
            </tr>
            </thead>
            <tbody>
               {questionAnswerExpressions.map(
                  (exp) => <ConditionExpressionQuestionAnswer expressionData={exp} key={exp.index} />
               )}
            </tbody>
         </table>
      );
   }
}

export default QuestionAnswerCondition;
