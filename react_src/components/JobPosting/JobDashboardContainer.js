import React, {PropTypes as T} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';

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

   render() {

    let jobDisplayData = this.props.allJobPosts.map(job => questionHelpers.getJobDisplayData(job));

      return (
         <JobDashboard jobPostings={jobDisplayData} />
      );


   }

}


JobDashboardContainer.propTypes = {
    allJobPosts: T.array,

};

function mapStateToProps(state) {

   return {
      //jobPostings: [...state.jobPostings],
       allJobPosts: state.jobPosts
   };
}

function mapDispatchToProps(dispatch) {
   return {
      jobActions: bindActionCreators(jobActions, dispatch),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDashboardContainer);
