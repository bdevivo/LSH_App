import * as enums from './enums';
const dateFormat = require('dateformat');

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


export function getAnswerTypeDisplayString(answerType) {
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

export function getQuestionAnswer(question, answerObj) {

    switch(getAnswerTypeSubGroup(question.answerType)) {
        case "singleSelect": {
            return getOptionText(question, answerObj);
        }

        case "multiSelect": {
            let answers = answerObj.map(x => getOptionText(question, x));
            return answers.join(", ");
        }

        case "text": {
            return answerObj;
        }

        case "boolean": {
            return (answerObj === "yes" ? question.booleanOptions.yesText : question.booleanOptions.noText);
        }

        case "checkbox": {
            return (answerObj ? "true" : "false");
        }

        case "file": {
            return (answerObj); // TODO: figure out how to display file name?
        }

        default:
            return "";
    }
}

function getAnswerTypeSubGroup(answerType) {
    if (isSingleSelectAnswerType(answerType)) {
        return "singleSelect";
    }
    else if (isMultiSelectAnswerType(answerType)) {
        return "multiSelect";
    }
    else if (isTextAnswerType(answerType)) {
        return "text";
    }
    else if (isBooleanAnswerType(answerType)) {
        return "boolean";
    }
    else if (isSingleCheckboxAnswerType(answerType)) {
        return "checkbox";
    }
    else if (isFileUploadAnswerType(answerType)) {
        return "file";
    }
    else {
        return "other";
    }
}

function getOptionText(question, responseId) {
    let response = question.selectOptionItems.find(x => x.id == responseId);
    return (response ? response.text : "");
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
    return ["radioOptionsInput", "checkboxOptionsInput", "selectInput", "singleSelect", "multiSelect", "buttonGroupSingleChoice", "buttonGroupMultipleChoice"].includes(answerType);
}

export function isSingleSelectAnswerType(answerType) {
    return ["radioOptionsInput", "selectInput", "singleSelect", "buttonGroupSingleChoice"].includes(answerType);
}

export function isMultiSelectAnswerType(answerType) {
    return ["checkboxOptionsInput", "multiSelect", "buttonGroupMultipleChoice"].includes(answerType);
}

export function isTextAnswerType(answerType) {
    return ["emailInput", "textInput", "textareaInput"].includes(answerType);
}

export function isBooleanAnswerType(answerType) {
    return answerType == "boolean";
}

export function isSingleCheckboxAnswerType(answerType) {
    return answerType == "checkboxInput";
}

export function isFileUploadAnswerType(answerType) {
    return answerType == "fileInput";
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

export function gertOrderedQuestionAnswers(allQuestions, questionAnswers, orderedAnswers) {
    let questionItems = [];
    Object.keys(questionAnswers).forEach((key) => {
        let question = allQuestions.find(x => x._id === key);
        if (question) {
            let answerString = getQuestionAnswer(question, questionAnswers[key]);
            if (answerString) {
                questionItems.push({
                    question: question,
                    answerString: answerString
                });
            }
        }
    });

    // sort answers into the order in which they were answered
    let orderedQuestionItems = [];
    if (orderedAnswers && orderedAnswers.length > 0) {
        for (let i = 0; i < orderedAnswers.length; i++) {
            let qItem = questionItems.find(item => item.question._id === orderedAnswers[i]);
            if (qItem) {
                orderedQuestionItems.push(qItem);
            }
        }
    }
    else {
        orderedQuestionItems = questionItems;
    }

    return orderedQuestionItems;
}

