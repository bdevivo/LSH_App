import React, {PropTypes as T} from 'react';
import {Nav, NavItem, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import * as questionPanelActions from '../../../actions/questionPanelActions';
import * as questionSetActions from '../../../actions/questionSetActions';
import * as questionActions from '../../../actions/questionActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class QuestionSetListContainer extends React.Component {
    constructor(props) {
        super(props);

        let qSets = this.props.qSets;
        let activeQuestionSetId = '0';

        if (qSets.length > 0) {
            activeQuestionSetId = qSets[0]._id;
        }

        this.state = {
            qSets: qSets,
            questions: this.props.questions,
            qPanels: this.props.qPanels,
            activeQuestionSetId: activeQuestionSetId,
            userClickedQuestionSetId: "0"
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

        if (!this.props.areQuestionSetsLoaded) {
            this.props.questionSetActions.getAllQuestionSets();
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            qSets: [...nextProps.qSets],
            questions: [...nextProps.questions],
            qPanels: [...nextProps.qPanels],
            activeQuestionSetId: nextProps.params.id
        });
    }

    onNavSelect(eventKey, event) {
        let href = event.target.href;
        let qSetId = href.substr(href.lastIndexOf('/') + 1);
        this.setState({
            userClickedQuestionSetId: qSetId,
            activeQuestionSetId: qSetId
        });

        this.props.questionSetActions.questionSetSelected(qSetId);
    }

    render() {

        let panelTargets = this.state.qPanels.map((panel, i) => {
            return {
                id: panel._id,
                name: panel.name
            };
        });

        let children = this.props.children;
        let currentQuestionSet = children && React.cloneElement(
                children,
                {
                    questionSets: this.state.qSets,
                    questions: this.state.questions,
                    panelTargets: panelTargets,
                    questionSetActions: this.props.questionSetActions,
                    selectedQuestionSetId: this.props.selectedQuestionSetId,
                    userClickedQuestionSetId: this.state.userClickedQuestionSetId,
                    userName: this.props.userName
                });

        let sortedQuestionSets = this.state.qSets.sort((a, b) => {
            return a.index - b.index;
        });

        let questionSetNav = sortedQuestionSets.map((qSet, index) => {
            let path = "/admin/qsets/qset/" + qSet._id;
            let panel = this.state.qPanels.find(p => p._id == qSet.questionPanelId);
            let panelName = panel ? panel.name : null;

            return (<LinkContainer to={path} key={index} active={this.state.activeQuestionSetId == qSet._id}>
                <NavItem>{panelName}</NavItem>
            </LinkContainer>);
        });


        return (
            <div>

                <h3>Question Sets</h3>

                <Row>

                    <Col md={3}>
                        <Nav bsStyle="pills" stacked onSelect={this.onNavSelect}>
                            {questionSetNav}
                        </Nav>
                    </Col>

                    <Col md={9}>
                        {currentQuestionSet}
                    </Col>
                </Row>

            </div>
        );
    }

}


QuestionSetListContainer.propTypes = {
    qSets: T.array.isRequired,
    questions: T.array.isRequired,
    qPanels: T.array.isRequired,
    arePanelsLoaded: T.bool,
    areQuestionsLoaded: T.bool,
    areQuestionSetsLoaded: T.bool,
    questionPanelActions: T.object,
    questionSetActions: T.object,
    questionActions: T.object,
    selectedQuestionSetId: T.string,
    children: T.object.isRequired,
    userName: T.string
};

function mapStateToProps(state, ownProps) {
    return {
        qSets: [...state.questionSets],
        qPanels: [...state.questionPanels],
        questions: [...state.questions],
        arePanelsLoaded: state.loadedData.questionSets,
        areQuestionSetsLoaded: state.loadedData.questionSets,
        areQuestionsLoaded: state.loadedData.questions,
        selectedQuestionSetId: state.ui.admin_active_qSet_id,
        userName: state.profile.user_name.short
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionPanelActions: bindActionCreators(questionPanelActions, dispatch),
        questionSetActions: bindActionCreators(questionSetActions, dispatch),
        questionActions: bindActionCreators(questionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSetListContainer);
