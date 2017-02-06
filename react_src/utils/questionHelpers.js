export function getPotentialResponses(question) {
   if(question.answerType.includes("Select")) {
      return question.selectOptionItems;
   }
   else if (question.answerType === "boolean") {
      // project the Boolean options into the same structure as the Select options
      return [
         {
            id: "yes",
            text: question.booleanOptions.yesText
         },
         {
            id: "no",
            text: question.booleanOptions.noText
         }
      ];
   }
}

export function getSelectedResponse(question, responseId) {
   if (question.answerType.includes("Select")) {
      let response = question.selectOptionItems.find(x => x.id == responseId);
      return (response ? response.text : "");
   }
   else if (question.answerType === "boolean") {
      return (responseId === "yes" ? question.booleanOptions.yesText : question.booleanOptions.noText);
   }
}


export function getTargetPanelName(targetId, panelTargets) {
   let targetPanel = panelTargets.find(x => x.id == targetId);
   return (targetPanel ? targetPanel.name : "");
}
