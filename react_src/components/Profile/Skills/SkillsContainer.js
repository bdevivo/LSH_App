import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../../../actions/profileActions';
import update from 'immutability-helper';
import SkillsEdit from './SkillsEdit';


class SkillsContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.profile,
            ui: props.ui
        };

        this.updateProfileSkills = this.updateProfileSkills.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillMount()
    {
        let path = this.props.route.path;
        this.props.uiActions.profileSectionEntered(path);
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.profile !== this.state.profile)
        {
            this.setState({profile: nextProps.profile});
        }
    }



    // Called when any field except State is updated
    updateProfileSkills(vals) {
        //const field = event.target.name;
        //let vals = val.map(x => x.value);
        let newProfile = update(this.state.profile,
            {
                skills: {$set: vals}
            }
        );

        this.setState({profile: newProfile});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.profileActions.updateProfileSkills(this.state.profile.skills);
    }

    handleCancel()
    {
       // restore initial state
        let newProfile = update(this.state.profile,
            {
                skills: {$set: this.props.profile.skills}
            }
        );

        this.setState({profile: newProfile});
    }


    render()
    {
        return (
            <SkillsEdit
                skills={this.state.profile.skills}
                handleSubmit={this.handleSubmit}
                handleCancel={this.handleCancel}
                updateProfileSkills={this.updateProfileSkills}/>
        );
    }
}

SkillsContainer.propTypes = {
    profile: PropTypes.object,
    ui: PropTypes.object,
    profileActions: PropTypes.object,
    uiActions: PropTypes.object,
    profileEditFuncs: PropTypes.object,
    route: PropTypes.object
};

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillsContainer);
