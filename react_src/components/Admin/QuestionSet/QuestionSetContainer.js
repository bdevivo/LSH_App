import React, {PropTypes} from 'react';
import {Button, Row, Col} from 'react-bootstrap';
import update from 'immutability-helper';
import QuestionSet from './QuestionSet';
import QuestionSetEditContainer from './QuestionSetEditContainer';
import * as questionHelpers from '../../../utils/helpers/questionHelpers';
import {browserHistory} from 'react-router';
import {alertError, confirm} from '../../../utils/confirm';
import CSSModules from 'react-css-modules';
import styles from './QuestionSet.css';

let _ = require('lodash');

class QuestionSetContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questionSets: [],
            questions: this.props.questions,
            editQuestionSet: {},
            showModal: false
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getQuestionSetState = this.getQuestionSetState.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.onAddQuestionSet = this.onAddQuestionSet.bind(this);
        this.onAddQuestionSetClose = this.onAddQuestionSetClose.bind(this);
        this.onRemoveQuestionSet = this.onRemoveQuestionSet.bind(this);
        this.onEditQuestionSet = this.onEditQuestionSet.bind(this);
    }

    componentDidMount() {

        if (this.props.params.id == '0' && this.props.selectedQuestionSetId != '0') {
            browserHistory.push("/admin/qSets/qSet/" + this.props.selectedQuestionSetId);
        }
        else {   // initial mount (no qSet selected)
            let qSetState = this.getQuestionSetState(this.props);
            browserHistory.push("/admin/qsets/qset/" + qSetState.qSetId);
        }
    }

    componentWillReceiveProps(nextProps) {
        let qSetState = this.getQuestionSetState(nextProps);
        this.setState(qSetState);
        if (nextProps.selectedQuestionSetId != '0'
            && nextProps.selectedQuestionSetId != this.props.params.id
            && nextProps.userClickedQuestionSetId != nextProps.selectedQuestionSetId) {
            browserHistory.push("/admin/qSets/qSet/" + nextProps.selectedQuestionSetId);
        }
    }

    getQuestionSetState(props) {
        let qSetId = props.params.id;
        let questionSets = [...props.questionSets];
        let currentQuestionSet;

        if (questionSets && questionSets.length === 0) {
            currentQuestionSet = {};
        }
        else if (qSetId === '0') {
            currentQuestionSet = questionSets[0];
            qSetId = currentQuestionSet._id;
        }
        else {
            currentQuestionSet = questionSets.find(x => x._id == qSetId);
            currentQuestionSet = currentQuestionSet || questionSets[0];
        }

        return {
            questionSets: questionSets,
            questions: props.questions,
            qSetId: qSetId,
            currentQuestionSet: currentQuestionSet
        };
    }

    onAddQuestionSet() {
        // Calculate the index number for the qSet to be added
        let nextIndex;
        if (this.state.questionSets.length === 0) {
            nextIndex = 1;
        }
        else {
            let qSetIds = this.state.questionSets.map(q => q.index);
            nextIndex = Math.max(...qSetIds) + 1;
        }

        let editQuestionSet = {
            _id: '0',
            index: nextIndex,
            questionPanelId: '0',
            qSetQuestions: []
        };

        let newState = update(this.state, {
                editQuestionSet: {$set: editQuestionSet},
                showModal: {$set: true}
            }
        );

        this.setState(newState);
    }

    onAddQuestionSetClose() {

        let newQuestionSet = {};

        let newState = update(this.state, {
                newQuestionSet: {$set: newQuestionSet},
                showModal: {$set: false}
            }
        );

        this.setState(newState);
    }

    onRemoveQuestionSet() {
        confirm(`Delete Question Set?`).then(() => {

            // find the index of the previous qSet in the list -- this will be the next active qSet
            let qSets = this.state.questionSets;
            let removeIndex = qSets.findIndex(x => x._id == this.state.qSetId);
            let nextSelectedId = '0';
            if (qSets.length > 1) {
                nextSelectedId = (removeIndex == 0 ? qSets[1]._id : qSets[removeIndex - 1]._id);
            }

            this.props.questionSetActions.removeQuestionSet(this.state.qSetId, nextSelectedId);
        }, () => {
            // user clicked Cancel -- do nothing
        });
    }

    onEditQuestionSet() {
        let editQuestionSet = _.cloneDeep(this.state.currentQuestionSet);

        let newState = update(this.state, {
                editQuestionSet: {$set: editQuestionSet},
                showModal: {$set: true}
            }
        );

        this.setState(newState);
    }

    render() {

        let hasQuestionSets = this.state.questionSets && this.state.questionSets.length > 0;
        let qSetQuestionData = null;

        if (hasQuestionSets && this.state.questions.length > 0) {
            qSetQuestionData = this.state.currentQuestionSet.qSetQuestions.map((qSetQuestion, i) => {
                let fullQuestion = this.state.questions.find(x => x._id === qSetQuestion.questionId);
                let conditionalQuestionData = qSetQuestion.conditionalQuestions.map(cq => {
                    let targetQuestion = this.state.questions.find(y => y._id == cq.targetQuestionId);
                    let response = questionHelpers.getSelectedResponse(fullQuestion, cq.responseId);
                    return {
                        response: response,
                        targetQuestion: targetQuestion.name
                    };

                });

                let qeustionName = fullQuestion ? fullQuestion.name : "";

                return {
                    index: i,
                    questionName: qeustionName,
                    conditionalQuestions: conditionalQuestionData
                };
            });
        }

        let staticQuestionSetInfo = hasQuestionSets
            ? <QuestionSet qSetQuestionData={qSetQuestionData}/>
            : null;

        let editAndRemoveButtons = (<div styleName="addEditButtonsDiv">
            <Button type="button" className="btn btn-xs btn-default" aria-label="Edit"
                    onClick={this.onEditQuestionSet}>
                <span className="glyphicon glyphicon-pencil"></span>
            </Button>

            {' '}

            <Button type="button" className="btn btn-xs btn-default" aria-label="Remove"
                    onClick={this.onRemoveQuestionSet}>
                <span className="glyphicon glyphicon-remove"></span>
            </Button>
        </div>);

        return (
            <div>

                {/* ADD QUESTION SET BUTTON */}
                <Row styleName="addQuestionSetDiv">
                    <Col md={6}><Button type="button" className="btn btn-sm btn-default" onClick={this.onAddQuestionSet}>Add
                        New</Button></Col>
                    <Col md={6}>{hasQuestionSets && editAndRemoveButtons}</Col>

                </Row>
                <Row>
                    <Col md={12}>{hasQuestionSets && staticQuestionSetInfo}</Col>
                </Row>


                {/* EDIT MODAL -- ONLY SHOWN WHEN ADDING OR EDITING A QUESTION SET */}
                <QuestionSetEditContainer  // this is a new question
                    qSet={this.state.editQuestionSet}
                    questions={this.state.questions}
                    userName={this.props.userName}
                    questionSetActions={this.props.questionSetActions}
                    modalVisible={this.state.showModal}   // if we are adding a new qSet, show the Add QuestionSet modal
                    onAddQuestionSetClose={this.onAddQuestionSetClose}
                    panelTargets={this.props.panelTargets}
                    onAddSetClose={this.onAddQuestionSetClose}/>

            </div>);
    }
}

QuestionSetContainer.propTypes = {
    questionSets: PropTypes.array,
    questions: PropTypes.array,
    questionSetActions: PropTypes.object,
    selectedQuestionSetId: PropTypes.string,
    userClickedQuestionSetId: PropTypes.string,
    panelTargets: PropTypes.array,
    userName: PropTypes.string,
    params: PropTypes.object.isRequired
};

export default CSSModules(QuestionSetContainer, styles);
