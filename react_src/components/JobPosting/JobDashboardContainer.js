import React, {PropTypes as T} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';

import JobDashboard from './JobDashboard';
import * as jobActions from '../../actions/jobActions';


class JobDashboardContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         jobPostings: this.props.jobPostings,

      };
   }

   render() {



      return (
         <JobDashboard jobPostings={this.state.jobPostings} />
      );


   }

}


JobDashboardContainer.propTypes = {
   jobPostings: T.array,

};

function mapStateToProps(state) {

   return {
      //jobPostings: [...state.jobPostings],
      jobPostings: []
   };
}

function mapDispatchToProps(dispatch) {
   return {
      jobActions: bindActionCreators(jobActions, dispatch),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDashboardContainer);
