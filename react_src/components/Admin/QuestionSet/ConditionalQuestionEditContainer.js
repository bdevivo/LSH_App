import React, {PropTypes} from 'react';
import ConditionalQuestionEdit from './ConditionalQuestionEdit';
import * as optionHelpers from '../../../utils/questionHelpers';
import update from 'immutability-helper';
const cloneDeep = require('lodash/cloneDeep');
const uuidV1 = require('uuid/v1');

class ConditionalQuestionEditContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        let {conditionalQuestion, questions} = this.props;

        this.state = {
            qSetQuestion: this.props.qSetQuestion,
            conditionalQuestion: conditionalQuestion,
            questions: questions,
            isFormDataChanged: false
        };

        this.onUpdateConditionalResponse = this.onUpdateConditionalResponse.bind(this);
        this.onUpdateConditionalTarget = this.onUpdateConditionalTarget.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
    }

    onUpdateConditionalResponse(event) {
        let newState = update(this.state, {
            conditionalQuestion: {
                responseId: {$set: event.target.value}
            }
        });

        newState.isFormDataChanged = true;
        this.setState(newState);
    }

    onUpdateConditionalTarget(event) {
        let newState = update(this.state, {
            conditionalQuestion: {
                targetQuestionId: {$set: event.target.value}
            }
        });

        newState.isFormDataChanged = true;
        this.setState(newState);
    }


    onSave() {
        let newConditionalQuestion = this.state.conditionalQuestion;
        let questionIndex = this.state.qSetQuestion.conditionalQuestions.findIndex(x => x.id == newConditionalQuestion.id);  // the new Question will be the only one with id == 0
        let saveQuestion = cloneDeep(newConditionalQuestion);
        saveQuestion.id = uuidV1();    // assign real ID

        let newState = update(this.state, {
                qSetQuestion: {
                    conditionalQuestions: {$splice: [[questionIndex, 1, saveQuestion]]}
                },
                canAddConditionalQuestion: {$set: true},     // restore ability to add new Conditional Questions
                isFormDataChanged: {$set: false}
            }
        );

        this.setState(newState);
   
       qSetQuestionFunctions.
    }

    onCancel() {
        if (this.state.conditionalQuestion.id == '0') {  // this is a new CQ that hasn't been saved yet
            this.removeConditionalQuestion('0');
        }
        else {  // this is an existing question that was edited, but the edit was canceled
            let newState = update(this.state, {
                conditionalQuestion: {$set: this.props.conditionalQuestion},
                isFormDataChanged: {$set: false}
            });

            this.setState(newState);
        }
    }

    onRemove() {
        this.removeConditionalQuestion(this.state.conditionalQuestion.id);
    }

    removeConditionalQuestion(cQuestionId) {
        let indexToRemove = this.state.qSetQuestion.conditionalQuestions.findIndex(x => x.id === cQuestionId);
        if (indexToRemove > -1) {
            let newState = update(this.state, {
                qSetQuestion: {
                    conditionalQuestions: {$splice: [[indexToRemove, 1]]}
                },
                canAddConditionalQuestion: {$set: true},      // restore ability to add new Conditional Questions
                isFormDataChanged: {$set: false}
            });

            this.setState(newState);
        }
    }

    render() {

        let conditionalQuestionsFunctions = {
            onUpdateConditionalResponse: this.onUpdateConditionalResponse,
            onUpdateConditionalTarget: this.onUpdateConditionalTarget,
            onSave: this.onSave,
            onCancel: this.onCancel,
            onRemove: this.onRemove
        };

        let conditionalQuestion = this.state.conditionalQuestion;
        let isAddMode = (conditionalQuestion.id == '0' || this.state.isFormDataChanged);

        // Don't enable Save button unless form is valid
        let isSaveEnabled = (this.state.isFormDataChanged
        && conditionalQuestion.responseId != 0
        && conditionalQuestion.targetQuestionId != 0);

        return (
            <div>
                <ConditionalQuestionEdit
                    conditionalQuestion={this.state.conditionalQuestion}
                    conditionalQuestionFunctions={conditionalQuestionsFunctions}
                    questions={this.state.questions}
                    isAddMode={isAddMode}
                    isSaveEnabled={isSaveEnabled}/>
            </div>
        );
    }
}

ConditionalQuestionEditContainer.propTypes = {
    qSetQuestion: PropTypes.object.isRequired,
    conditionalQuestion: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
   qSetQuestionFunctions: T.object.isRequired
};


export default ConditionalQuestionEditContainer;
