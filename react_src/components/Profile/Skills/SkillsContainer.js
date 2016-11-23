import React, {PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../../../actions/profileActions';
import update from 'immutability-helper';
import SkillsEdit from './SkillsEdit';
import SkillsDetails from './SkillsDetails';


class SkillsContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            skills: props.skills || [],
            ui: props.ui,
            showModal: false
        };

        this.updateProfileSkills = this.updateProfileSkills.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.enterEditMode = this.enterEditMode.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        let path = this.props.route.path;
        this.props.uiActions.profileSectionEntered(path);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.skills !== this.state.skills) {
            this.setState({skills: nextProps.skills});
        }
    }

    // Called when any field except State is updated
    updateProfileSkills(vals) {
        this.setState({skills: vals});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.profileActions.updateProfileSkills(this.state.skills);
        this.closeModal();
    }

    handleCancel() {
        // restore initial state
        this.setState({skills: this.props.skills});
        this.closeModal();
    }

    enterEditMode()
    {
        let newState = update(this.state, {
            showModal: {$set: true}});

        this.setState(newState);
    }

    closeModal() {
        this.setState({showModal: false});
    }


    render() {
        return (
            <div>
                <SkillsDetails
                    skills={this.state.skills}
                    enterEditMode={this.enterEditMode}
                />


                <Modal dialogClassName="skillsModal" show={this.state.showModal} onHide={this.closeModal}>
                    <SkillsEdit
                        skills={this.state.skills}
                        handleSubmit={this.handleSubmit}
                        handleCancel={this.handleCancel}
                        updateProfileSkills={this.updateProfileSkills}/>
                </Modal>

            </div>
        );
    }
}

SkillsContainer.propTypes = {
    skills: PropTypes.array,
    ui: PropTypes.object,
    profileActions: PropTypes.object,
    uiActions: PropTypes.object,
    profileEditFuncs: PropTypes.object,
    route: PropTypes.object
};

function mapStateToProps(state) {
    return {
        skills: state.profile.skills || []
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillsContainer);
