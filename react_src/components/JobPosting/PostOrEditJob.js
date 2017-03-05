import React, {PropTypes as T} from 'react';
import {connect} from 'react-redux';
import styles from './JobPosting.css';
import CSSModules from 'react-css-modules';
import {bindActionCreators} from 'redux';
import * as jobActions from '../../actions/jobActions';
import * as enums from '../../utils/enums';
import FormContainer from '../Common/QuestionForm/FormContainer';
import SubmitJobConfirmation from './SubmitJobConfirmation';
import update from 'immutability-helper';

const uuidV1 = require('uuid/v1');
let _ = require('lodash');

class PostOrEditJob extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            jobPost: props.jobPost,
            postingTime: undefined,
            postVisibility: undefined,
            modalVisible: false,
        };

        this.onPostingTimeChanged = this.onPostingTimeChanged.bind(this);
        this.onPostVisibilityChanged = this.onPostVisibilityChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPostJob = this.onPostJob.bind(this);
    }

    componentDidMount() {
        let {jobPost} = this.state;
        if (jobPost.isSaved && !jobPost.hasDetails) {
            this.props.jobActions.getJobDetails(jobPost.jobId);
        }
    }

    onSubmit(questionAnswers) {
        // save the answers to local state, and show the confirmation popup
        let newState = update(this.state, {
            questionAnswers: {$set: questionAnswers},
            modalVisible: true
        });

        this.setState(newState);
    }

    onPostingTimeChanged() {
        let newState = update(this.state, {
            postingTime: {$set: event.target.value}
        });

        this.setState(newState);
    }

    onPostVisibilityChanged() {
        let newState = update(this.state, {
            postVisibility: {$set: event.target.value}
        });

        this.setState(newState);
    }

    onPostJob() {
        this.setState(update(this.state, {
            modalVisible: false
        }));

        let saveJob = _.cloneDeep(this.state.jobPost);
        let {JOB_POST_TIME, JOB_STATUS} = enums;

        switch (this.state.postingTime) {
            case JOB_POST_TIME.Never:
                saveJob.status = JOB_STATUS.Abandoned;
                break;

            case JOB_POST_TIME.Later:
                // don't change the job status
                break;

            case JOB_POST_TIME.Now:
            {
                saveJob.status = this.state.postVisibility;
                break;
            }
        }

        if (saveJob.hasBeenSaved) {
            this.props.jobActions.updateJob(saveJob);
        }
        else {
            this.props.jobActions.saveJob(saveJob);
        }
    }

    render() {
        let {jobPost} = this.state;
        let path = this.props.location.pathname;
        let headerText = path.contains("Edit") ? "Edit Project" : "Post a Project";
        // If the job is in Draft status, we can edit the QuestionAnswers directly. For any other status, the
        // job has already been posted, so we edit the DraftQuestionAnswers instead.
        let questionAnswers = jobPost.status === enums.JSTAT_DRAFT ? jobPost.questionAnswers : jobPost.draftQuestionAnswers;

        return (
            <div>

                <p styleName="pageHeader">{headerText}</p>

                <FormContainer
                    jobId={jobPost._id}
                    questionAnswers={questionAnswers} />

                <Modal backdrop="static" dialogClassName="postJobModal" show={this.state.modalVisible}
                       onHide={this.handleCancel}>
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
    jobPost: T.object,
    jobActions: T.object,
    location: T.string
};


function createNewJob() {
    let newId = uuidV1();
    return {
        _id: newId,  // temporary ID
        hasBeenSaved: false,
        status: enums.JSTAT_DRAFT,
        hasDetails: true,   // setting this to True prevents the app from trying to obtain details from the server
        questionAnswers: {},
        draftQuestionAnswers: {},
        name: ""
    };
}

function mapStateToProps(state, ownProps) {
    let jobPost = state.jobPosts.find(x => x._id === ownProps.params.jobId);

    return {
        jobPost: jobPost || createNewJob()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        jobActions: bindActionCreators(jobActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(PostOrEditJob, styles));
