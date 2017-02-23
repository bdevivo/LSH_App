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

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.onUpdateConditionalResponse = this.onUpdateConditionalResponse.bind(this);
        this.onUpdateConditionalTarget = this.onUpdateConditionalTarget.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.removeConditionalQuestion = this.removeConditionalQuestion.bind(this);
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
        this.setState(update(this.state, {
            isFormDataChanged: {$set: false}
        }));

        this.props.qSetQuestionFunctions.saveConditionalQuestion(this.state.conditionalQuestion);
    }

    onCancel() {

        this.setState(update(this.state, {
            isFormDataChanged: {$set: false}
        }));

        // replace the conditional question with the unedited one passed in via props
        this.props.qSetQuestionFunctions.cancelConditionalQuestion(this.state.qSetQuestion.id, this.props.conditionalQuestion);
    }

    onRemove() {
        this.removeConditionalQuestion(this.state.conditionalQuestion.id);
    }

    removeConditionalQuestion(cQuestionId) {
        this.props.qSetQuestionFunctions.removeConditionalQuestion(cQuestionId);
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
                    parentQuestion={this.state.qSetQuestion}
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
    qSetQuestionFunctions: PropTypes.object.isRequired
};


export default ConditionalQuestionEditContainer;
