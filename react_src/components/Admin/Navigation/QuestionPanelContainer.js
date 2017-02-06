import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import update from 'immutability-helper';
import QuestionPanel from './QuestionPanel';
import QuestionPanelEditContainer from './QuestionPanelEditContainer';
import {browserHistory} from 'react-router';
import {alertError, confirm} from '../../../utils/confirm';
import CSSModules from 'react-css-modules';
import styles from './QuestionPanel.css';

const cloneDeep = require('lodash/cloneDeep');

class QuestionPanelContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            qPanels: [],
            questions: this.props.questions,
            editPanel: {},
            showModal: false
        };

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.onAddPanel = this.onAddPanel.bind(this);
        this.onAddPanelClose = this.onAddPanelClose.bind(this);
        this.onRemovePanel = this.onRemovePanel.bind(this);
        this.onEditPanel = this.onEditPanel.bind(this);
    }

    componentDidMount() {

        if (this.props.params.id == '0' && this.props.selectedPanelId != '0') {
            browserHistory.push("/admin/panels/panel/" + this.props.selectedPanelId);
        }
        else {   // initial mount (no panel selected)
            let panelState = this.getPanelState(this.props);
            browserHistory.push("/admin/panels/panel/" + panelState.panelId);
        }
    }

    componentWillReceiveProps(nextProps) {
        let panelState = this.getPanelState(nextProps);
        this.setState(panelState);
        if (nextProps.selectedPanelId != '0'
            && nextProps.selectedPanelId != panelState.panelId
            && nextProps.userClickedPanelId != nextProps.selectedPanelId)
        {
            browserHistory.push("/admin/panels/panel/" + nextProps.selectedPanelId);
        }
    }

    getPanelState(props) {
        let panelId = props.params.id;
        let qPanels = [...props.qPanels];
        let currentPanel;

        if (qPanels && qPanels.length === 0) {
            currentPanel = {};
        }
        else if (panelId === '0') {
            currentPanel = qPanels[0];
            panelId = currentPanel._id;
        }
        else {
            currentPanel = qPanels.find(x => x._id === panelId);
            currentPanel = currentPanel || qPanels[0];
        }

        return {
            qPanels: qPanels,
            questions: props.questions,
            panelId: panelId,
            currentPanel: currentPanel
        };
    }

    onAddPanel() {

        // Calculate the index number for the panel to be added
        let nextIndex;
        if (this.state.qPanels.length === 0) {
            nextIndex = 1;
        }
        else {
            let panelIds = this.state.qPanels.map(q => q.index);
            nextIndex = Math.max(...panelIds) + 1;
        }

        let editPanel = {
            _id: '0',
            index: nextIndex,
            name: "",
            header: "",
            subheader: "",
            nextButtonText: "",
            backButtonText: "",
            defaultAction: {
                action: "goto",
                target: ""
            },
            conditionalActions: []
        };

        let newState = update(this.state, {
                editPanel: {$set: editPanel},
                showModal: {$set: true}
            }
        );

        this.setState(newState);
    }

    onAddPanelClose() {

        let newPanel = {};

        let newState = update(this.state, {
                newPanel: {$set: newPanel},
                showModal: {$set: false}
            }
        );

        this.setState(newState);
    }

    onRemovePanel() {
        confirm(`Delete panel?`).then(() => {

            // find the index of the previous panel in the list -- this will be the next active panel
            let panels = this.state.qPanels;
            let removeIndex = panels.findIndex(x => x._id == this.state.panelId);
            let nextSelectedId = '0';
            if (panels.length > 1) {
                nextSelectedId = (removeIndex == 0 ? panels[1]._id : panels[removeIndex - 1]._id);
            }

            this.props.questionPanelActions.removePanel(this.state.panelId, nextSelectedId);
        }, () => {
            // user clicked Cancel -- do nothing
        });
    }

    onEditPanel() {
        let editPanel = cloneDeep(this.state.currentPanel);

        let newState = update(this.state, {
                editPanel: {$set: editPanel},
                showModal: {$set: true}
            }
        );

        this.setState(newState);
    }


    render() {

        let hasPanels = this.state.qPanels && this.state.qPanels.length > 0;

        let panelTargets = this.state.qPanels.map(panel => {
            return {
                id: panel._id,
                name: panel.name
            };
        });

        let staticPanelInfo = hasPanels ? <QuestionPanel qPanel={this.state.currentPanel} panelTargets={panelTargets}/> : null;

        let addEditButtons = (<div styleName="addEditButtonsDiv">
            <Button type="button" className="btn btn-xs btn-default" aria-label="Edit"
                    onClick={this.onEditPanel}>
                <span className="glyphicon glyphicon-pencil"></span>
            </Button>

            {' '}

            <Button type="button" className="btn btn-xs btn-default" aria-label="Remove"
                    onClick={this.onRemovePanel}>
                <span className="glyphicon glyphicon-remove"></span>
            </Button>
        </div>);

        return (
            <div>

                {/* ADD PANEL BUTTON */}
                <div styleName="addPanelDiv">
                    <Button type="button" className="btn btn-sm btn-default" onClick={this.onAddPanel}>Add New</Button>
                </div>

                {hasPanels && staticPanelInfo}

                {hasPanels && addEditButtons}

                {/* EDIT MODAL -- ONLY SHOWN WHEN ADDING OR EDITING A PANEL */}
                <QuestionPanelEditContainer  // this is a new question
                    qPanel={this.state.editPanel}
                    questions={this.state.questions}
                    userName={this.props.userName}
                    questionPanelActions={this.props.questionPanelActions}
                    modalVisible={this.state.showModal}   // if we are adding a new panel, show the Add Panel modal
                    onAddPanelClose={this.onAddPanelClose}
                    panelTargets={panelTargets}/>

            </div>);
    }
}

QuestionPanelContainer.propTypes = {
    qPanels: PropTypes.array,
    questions: PropTypes.array,
    questionPanelActions: PropTypes.object,
    selectedPanelId: PropTypes.string,
    userClickedPanelId: PropTypes.string,
    userName: PropTypes.string,
    params: PropTypes.object.isRequired
};

export default CSSModules(QuestionPanelContainer, styles);
