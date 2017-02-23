import React, {PropTypes as T} from 'react';
import {connect} from 'react-redux';
import styles from './JobPosting.css';
import CSSModules from 'react-css-modules';
//import {bindActionCreators} from 'redux';
//import * as questionPanelActions from '../../../actions/questionPanelActions';
import FormContainer from '../Common/QuestionForm/FormContainer';
import update from 'immutability-helper';


class PostJobQuestionGrid extends React.Component {


    render() {

        let gridName = this.props.params.gridId === "post" ? "question_grid_job_posting" : "question_grid_user_profile";

        return (
            <div>

                <p styleName="pageHeader">Post a Project</p>

                <FormContainer gridName={gridName} />

            </div>
        );
    }

}

PostJobQuestionGrid.propTypes = {
    params: T.object,
};


function mapStateToProps(state, ownProps) {

    return {};
}


export default connect(mapStateToProps, null)(CSSModules(PostJobQuestionGrid, styles));
