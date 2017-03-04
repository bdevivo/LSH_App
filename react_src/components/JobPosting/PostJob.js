import React, {PropTypes as T} from 'react';
import {connect} from 'react-redux';
import styles from './JobPosting.css';
import CSSModules from 'react-css-modules';
import {bindActionCreators} from 'redux';
import * as jobPostActions from '../../actions/jobActions';
import * as questionGridActions from '../../actions/questionGridActions';
import FormContainer from '../Common/QuestionForm/FormContainer';
import SubmitJobConfirmation from './SubmitJobConfirmation';
import update from 'immutability-helper';


class PostJob extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            postingTime: undefined,
            postVisibility: undefined,
            modalVisible: false,
            questionAnswers: {}
        };

        this.onPostingTimeChanged = this.onPostingTimeChanged.bind(this);
        this.onPostVisibilityChanged = this.onPostVisibilityChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPostJob = this.onPostJob.bind(this);
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

        if (this.state.postingTime === "never") {
            this.props.jobPostActions.cancelJob
        }

    }

    render() {

        //let gridName = this.props.params.gridId === "post" ? "question_grid_job_posting" : "question_grid_user_profile";
        let gridName = "question_grid_job_posting";

        return (
            <div>

                <p styleName="pageHeader">Post a Project</p>

                <FormContainer gridName={gridName}/>

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

PostJob.propTypes = {
    //params: T.object,
};


function mapStateToProps(state, ownProps) {

    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        jobPostActions: bindActionCreators(jobPostActions, dispatch),
        questionGridActions: bindActionCreators(questionGridActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(PostJob, styles));
