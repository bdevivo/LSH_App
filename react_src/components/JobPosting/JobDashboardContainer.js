import React, {PropTypes as T} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import JobDashboard from './JobDashboard';
import * as jobActions from '../../actions/jobActions';
import * as questionHelpers from '../../utils/questionHelpers';


class JobDashboardContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         allJobPosts: this.props.allJobPosts,

      };
   }

   componentDidMount() {
      if (!this.props.areJobPostingsLoaded) {
         this.props.jobActions.getJobSummariesForUser(this.props.userId);
      }
   }

   onViewJob(jobId) {

   }

   onEditJob(jobId) {

   }

   onDeleteJob(jobId) {

   }

   onPostJob(jobId) {

   }

   onChangeVisibility(jobId) {

   }

   render() {

      let jobDisplayData = this.props.allJobPosts.map(job => questionHelpers.getJobDisplayData(job));

      return (
         <JobDashboard
            jobPostings={this.props.allJobPosts}
            onViewJob={this.onViewJob}
            onEditJob={this.onEditJob}
            onDeleteJob={this.onDeleteJob}
            onPostJob={this.onPostJob}
            onChangeVisibility={this.onChangeVisibility}
         />
      );
   }

}


JobDashboardContainer.propTypes = {
   allJobPosts: T.array,
   areJobPostingsLoaded: T.bool.isRequired,
   jobActions: T.object.isRequired,
   userId: T.string
};

function mapStateToProps(state) {

   return {
      allJobPosts: state.jobPosts,
      areJobPostingsLoaded: state.loadedData.jobPostings,
      userId: state.profile.auth0_id
   };
}

function mapDispatchToProps(dispatch) {
   return {
      jobActions: bindActionCreators(jobActions, dispatch),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDashboardContainer);
