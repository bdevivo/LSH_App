import React, {PropTypes as T} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import styles from './JobPosting.css';
import CSSModules from 'react-css-modules';
import {bindActionCreators} from 'redux';
import * as jobActions from '../../actions/jobActions';
import * as uiActions from '../../actions/uiActions';
import * as enums from '../../utils/enums';
import * as jobHelpers from '../../utils/jobHelpers';
import FormContainer from '../Common/QuestionForm/FormContainer';
import SubmitJobConfirmation from './SubmitJobConfirmation';
import {browserHistory} from 'react-router';
import update from 'immutability-helper';

const uuidV1 = require('uuid/v1');
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
            modalVisible: false,
        };

        this.onPostingTimeChanged = this.onPostingTimeChanged.bind(this);
        this.onPostVisibilityChanged = this.onPostVisibilityChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPostJob = this.onPostJob.bind(this);
        this.saveQuestionAnswers = this.saveQuestionAnswers.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        // if we're editing a posted job, copy all questionAnswers to draftAnswers so we can edit them in draft mode
        if (jobHelpers.isJobPosted(this.state.jobPost)) {
            this.setState(update(this.state, {
                jobPost : {
                    draftQuestionAnswers: {$set: _.cloneDeep(this.state.jobPost.questionAnswers)}
                }
            }));
        }
    }

    componentDidMount() {
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
            modalVisible: {$set: false}
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
            name: ""
        };
    }

    saveQuestionAnswers(fullAnswerSet) {
        let newState = update(this.state, {
            jobPost: {
                draftQuestionAnswers: {$set: fullAnswerSet}
            }
        });

        this.setState(newState);
    }

    onSubmit(fullAnswerSet) {
        // save the answers to local state, and show the confirmation popup
        let newState = update(this.state, {
            jobPost: {
                draftQuestionAnswers: {$set: fullAnswerSet}
            },
            modalVisible: {$set: true}
        });

        this.setState(newState);
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

    onPostJob() {

        let {JOB_POST_TIME, JOB_STATUS} = enums;

        if (this.state.postingTime === JOB_POST_TIME.Deferred) {
            this.setState(update(this.state, {
                modalVisible: {$set: false}
            }));
            return;
        }

        // Create a new Job object to be saved
        let saveJob = {
            status: enums.JOB_STATUS.Draft,
            _id: this.state.jobPost._id,
            createdDate: new Date(),
            createdBy: this.props.userId
        };

        switch (this.state.postingTime) {

            case JOB_POST_TIME.Later:
                saveJob.draftQuestionAnswers = _.cloneDeep(this.state.jobPost.draftQuestionAnswers);
                break;

            case JOB_POST_TIME.Now: {
                saveJob.status = this.state.postVisibility;
                // Draft answers become regular answers before saving
                saveJob.questionAnswers = _.cloneDeep(this.state.jobPost.draftQuestionAnswers);
                saveJob.postedDate = new Date();
                saveJob.postedBy = this.props.userId;
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
        let headerText = this.state.isNew ? "Post a Project" : "Edit Project";

        return (
            <div>

                <p styleName="pageHeader">{headerText}</p>

                <FormContainer
                    jobId={jobPost._id}
                    questionAnswers={jobPost.draftQuestionAnswers}
                    onSubmit={this.onSubmit}
                    gridName={enums.QUESTION_GRID_TYPE.JobPosting}
                    saveQuestionAnswers={this.saveQuestionAnswers}/>

                <Modal backdrop="static" dialogClassName="postJobModal" show={this.state.modalVisible}
                       onHide={this.handleClose}>
                    <SubmitJobConfirmation
                        onPostingTimeChanged={this.onPostingTimeChanged}
                        onPostVisibilityChanged={this.onPostVisibilityChanged}
                        postingTime={this.state.postingTime}
                        postVisibility={this.state.postVisibility}
                        onPostJob={this.onPostJob}
                    />
                </Modal>

            </div>
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
    userName: T.string,
    userId: T.string
};


function mapStateToProps(state, ownProps) {
    //let jobPost = state.jobPosts.find(x => x._id === ownProps.params.jobId);

    return {
        jobId: ownProps.params.jobId,
        allJobPosts: state.jobPosts,
        allQuestions: [...state.questions],
        userName: state.profile.user_name.short,
        userId: state.profile.auth0_id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(uiActions, dispatch),
        jobActions: bindActionCreators(jobActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(PostOrEditJob, styles));
