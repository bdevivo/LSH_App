import React from 'react';
import QuestionAnswerCondition from './QuestionAnswerCondition';
import UserPropsCondition from './UserPropsCondition';

class NavigationPage extends React.Component {
   render() {
      return (
         <div>
            <h1>Question Navigation</h1>

            <div className="divScenario">
               <h3>Scenario 1</h3>

               <label htmlFor="selectInitialQuestion">Initial Question:</label>
               <select id="selectInitialQuestion">
                  <option value="q1">Question 1</option>
                  <option value="q2">Question 2</option>
                  <option value="q3">Question 3</option>
                  <option value="q4">Question 4</option>
               </select>


               <div className="divCondition">

                  <p>Condition 1</p>

                  <QuestionAnswerCondition />
                  <div>{" "}</div>
                  <UserPropsCondition />

                  <label htmlFor="selectNextQuestion">Next Question:</label>
                  <select id="selectNextQuestion" value="q2">
                     <option value="q2">Question 2</option>
                     <option value="q3">Question 3</option>
                     <option value="q4">Question 4</option>
                  </select>

               </div>


            </div>

            <div className="divScenario">


               <div className="divCondition">

                  <p>Condition 2</p>

                  <QuestionAnswerCondition />
                  <div>{" "}</div>
                  <UserPropsCondition />

                  <label htmlFor="selectNextQuestion">Next Question:</label>
                  <select id="selectNextQuestion" value="q3">
                     <option value="q2">Question 2</option>
                     <option value="q3">Question 3</option>
                     <option value="q4">Question 4</option>
                  </select>

               </div>


            </div>


         </div>
      );
   }
}

export default NavigationPage;
