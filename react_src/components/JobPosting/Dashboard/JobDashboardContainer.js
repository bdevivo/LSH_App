import React, {PropTypes as T} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JobDashboard from './JobDashboard';
import JobDetails from './JobDetails';
import * as jobActions from '../../../actions/jobActions';
import * as userActions from '../../../actions/userActions';
import * as questionActions from '../../../actions/questionActions';
import update from 'immutability-helper';
import {confirm} from '../../../utils/confirm';


class JobDashboardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allJobDetails: null,
            allQuestions: null,
            selectedJob: null,
            selectedJobDetails: {},
            viewDetailsModalVisible: false
        };

        this.onViewJob = this.onViewJob.bind(this);
        this.onCloseViewJob = this.onCloseViewJob.bind(this);
        this.onEditJob = this.onEditJob.bind(this);
        this.onDeleteJob = this.onDeleteJob.bind(this);
        this.onPostJob = this.onPostJob.bind(this);
        this.onChangeVisibility = this.onChangeVisibility.bind(this);
        this.getJob = this.getJob.bind(this);
        this.getJobDetails = this.getJobDetails.bind(this);
    }

    componentWillMount() {

        // load the initial jobs with details
        this.props.dispatch(jobActions.getJobDashboardData(this.props.loadedData, this.props.jobPostsDisplay))
            .then(jobPostsDisplay => {
                this.setState({
                    allJobDetails: jobPostsDisplay
                });
            })
            .catch(error => {
                throw(error);   // TODO: add real error handler action
            });


        this.props.dispatch(questionActions.getAllQuestions())
            .then(questions => {
                this.setState({
                    allQuestions: questions
                });
            })
            .catch(error => {
                throw(error);   // TODO: add real error handler action
            });


    }


    componentWillReceiveProps(nextProps) {

        // this.setState({
        //     allJobDetails: allJobDetails,
        //     ...nextProps
        // });
    }

    getJob(jobId) {
        return this.props.allJobPosts.find(x => x._id === jobId);
    }

    getJobDetails (jobId) {
        return this.state.allJobDetails.find(x => x.jobId === jobId);
    }

    onViewJob(jobId) {
        let selectedJob = this.getJob(jobId);
        if (selectedJob)
        {
            let selectedJobDetails = this.getJobDetails(jobId);
            let newState = update(this.state, {
                selectedJob: {$set: selectedJob},
                selectedJobDetails: {$set: selectedJobDetails},
                viewDetailsModalVisible: {$set: true}
            });

            this.setState(newState);
        }

    }

    onCloseViewJob() {
        this.setState(update(this.state, {
            viewDetailsModalVisible: {$set: false}
        }));
    }

    onEditJob(jobId) {

    }

    onDeleteJob(jobId) {
        let jobDetails = this.getJobDetails(jobId);
        confirm(`Delete job "${jobDetails.name}"?`).then(() => {
            this.props.jobActions.deleteJob(jobId);
        }, () => {
            // user clicked Cancel -- do nothing
        });
    }

    onPostJob(jobId) {

    }

    onChangeVisibility(jobId) {

    }

    render() {
        // if the user hit the Back button from the question grid, don't render this page (the user
        // will be automatically re-directed to the page they're on)
        if(this.props.isInQuestionAnswerMode) {
            return null;
        }

        let dashboardComponent = (this.state.allJobDetails
                ? (<JobDashboard
                    jobPostings={this.state.allJobDetails }
                    onViewJob={this.onViewJob}
                    onEditJob={this.onEditJob}
                    onDeleteJob={this.onDeleteJob}
                    onPostJob={this.onPostJob}
                    onChangeVisibility={this.onChangeVisibility}
                />)
                : null);

        let jobDetailsComponent = (this.state.selectedJob && this.state.allQuestions
            ? (<JobDetails
                job={this.state.selectedJob}
                jobDetails={this.state.selectedJobDetails}
                modalVisible={this.state.viewDetailsModalVisible}
                onCloseModal={this.onCloseViewJob}
                allQuestions={this.state.allQuestions}
            />)
            : null);

        return (
            <div>
                {dashboardComponent}
                {jobDetailsComponent}
            </div>
        );
    }

}


JobDashboardContainer.propTypes = {
    dispatch: T.func,
    loadedData: T.object,
    jobPostsDisplay: T.array,
    allJobPosts: T.array,
    userNames: T.array,
    allQuestions: T.array,
    areQuestionsLoaded: T.bool,
    jobActions: T.object.isRequired,
    userActions: T.object.isRequired,
    questionActions: T.object.isRequired,
    userId: T.string,
    isInQuestionAnswerMode: T.bool
};

function mapStateToProps(state) {

    return {
        loadedData: state.loadedData,
        jobPostsDisplay: state.jobPostsDisplay,
        allJobPosts: state.jobPosts,
        userNames: state.users.userNames,
        allQuestions: [...state.questions],
        areQuestionsLoaded: state.loadedData.questions,
        userId: state.profile.auth0_id,
        isInQuestionAnswerMode: state.ui.isInQuestionAnswerMode
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        jobActions: bindActionCreators(jobActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        questionActions: bindActionCreators(questionActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDashboardContainer);
