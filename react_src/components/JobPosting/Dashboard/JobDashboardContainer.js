import React, {PropTypes as T} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JobDashboard from './JobDashboard';
import JobDetails from './JobDetails';
import * as jobActions from '../../../actions/jobActions';
import * as userActions from '../../../actions/userActions';
import * as questionActions from '../../../actions/questionActions';
import * as jobHelpers from '../../../utils/jobHelpers';
import update from 'immutability-helper';
import {confirm} from '../../../utils/confirm';


class JobDashboardContainer extends React.Component {
    constructor(props) {
        super(props);

        let allJobDetails;
        if (this.props.allJobPosts && this.props.allJobPosts.length > 0 && this.props.areJobUserNamesLoaded) {
            allJobDetails = this.props.allJobPosts.map(job => jobHelpers.getJobDisplayData(job, this.props.userNames));
        }

        this.state = {
            allJobDetails: allJobDetails,
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

    componentDidMount() {
        if (!this.props.areQuestionsLoaded) {
            this.props.questionActions.getAllQuestions();
        }

        if (!this.props.areJobPostingsLoaded) {
            this.props.jobActions.getJobDashboardData();
        }

    }

    componentWillReceiveProps(nextProps) {

        let allJobDetails = this.state.allJobDetails;

        if (nextProps.allJobPosts && nextProps.allJobPosts.length > 0 && nextProps.areJobUserNamesLoaded) {
            let jobUserNames = this.props.userNames.map(x => {
                let userName = x.hasOwnProperty('user_name') ? `${x.user_name.first} ${x.user_name.last}` : '[no name provided]';
               return {
                   userId: x.auth0_id,
                   name: userName
                };
            });

            allJobDetails = nextProps.allJobPosts.map(job => jobHelpers.getJobDisplayData(job, jobUserNames));
        }

        this.setState({
            allJobDetails: allJobDetails,
            ...nextProps
        });
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

        let dashboardComponent = (this.props.areJobPostingsLoaded && this.props.areJobUserNamesLoaded
                ? (<JobDashboard
                    jobPostings={this.props.allJobPosts}
                    jobDetails={this.state.allJobDetails}
                    onViewJob={this.onViewJob}
                    onEditJob={this.onEditJob}
                    onDeleteJob={this.onDeleteJob}
                    onPostJob={this.onPostJob}
                    onChangeVisibility={this.onChangeVisibility}
                />)
                : null);

        let jobDetailsComponent = (this.state.selectedJob && this.props.areQuestionsLoaded
            ? (<JobDetails
                job={this.state.selectedJob}
                jobDetails={this.state.selectedJobDetails}
                modalVisible={this.state.viewDetailsModalVisible}
                onCloseModal={this.onCloseViewJob}
                allQuestions={this.props.allQuestions}
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
    allJobPosts: T.array,
    userNames: T.array,
    allQuestions: T.array,
    areJobPostingsLoaded: T.bool.isRequired,
    areJobUserNamesLoaded: T.bool.isRequired,
    areQuestionsLoaded: T.bool,
    jobActions: T.object.isRequired,
    userActions: T.object.isRequired,
    questionActions: T.object.isRequired,
    userId: T.string
};

function mapStateToProps(state) {

    return {
        allJobPosts: state.jobPosts,
        userNames: state.users.userNames,
        allQuestions: [...state.questions],
        areJobPostingsLoaded: state.loadedData.jobPostings,
        areJobUserNamesLoaded: state.loadedData.jobUserNames,
        areQuestionsLoaded: state.loadedData.questions,
        userId: state.profile.auth0_id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        jobActions: bindActionCreators(jobActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        questionActions: bindActionCreators(questionActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDashboardContainer);
