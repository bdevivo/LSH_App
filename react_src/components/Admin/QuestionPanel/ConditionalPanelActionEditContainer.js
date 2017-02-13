import React, {PropTypes} from 'react';
import ConditionalPanelActionEdit from './ConditionalPanelActionEdit';
import * as optionHelpers from '../../../utils/questionHelpers';
import update from 'immutability-helper';

class ConditionalPanelActionEditContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        let {conditionalAction, questions} = this.props;
        let potentialResponses = [];
        if (conditionalAction.id != 0) {
            let conditionalQuestion = questions.find(x => x._id === conditionalAction.questionId);
            if(conditionalQuestion){
               potentialResponses = optionHelpers.getPotentialResponses(conditionalQuestion);
            }
        }

        this.state = {
            conditionalAction: conditionalAction,
            questions: questions,
            panelTargets: this.props.panelTargets,
            potentialResponses: potentialResponses,
            isActionChanged: false
        };

        this.onUpdateConditionalQuestion = this.onUpdateConditionalQuestion.bind(this);
        this.onUpdateConditionalResponse = this.onUpdateConditionalResponse.bind(this);
        this.onUpdateConditionalAction = this.onUpdateConditionalAction.bind(this);
        this.onUpdateConditionalTarget = this.onUpdateConditionalTarget.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
    }

    onUpdateConditionalQuestion(event) {
        let selectedQuestionId = event.target.value;
        let newState = update(this.state, {
            conditionalAction: {
                questionId: {$set: selectedQuestionId}
            }
        });

        let selectedQuestion = this.state.questions.find(x => x._id == selectedQuestionId);
        if (selectedQuestion) {
            newState.potentialResponses = optionHelpers.getPotentialResponses(selectedQuestion);
        }
        else {
            newState.potentialResponses = [];
        }

        newState.isActionChanged = true;

        this.setState(newState);
    }

    onUpdateConditionalResponse(event) {
        let newState = update(this.state, {
            conditionalAction: {
                questionResponseId: {$set: event.target.value}
            }
        });

        newState.isActionChanged = true;

        this.setState(newState);
    }

    onUpdateConditionalAction(event) {
        let newState = update(this.state, {
            conditionalAction: {
                action: {$set: event.target.value}
            }
        });

        newState.isActionChanged = true;

        this.setState(newState);
    }

    onUpdateConditionalTarget(event) {
        let newState = update(this.state, {
            conditionalAction: {
                targetPanelId: {$set: event.target.value}
            }
        });

        newState.isActionChanged = true;

        this.setState(newState);
    }

    onSave() {
       if (this.state.conditionalAction.id == '0') {
          this.props.questionPanelFunctions.saveNewConditionalAction(this.state.conditionalAction);
       }
       else {
          this.props.questionPanelFunctions.updateConditionalAction(this.state.conditionalAction);
       }
        
        this.setState(update(this.state, {
            isActionChanged: {$set: false}
        }));
    }

    onCancel() {
        if (this.state.conditionalAction.id == 0) {  // this is a new question that hasn't been saved yet
            this.props.questionPanelFunctions.cancelNewConditionalAction();
            this.setState(update(this.state, {
                isActionChanged: {$set: false}
            }));
        }
        else {  // this is an existing question that was edited, but the edit was canceled
            let newState = update(this.state, {
                conditionalAction: {$set: this.props.conditionalAction},
                isActionChanged: {$set: false}
            });

            // re-set the potential responses
            let originalAction = this.props.conditionalAction;
            let selectedQuestion = this.state.questions.find(x => x._id == originalAction.questionId);
            if (selectedQuestion) {
                newState.potentialResponses = optionHelpers.getPotentialResponses(selectedQuestion);
            }
            else {
                newState.potentialResponses = [];
            }

            this.setState(newState);
    }
}

    onRemove() {
        this.props.questionPanelFunctions.removeConditionalAction(this.state.conditionalAction.id);
        this.setState(update(this.state, {
            isActionChanged: {$set: false}
        }));
    }

    render() {

        let conditionalActionsFunctions = {
            onUpdateConditionalQuestion: this.onUpdateConditionalQuestion,
            onUpdateConditionalResponse: this.onUpdateConditionalResponse,
            onUpdateConditionalAction: this.onUpdateConditionalAction,
            onUpdateConditionalTarget: this.onUpdateConditionalTarget,
            onSave: this.onSave,
            onCancel: this.onCancel,
            onRemove: this.onRemove
        };

        let conditionalAction = this.state.conditionalAction;
        let isAddMode = (conditionalAction.id === 0 || this.state.isActionChanged);

        // Don't enable Save button unless form is valid
        let isSaveEnabled =  this.state.isActionChanged
            && conditionalAction.questionId != 0
            && conditionalAction.questionResponseId != 0
            && ((conditionalAction.action == "goto" && conditionalAction.targetPanelId != 0) || conditionalAction.action == "submit");

        return (
            <div>
                <ConditionalPanelActionEdit
                    conditionalAction={this.state.conditionalAction}
                    conditionalActionsFunctions={conditionalActionsFunctions}
                    questions={this.state.questions}
                    potentialResponses={this.state.potentialResponses}
                    panelTargets={this.state.panelTargets}
                    isAddMode={isAddMode}
                    isSaveEnabled={isSaveEnabled}/>
            </div>
        );
    }
}

ConditionalPanelActionEditContainer.propTypes = {
    conditionalAction: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    questionPanelFunctions: PropTypes.object.isRequired,
    panelTargets: PropTypes.array.isRequired
};


export default ConditionalPanelActionEditContainer;
