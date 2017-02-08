import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import * as questionHelpers from '../../../utils/questionHelpers';
import CSSModules from 'react-css-modules';
import styles from './QuestionSet.css';

const QuestionSet = ({qSet, panelTargets, questions}) => {



   let conditionalActionListItems = qSet.conditionalActions.map((ca, i) => {
      let question = questions.find(q => q._id === ca.questionId);
      let response;
      if (question) {
         response = questionHelpers.getSelectedResponse(question, ca.questionResponseId);
         let action = (ca.action == "goto" ? "GO TO" : "SUBMIT");
         let target = questionHelpers.getTargetPanelName(ca.targetPanelId, panelTargets);
         let wrappedTarget = (target ? `[${target}]` : "");

         return (
            <li key={i} styleName="conditionActionListItem">
               if [{question.name}] has answer [{response}] then [{action}] {wrappedTarget}
            </li>);
      }
   });

   let conditionalActionsDiv = null;
   if (qSet.conditionalActions.length > 0) {
      conditionalActionsDiv = (
         <div>
            <b>Conditional Actions: </b>
            <div styleName="conditionActionList">
               <ol>
                  {conditionalActionListItems}
               </ol>
            </div>
         </div>);
   }


   let panel_body =
      (<div>
         <p><b>Header: </b> {qSet.header}</p>
         {qSet.subHeader && qSet.subHeader.length > 0 && subHeader}
         {conditionalActionsDiv}
         <p><b>Default Action: </b> {defaultAction}</p>
         <p><b>Buttons:</b> {qSet.backButtonText}, {qSet.nextButtonText}</p>
      </div>);


   return (

      <Row styleName="questionPanelDiv">

         <Col md={12} styleName="questionPanelBodyDiv">
            { panel_body }
         </Col>

      </Row>
   );
};


QuestionSet.propTypes = {
   qSet: PropTypes.object.isRequired,
   panelTargets: PropTypes.array.isRequired,
   questions: PropTypes.array.isRequired
};

export default CSSModules(QuestionSet, styles);


