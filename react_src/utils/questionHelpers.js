
const questionTypeDisplayMap = {
    "singleSelect": "single select",
    "multiSelect": "multiple select",
    "boolean": "boolean",
    "text": "text",
    "textInput": "text",
    "textareaInput": "text area",
    "emailInput": "email",
    "fileInput": "file",
    "selectInput": "dropdown select",
    "checkboxInput": "single checkbox",
    "checkboxOptionsInput": "multiple checkboxes",
    "radioOptionsInput": "radio buttons"
};


export function getAsnwerTypeDisplayString(answerType) {
    return questionTypeDisplayMap[answerType];
}

export function getPotentialResponses(question) {


   switch(getAnswerTypeGroup(question.answerType)) {
       case "select": {
           return question.selectOptionItems;
       }

       case "boolean": {
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

       default:
           return [];
   }
}

export function getSelectedResponse(question, responseId) {

    switch(getAnswerTypeGroup(question.answerType)) {
        case "select": {
            let response = question.selectOptionItems.find(x => x.id == responseId);
            return (response ? response.text : "");
        }

        case "boolean": {
            return (responseId === "yes" ? question.booleanOptions.yesText : question.booleanOptions.noText);
        }

        default:
            return "";
    }
}


export function getTargetPanelName(targetId, panelTargets) {
   let targetPanel = panelTargets.find(x => x.id == targetId);
   return (targetPanel ? targetPanel.name : "");
}

export function questionHasSelectOptions(question) {
    return isSelectAnswerType(question.answerType);
}

export function questionIsBoolean(question) {
    return isBooleanAnswerType(question.answerType);
}

export function getQuestionTypeGroup(question) {
    return getAnswerTypeGroup(question.answerType);
}


export function isSelectAnswerType(answerType) {
    return ["radioOptionsInput", "checkboxOptionsInput", "selectInput", "singleSelect", "multiSelect"].includes(answerType);
}

export function isBooleanAnswerType(answerType) {
    return answerType == "boolean";
}

export function getAnswerTypeGroup(answerType) {
    if (isSelectAnswerType(answerType)) {
        return "select";
    }
    else if (isBooleanAnswerType(answerType)) {
        return "boolean";
    }
    else {
        return "other";
    }
}