import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import * as questionHelpers from '../../../utils/questionHelpers';
import CSSModules from 'react-css-modules';
import styles from './QuestionPanel.css';

const QuestionPanel = ({qPanel, panelTargets, questions}) => {

   let subHeader = <p><b>Sub-header: </b> {qPanel.subHeader}</p>;
   let defaultAction;
   if (qPanel.defaultAction.action === "goto") {
      defaultAction = "GO TO " + questionHelpers.getTargetPanelName(qPanel.defaultAction.target, panelTargets);
   }
   else {
      defaultAction = "SUBMIT";
   }

   let conditionalActionListItems = qPanel.conditionalActions.map((ca, i) => {
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
   if (qPanel.conditionalActions.length > 0) {
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
         <p><b>Header: </b> {qPanel.header}</p>
         {qPanel.subHeader && qPanel.subHeader.length > 0 && subHeader}
         {conditionalActionsDiv}
         <p><b>Default Action: </b> {defaultAction}</p>
         <p><b>Buttons:</b> {qPanel.backButtonText}, {qPanel.nextButtonText}</p>
      </div>);


   return (

      <Row styleName="questionPanelDiv">

         <Col md={12} styleName="questionPanelBodyDiv">
            { panel_body }
         </Col>

      </Row>
   );
};


QuestionPanel.propTypes = {
   qPanel: PropTypes.object.isRequired,
   panelTargets: PropTypes.array.isRequired,
   questions: PropTypes.array.isRequired
};

export default CSSModules(QuestionPanel, styles);


