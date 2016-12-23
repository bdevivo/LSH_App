import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonGroup, Modal} from 'react-bootstrap';
import QuestionAddEdit from './QuestionAddEdit';
import update from 'immutability-helper';
import * as questionActions from '../../actions/questionWizardActions';

class QuestionEditContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            question: this.props.question,
            modalVisible: false,
            selectedQuestionOption: "none"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onQuestionTypeSelectionChanged = this.onQuestionTypeSelectionChanged.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();


        if (this.state.question.id == 0) {
            this.props.questionActions.addQuestion(this.state.question);
        }
        else {
            this.props.questionActions.updateQuestion(this.state.question);
        }

        this.closeModal();
    }

    removeQuestion() {

        this.props.questionActions.removeQuestion(this.state.question.id);
    }


    handleCancel() {
        this.closeModal();
    }

    showModal() {
        this.setState({modalVisible: true});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }

    onQuestionTypeSelectionChanged(event) {
        this.setState({selectedQuestionOption: event.target.value});
    }

    render() {

        let question = this.state.question;
        let pageTitle = (question.id === 0 ? "Add Question" : "Edit Question");

        return (
            <div>

                <Modal dialogClassName="questionModal" show={this.state.modalVisible} onHide={this.closeModal}>
                    <QuestionAddEdit
                        question={question}
                        pageTitle={pageTitle}
                        handleSubmit={this.handleSubmit}
                        handleCancel={this.handleCancel}
                        selectedQuestionOption={this.state.selectedQuestionOption}
                        onQuestionTypeSelectionChanged={this.onQuestionTypeSelectionChanged}
                    />
                </Modal>

                <ButtonGroup>

                    <Button type="button" className="btn btn-sm btn-default" aria-label="Edit" onClick={this.showModal}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </Button>

                    <Button type="button" className="btn btn-sm btn-default" aria-label="Remove"
                            onClick={this.removeQuestion}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </Button>
                </ButtonGroup>


            </div>


        );
    }
}

QuestionEditContainer.propTypes = {
    question: PropTypes.object.isRequired,
    questionActions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        questionActions: bindActionCreators(questionActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(QuestionEditContainer);
