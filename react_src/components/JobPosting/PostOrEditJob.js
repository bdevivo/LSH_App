import React, {PropTypes as T} from 'react';
import {Modal, Row, Col, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import styles from './JobPosting.css';
import CSSModules from 'react-css-modules';
import {bindActionCreators} from 'redux';
import * as jobActions from '../../actions/jobActions';
import * as uiActions from '../../actions/uiActions';
import * as enums from '../../utils/constants/enums';
import * as jobHelpers from '../../utils/helpers/jobHelpers';
import * as authUtils from '../../auth_utils/auth';
import FormContainer from '../Common/QuestionForm/FormContainer';
import SubmitJobConfirmation from './SubmitJobConfirmation';
import UpdateJobConfirmation from './UpdateJobConfirmation';
import {browserHistory} from 'react-router';
import update from 'immutability-helper';

let _ = require('lodash');

class PostOrEditJob extends React.Component {

    constructor(props, context) {
        super(props, context);

        let path = this.props.location.pathname;
        let isNew = path.indexOf("edit") === -1;
        let jobPost = isNew ? this.createNewJob() : this.props.allJobPosts.find(x => x._id === this.props.jobId);

        this.state = {
            jobPost: jobPost,
            isNew: isNew,
            postingTime: "",
            postVisibility: "",
            submitModalVisible: false,
            updateModalVisible: false,
        };

        this.onPostingTimeChanged = this.onPostingTimeChanged.bind(this);
        this.onPostVisibilityChanged = this.onPostVisibilityChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPostJob = this.onPostJob.bind(this);
        this.saveQuestionAnswers = this.saveQuestionAnswers.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onSaveJob = this.onSaveJob.bind(this);
        this.onCancelUpdate = this.onCancelUpdate.bind(this);
    }

    componentWillMount() {

        browserHistory.push(this.props.location.pathname);
        window.onpopstate = function (event) {
            history.go(1);
        };

        // if we're editing a posted job, copy all questionAnswers to draftAnswers so we can edit them in draft mode
        if (jobHelpers.isJobPosted(this.state.jobPost)) {
            this.setState(update(this.state, {
                jobPost: {
                    draftQuestionAnswers: {$set: _.cloneDeep(this.state.jobPost.questionAnswers)}
                }
            }));
        }
    }

    componentDidMount() {
        //this.props.uiActions.toggleQuestionAnswerMode(true);

        let {jobPost} = this.state;
        if (jobPost.hasBeenSaved && !jobPost.hasDetails) {
            this.props.jobActions.getJobDetails(jobPost.jobId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.jobId !== this.state.jobPost._id) {
            let nextJobPost = nextProps.allJobPosts.find(x => x._id === nextProps.jobId);
            if (nextJobPost) {
                this.setState({jobPost: nextJobPost});
            }
        }
    }

    handleClose() {
        this.setState(update(this.state, {
            submitModalVisible: {$set: false}
        }));
    }

    createNewJob() {
        //let newId = uuidV1();
        let newId = 0;
        return {
            _id: newId,  // temporary ID
            hasBeenSaved: false,
            status: enums.JOB_STATUS.Draft,
            hasDetails: true,   // setting this to True prevents the app from trying to obtain details from the server
            questionAnswers: {},
            draftQuestionAnswers: {},
            orderedQuestions: [],
            name: ""
        };
    }

    saveQuestionAnswers(fullAnswerSet, activeQuestionsInPanel) {
        // save the order in which the questions were answered
        let newOrder = this.getNewQuestionOrder(activeQuestionsInPanel);

        let newState = update(this.state, {
            jobPost: {
                draftQuestionAnswers: {$set: fullAnswerSet},
                orderedQuestions: {$set: newOrder}
            }
        });

        this.setState(newState);
    }

    onSubmit(fullAnswerSet, activeQuestionsInPanel) {
        // save the order in which the questions were answered
        let newOrder = this.getNewQuestionOrder(activeQuestionsInPanel);

        // save the answers to local state, and show the confirmation popup
        let newState = update(this.state, {
            jobPost: {
                draftQuestionAnswers: {$set: fullAnswerSet},
                orderedQuestions: {$set: newOrder}
            }
        });

        if (this.state.isNew) {
            newState.submitModalVisible = true;
        }
        else {
            newState.updateModalVisible = true;
        }

        this.setState(newState);
    }

    getNewQuestionOrder(activeQuestionsInPanel) {
        let {orderedQuestions} = this.state.jobPost;
        orderedQuestions = orderedQuestions || [];
        // remove any questions that were already in the list
        let questionsToAdd = activeQuestionsInPanel.filter(q => {
            return !orderedQuestions.includes(q.questionId);
        });

        let newOrder = orderedQuestions.slice();
        if (questionsToAdd.length > 0) {
            newOrder = newOrder.concat(questionsToAdd.map(q => q.questionId));
        }

        return newOrder;
    }

    onSaveJob() {
        //this.props.uiActions.toggleQuestionAnswerMode(false);
        let {JOB_POST_TIME} = enums;

        // Create a new Job object to be saved
        let userId = authUtils.getUserId();
        let saveJob = {
            status: enums.JOB_STATUS.Draft,
            _id: this.state.jobPost._id,
            draftQuestionAnswers: _.cloneDeep(this.state.jobPost.draftQuestionAnswers),
            orderedQuestions: this.state.jobPost.orderedQuestions,
            createdDate: new Date(),
            createdBy: userId
        };

        saveJob.name = jobHelpers.getJobName(saveJob, this.props.allQuestions);

        if (this.state.isNew) {
            this.props.jobActions.saveJob(saveJob);
        }
        else {
            this.props.jobActions.updateJob(saveJob);
        }

        this.props.uiActions.setCurrentPanel('0', enums.QUESTION_GRID_TYPE.JobPosting);
        browserHistory.push("/jobdash");
    }



    onPostingTimeChanged(event) {
        this.setState(update(this.state, {
            postingTime: {$set: event.target.value}
        }));
    }

    onPostVisibilityChanged(event) {
        this.setState(update(this.state, {
            postVisibility: {$set: event.target.value}
        }));
    }

    onCancelUpdate(event) {
        this.setState(update(this.state, {
            updateModalVisible: {$set: false}
        }));
    }

    onPostJob(postingTime) {

       // this.props.uiActions.toggleQuestionAnswerMode(false);
        let {JOB_POST_TIME} = enums;

        let jobPostingTime = this.state.postingTime || postingTime;

        if (jobPostingTime === JOB_POST_TIME.Deferred) {
            this.setState(update(this.state, {
                submitModalVisible: {$set: false}
            }));
            return;
        }

        // Create a new Job object to be saved
        let userId = authUtils.getUserId();
        let saveJob = {
            status: enums.JOB_STATUS.Draft,
            _id: this.state.jobPost._id,
            orderedQuestions: this.state.jobPost.orderedQuestions,
            createdDate: new Date(),
            createdBy: userId
        };

        switch (jobPostingTime) {

            case JOB_POST_TIME.Later:
                saveJob.draftQuestionAnswers = _.cloneDeep(this.state.jobPost.draftQuestionAnswers);
                break;

            case JOB_POST_TIME.Now: {
                saveJob.status = this.state.postVisibility;
                // Draft answers become regular answers before saving
                saveJob.questionAnswers = _.cloneDeep(this.state.jobPost.draftQuestionAnswers);
                saveJob.postedDate = new Date();
                saveJob.postedBy = userId;
                break;
            }
        }

        saveJob.name = jobHelpers.getJobName(saveJob, this.props.allQuestions);

        if (this.state.isNew) {
            this.props.jobActions.saveJob(saveJob);
        }
        else {
            this.props.jobActions.updateJob(saveJob);
        }

        this.props.uiActions.setCurrentPanel('0', enums.QUESTION_GRID_TYPE.JobPosting);
        browserHistory.push("/jobdash");
    }

    render() {
        let {jobPost} = this.state;
        let orderedQuestions = jobPost.orderedQuestions || [];
        let headerText = this.state.isNew ? "Post a Project" : "Edit Project";
        let hasDraftAnswers = jobPost.draftQuestionAnswers ? Object.keys(jobPost.draftQuestionAnswers).length > 0 : false;
        let questionAnswers = hasDraftAnswers ? jobPost.draftQuestionAnswers : jobPost.questionAnswers;

        return (
            <Modal backdrop="static" dialogClassName="questionWizardModal" show={true}>
                <div styleName="postEditJobDiv">


                    <FormContainer
                        jobId={jobPost._id}
                        questionAnswers={questionAnswers}
                        onSubmit={this.onSubmit}
                        gridName={enums.QUESTION_GRID_TYPE.JobPosting}
                        saveQuestionAnswers={this.saveQuestionAnswers}
                        questionAnswerOrder={orderedQuestions}
                        headerText={headerText}
                        hasDraftAnswers={hasDraftAnswers}
                        onSaveJob={this.onSaveJob} />

                    <Modal backdrop="static" dialogClassName="postJobModal" show={this.state.submitModalVisible}
                           onHide={this.handleClose}>
                        <SubmitJobConfirmation
                            onPostingTimeChanged={this.onPostingTimeChanged}
                            onPostVisibilityChanged={this.onPostVisibilityChanged}
                            postingTime={this.state.postingTime}
                            postVisibility={this.state.postVisibility}
                            onPostJob={this.onPostJob}
                        />
                    </Modal>

                    <Modal backdrop="static" dialogClassName="postJobModal" show={this.state.updateModalVisible}
                           onHide={this.handleClose}>
                        <UpdateJobConfirmation
                            onPostJob={this.onPostJob}
                            onCancelUpdate={this.onCancelUpdate}
                        />
                    </Modal>

                </div>
            </Modal>
        );
    }

}

PostOrEditJob.propTypes = {
    params: T.object.isRequired,
    jobId: T.string,
    allJobPosts: T.array,
    allQuestions: T.array,
    jobActions: T.object,
    uiActions: T.object,
    location: T.object,
    userName: T.string
};


function mapStateToProps(state, ownProps) {
    //let jobPost = state.jobPosts.find(x => x._id === ownProps.params.jobId);

    return {
        jobId: ownProps.params.jobId,
        allJobPosts: state.jobPosts,
        allQuestions: [...state.questions],
        userName: state.profile.user_name.short
    };
}

function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(uiActions, dispatch),
        jobActions: bindActionCreators(jobActions, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(PostOrEditJob, styles));
