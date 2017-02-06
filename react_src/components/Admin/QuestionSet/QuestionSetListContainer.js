import React, {PropTypes as T} from 'react';
import {Nav, NavItem, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import * as questionPanelActions from '../../../actions/questionPanelActions';
import * as questionActions from '../../../actions/questionActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class QuestionPanelListContainer extends React.Component {
    constructor(props) {
        super(props);

        let qPanels = this.props.qPanels;
        let activePanelId = '0';

        if (qPanels.length > 0) {
            activePanelId = qPanels[0]._id;
        }

        this.state = {
            qPanels: qPanels,
            questions: this.props.questions,
            activePanelId: activePanelId,
            userClickedPanelId: "0"
        };

        this.onNavSelect = this.onNavSelect.bind(this);
    }

    componentDidMount() {
        if (!this.props.arePanelsLoaded) {
            this.props.questionPanelActions.getAllPanels();
        }

        if (!this.props.areQuestionsLoaded) {
            this.props.questionActions.getAllQuestions();
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            qPanels: [...nextProps.qPanels],
            questions: [...nextProps.questions],
            activePanelId: nextProps.params.id
        });
    }

    onNavSelect(eventKey, event) {
        let href = event.target.href;
        let panelId = href.substr(href.lastIndexOf('/') + 1);
        this.setState({
            userClickedPanelId: panelId,
            activePanelId: panelId
        });

        this.props.questionPanelActions.panelSelected(panelId);
    }

    render() {

        let children = this.props.children;
        let currentPanel = children && React.cloneElement(
                children,
                {
                    qPanels: this.state.qPanels,
                    questions: this.state.questions,
                    questionPanelActions: this.props.questionPanelActions,
                    selectedPanelId: this.props.selectedPanelId,
                    userClickedPanelId: this.state.userClickedPanelId,
                    userName: this.props.userName
                });

        let sortedPanels = this.state.qPanels.sort((a, b) => {
            return a.index - b.index;
        });

        let panelNav = sortedPanels.map((panel, index) => {
            let path = "/admin/panels/panel/" + panel._id;
            return (<LinkContainer to={path} key={index} active={this.state.activePanelId == panel._id} >
                <NavItem>{panel.name}</NavItem>
            </LinkContainer>);
        });


        return (
            <div>

                <h3>Question Panels</h3>

                <Row>

                    <Col md={3}>
                        <Nav bsStyle="pills" stacked onSelect={this.onNavSelect}>
                            {panelNav}
                        </Nav>
                    </Col>

                    <Col md={9}>
                        {currentPanel}
                    </Col>
                </Row>

            </div>
        );
    }

}


QuestionPanelListContainer.propTypes = {
    qPanels: T.array.isRequired,
    questions: T.array.isRequired,
    arePanelsLoaded: T.bool,
    areQuestionsLoaded: T.bool,
    questionPanelActions: T.object,
    questionActions: T.object,
    selectedPanelId: T.string,
    children: T.object.isRequired,
    userName: T.string
};

function mapStateToProps(state, ownProps) {
    return {
        qPanels: [...state.questionPanels],
        questions: [...state.questions],
        arePanelsLoaded: state.loadedData.questionPanels,
        areQuestionsLoaded: state.loadedData.questions,
        selectedPanelId : state.ui.admin_active_panel_id,
        userName: state.profile.user_name.short
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionPanelActions: bindActionCreators(questionPanelActions, dispatch),
        questionActions: bindActionCreators(questionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPanelListContainer);
