import React from 'react';
import QuestionAnswerCondition from './QuestionAnswerCondition';
import UserPropsCondition from './UserPropsCondition';

class NavigationPage extends React.Component {
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
         <div>
            <h1>Question Navigation</h1>

            <div className="divScenario">
               <h3>Scenario 1</h3>

               <label htmlFor="selectInitialQuestion">Initial Question:</label>
               <select id="selectInitialQuestion">
                  <option defaultValue="q1">Question 1</option>
                  <option defaultValue="q2">Question 2</option>
                  <option defaultValue="q3">Question 3</option>
                  <option defaultValue="q4">Question 4</option>
               </select>


               <div className="divCondition">

                  <p>Condition 1</p>

                  <QuestionAnswerCondition />
                  <div>{" "}</div>
                  <UserPropsCondition expressionData = {userPropsExpressions} />

                  <label htmlFor="selectNextQuestion">Next Question:</label>
                  <select id="selectNextQuestion" defaultValue="q2">
                     <option defaultValue="q2">Question 2</option>
                     <option defaultValue="q3">Question 3</option>
                     <option defaultValue="q4">Question 4</option>
                  </select>

               </div>


            </div>

            <div className="divScenario">


               <div className="divCondition">

                  <p>Condition 2</p>

                  <QuestionAnswerCondition />
                  <div>{" "}</div>
                  <UserPropsCondition expressionData={userPropsExpressions} />

                  <label htmlFor="selectNextQuestion">Next Question:</label>
                  <select id="selectNextQuestion" defaultValue="q3">
                     <option defaultValue="q2">Question 2</option>
                     <option defaultValue="q3">Question 3</option>
                     <option defaultValue="q4">Question 4</option>
                  </select>

               </div>


            </div>


         </div>
      );
   }
}

export default NavigationPage;
