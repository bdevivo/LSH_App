import React, {PropTypes as T} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import QuestionAnswerPanel from './QuestionAnswersPanel';

import * as questionPanelActions from '../../../actions/questionPanelActions';
import * as questionSetActions from '../../../actions/questionSetActions';
import * as questionActions from '../../../actions/questionActions';
import * as questionHelpers from '../../../utils/helpers/questionHelpers';

import ButtonGroupSingleChoice from '../../Common/Winterfell/inputTypes/buttonGroupSingleChoice';
import ButtonGroupMultipleChoice from '../../Common/Winterfell/inputTypes/buttonGroupMultipleChoice';

//import update from 'immutability-helper';

import Winterfell from '../Winterfell/Winterfell';
Winterfell.addInputType('buttonGroupSingleChoice', ButtonGroupSingleChoice);
Winterfell.addInputType('buttonGroupMultipleChoice', ButtonGroupMultipleChoice);

class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qSets: this.props.qSets,
            questions: this.props.questions,
            qPanels: this.props.qPanels,
            questionAnswers: this.props.questionAnswers
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {

        if (!this.props.areQuestionsLoaded) {
            this.props.questionActions.getAllQuestions();
        }

        if (!this.props.arePanelsLoaded) {
            this.props.questionPanelActions.getAllPanels();
        }

        if (!this.props.areQuestionSetsLoaded) {
            this.props.questionSetActions.getAllQuestionSets();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            qSets: [...nextProps.qSets],
            questions: [...nextProps.questions],
            qPanels: [...nextProps.qPanels],
            questionAnswers: nextProps.questionAnswers || {}
        });
    }

    onRender() {
        console.log('Great news! Winterfell rendered successfully');
    }

    onUpdate(questionAnswers) {
        console.log('Question Updated! The current set of answers is: ', questionAnswers);
    }

    onSwitchPanel(panel) {
        console.log('Moving on to the panel that is identified as "' + panel.panelId + '"');
    }

    onSubmit(questionAnswers, target) {
       this.props.onSubmit(questionAnswers);
        // console.log('Form submitted!', questionAnswers);
        // console.log('-----');
        // console.log('For this example, we disabled normal form submission functionality. ');
        // console.log('-----');
        // alert('Submitted. Check the console to see the answers!');
    }

    getActionText(action) {
        switch (action) {
            case "goto":
                return "GOTO";

            case "submit":
                return "SUBMIT";

            default:
                return "";
        }
    }


    getPanelConditionalActions(panel) {
        return panel.conditionalActions.map(ca => {
            return {
                "questionId": ca.questionId,
                "value": ca.questionResponseId,
                "action": this.getActionText(ca.action),
                "target": ca.targetPanelId
            };
        });
    }

    getPanelDefaultAction(panel) {
        return {
            "action": this.getActionText(panel.defaultAction.action),
            "target": panel.defaultAction.target
        };
    }

    getPanelAction(panel) {
        return {
            "conditions": this.getPanelConditionalActions(panel),
            "default": this.getPanelDefaultAction(panel)
        };
    }

    getPanelNextButton(panel) {
        return {
            "text": panel.nextButtonText
        };
    }

    getPanelBackButton(panel) {
        return {
            "text": panel.backButtonText
        };
    }

    getPanelQuestionSets(panel) {

        let questionSets = this.state.qSets.filter(qSet => qSet.questionPanelId == panel._id);
        if (questionSets.length == 0) {
            console.log("No question sets found for panel: " + panel.name);
            return [];
        }

        return questionSets.map(qSet => {
            return {
                "index": qSet.index,
                "questionSetId": qSet._id
            };
        });
    }

    getFormPanelsJson() {
        return this.state.qPanels.map(panel => {
            return {
                "index": panel.index,
                "panelId": panel._id
            };
        });
    }

    getQuestionPanelsJson() {
        return this.state.qPanels.map(panel => {
            let panelObj = {
                "panelId": panel._id,
                "panelHeader": panel.header,
                "panelText": panel.subHeader || "",
                "action": this.getPanelAction(panel),
                "button": this.getPanelNextButton(panel),
                "questionSets": this.getPanelQuestionSets(panel)
            };

            if (panel.backButtonText) {
                panelObj.backButton = this.getPanelBackButton(panel);
            }

            return panelObj;
        });
    }

    getQuestionValidations(question) {
        // TODO: add validation to Admin Questions page
        return [];
    }

    getConditionalQuestions(option, subQuestion) {

        // subQuestion may be a Conditional Questions, which may not necessarily have a nested Conditional Question
        if (!subQuestion.hasOwnProperty("conditionalQuestions")) {
            return [];
        }

        // filter to conditional questions that map to this specific response option
        return subQuestion.conditionalQuestions.filter(cq => cq.responseId == option.id).map(cq => {
            let fullConditionalQuestion = this.state.questions.find(q => q._id == cq.targetQuestionId);

            return {
                "questionId": cq.targetQuestionId,
                "question": fullConditionalQuestion.text,
                "input": this.getQuestionInput(fullConditionalQuestion, cq),
                "validations": this.getQuestionValidations(fullConditionalQuestion)
            };
        });
    }

    getInputOptionsForSelect(fullQuestion, qSetQuestion) {
        let sortedOptions = fullQuestion.selectOptionItems.sort((a, b) => {
            return a.index - b.index;
        });
        return sortedOptions.map(opt => {
            return {
                "text": opt.text,
                "value": opt.id,
                "conditionalQuestions": this.getConditionalQuestions(opt, qSetQuestion)
            };

        });
    }

    getInputOptionsForBoolean(fullQuestion, qSetQuestion) {
        // TODO: don't hard-code the "yes" and "no" values
        let options = fullQuestion.booleanOptions;
        return [
            {
                "text": options.yesText,
                "value": "yes",
                "conditionalQuestions": this.getConditionalQuestions({id: "yes"}, qSetQuestion)
            },
            {
                "text": options.noText,
                "value": "no",
                "conditionalQuestions": this.getConditionalQuestions({id: "no"}, qSetQuestion)
            }
        ];
    }

    getInputOptions(fullQuestion, qSetQuestion) {
        switch (questionHelpers.getQuestionTypeGroup(fullQuestion)) {
            case "select":
                return this.getInputOptionsForSelect(fullQuestion, qSetQuestion);

            case "boolean":
                return this.getInputOptionsForBoolean(fullQuestion, qSetQuestion);

            default:
                return [];
        }
    }

    getQuestionInput(fullQuestion, qSetQuestion) {
        let defaultValue;
        let placeholder;

        let inputType;
        switch (fullQuestion.answerType) {
            case "singleSelect":
                inputType = "buttonGroupSingleChoice";
                break;

            case "multiSelect":
                inputType = "buttonGroupMultipleChoice";
                break;

            case "boolean":
                inputType = "radioOptionsInput";
                defaultValue = fullQuestion.defaultValue;
                break;

            case "text":
                inputType = "textInput";
                placeholder = fullQuestion.placeholder;
                break;

            default:
                inputType = fullQuestion.answerType;
        }

        let inputObj = {
            "type": inputType,
            "options": this.getInputOptions(fullQuestion, qSetQuestion)
        };

        if (defaultValue) {
            inputObj.default = defaultValue;
        }

        if (placeholder) {
            inputObj.placeholder = placeholder;
        }

        return inputObj;
    }

    getQSetQuestions(qSet) {
        return qSet.qSetQuestions.map(qsq => {

            let fullQuestion = this.state.questions.find(q => q._id == qsq.questionId);
            if (!fullQuestion) {
                console.log("No question found for Question Set Question: " + qsq._id);
                return [];
            }

            return {
                "questionId": qsq.questionId,
                "question": fullQuestion.text,
                "input": this.getQuestionInput(fullQuestion, qsq),
                "validations": this.getQuestionValidations(fullQuestion)
            };
        });
    }


    getQuestionSetsJson() {
        return this.state.qSets.map(qSet => {
            return {
                "questionSetId": qSet._id,
                "questionSetHeader": "",
                "questionSetText": "",
                "questions": this.getQSetQuestions(qSet),


            };
        });
    }

    getClasses() {
        return {
            "questionPanels": "questionPanels",
            "questionPanelText": "questionPanelText",
            "questionSets": "questionSets",
            "input": "form-control",
            "select": "form-control",
            "question": "question",
            "radioListItem": "radio",
            "radioList": "clean-list",
            "checkboxInput": "checkbox",
            "checkboxListItem": "checkbox",
            "checkboxList": "clean-list",
            "controlButton": "btn btn-primary pull-right",
            "backButton": "btn btn-default pull-left",
            "errorMessage": "alert alert-danger",
            "questionPostText": "push-top",
            "buttonBar": "buttonBar"
        };
    }

    render() {

        let hasData = (this.state.qPanels.length > 0
        && this.state.qSets.length > 0
        && this.state.questions.length > 0);

        let mySchema;
        if (hasData) {
            mySchema = {
                "classes": this.getClasses(),
                "formPanels": this.getFormPanelsJson(),
                "questionPanels": this.getQuestionPanelsJson(),
                "questionSets": this.getQuestionSetsJson()
            };
        }

        let grid = !hasData
            ? null
            : <Winterfell schema={mySchema}
                          gridName={this.props.gridName}
                          questionAnswers={this.state.questionAnswers}
                          panelHistory={this.props.panelHistory}
                          disableSubmit={true}
                          onRender={this.onRender}
                          onUpdate={this.onUpdate}
                          onSwitchPanel={this.onSwitchPanel}
                          onSubmit={this.onSubmit}
                          saveQuestionAnswers={this.props.saveQuestionAnswers}
                          headerText={this.props.headerText}
                          hasDraftAnswers={this.props.hasDraftAnswers}
                          onSaveJob={this.props.onSaveJob}/>;

        return (
            <div>
                <Row>
                    <Col md={8}>
                        {grid}
                    </Col>
                    <Col md={4}>
                        <QuestionAnswerPanel
                            allQuestions={this.props.questions}
                            questionAnswers={this.state.questionAnswers}
                            orderedAnswers={this.props.questionAnswerOrder} />
                    </Col>

                </Row>

            </div>
        );


    }
}

FormContainer.propTypes = {
    questionAnswers: T.object.isRequired,
    questionAnswerOrder: T.array.isRequired,
    gridName: T.string.isRequired,
    onSubmit: T.func.isRequired,
    saveQuestionAnswers: T.func.isRequired,
    questions: T.array,
    qPanels: T.array,
    qSets: T.array,
    panelHistory: T.array,
    arePanelsLoaded: T.bool,
    areQuestionsLoaded: T.bool,
    areQuestionSetsLoaded: T.bool,
    questionPanelActions: T.object,
    questionSetActions: T.object,
    questionActions: T.object,
    headerText: T.string.isRequired,
    hasDraftAnswers: T.bool.isRequired,
    onSaveJob: T.func.isRequired,
};

function mapStateToProps(state, ownProps) {
    let panelHistory = state.ui[ownProps.gridName].panelHistory;

    return {
        qSets: [...state.questionSets],
        qPanels: [...state.questionPanels],
        panelHistory: panelHistory,
        questions: [...state.questions],
        areQuestionsLoaded: state.loadedData.questions,
        arePanelsLoaded: state.loadedData.questionSets,
        areQuestionSetsLoaded: state.loadedData.questionSets,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionPanelActions: bindActionCreators(questionPanelActions, dispatch),
        questionSetActions: bindActionCreators(questionSetActions, dispatch),
        questionActions: bindActionCreators(questionActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
