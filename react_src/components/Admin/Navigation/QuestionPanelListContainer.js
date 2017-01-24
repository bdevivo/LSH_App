import React, {PropTypes as T} from 'react';
import {Button, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QuestionPanelContainer from './QuestionPanelContainer';
import CSSModules from 'react-css-modules';
import styles from './QuestionPanel.css';

class QuestionPanelListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qPanels: [...props.qPanels],
            newPanel: {_id: -1}    // -1 is code for "there is no new panel in the current state" (new panel would have _id == 0)
        };
    }

    componentDidMount() {
        this.props.questionPanelActions.getAllQuestionPanels();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({qPanels: [...nextProps.qPanels]});
    }

    onAddPanel() {

        // Calculate the index number for the panel to be added
        let nextIndex;
        if(this.state.qPanels.length === 0) {
            nextIndex = 1;
        }
        else {
            let panelIds = this.state.qPanels.map(q => q.index);
            nextIndex = Math.max(...panelIds) + 1;
        }

        let newPanel = {
            _id: 0,
            index: nextIndex,
            name: "",
            header: "",
            subheader: "",
           nextButtonText: ""
        };

        let newState = update(this.state, {
           newPanel: {$set: newPanel}
            }
        );

        this.setState(newState);
    }

    onAddPanelClose() {

        let newPanel = {
            _id: -1
        };

        let newState = update(this.state, {
           newPanel: {$set: newPanel}
            }
        );

        this.setState(newState);
    }



    render() {

       let sortedPanels = this.state.qPanels.sort((a, b) => { return a.index - b.index; });
        let panelNav = sortedPanels.map((panel, index) =>
            <LinkContainer to="/admin/questionPanel/panelId" key="index">
                <NavItem eventKey={index}>{panel.name}</NavItem>
            </LinkContainer>
        );

       let newPanel = this.state.newPanel;

       // let panelList = (
       //    sortedPanels.length > 0
       //       ? sortedPanels.map(q => <QuestionContainer key={q.index} question={q} modalVisible={false}
       //                                                     onAddQuestionClose={this.onAddQuestionClose}/>)
       //       : <p>No items to display</p>
       // );

       let newPanelForm = (
          newPanel._id === 0
             ? <QuestionPanelContainer qPanel={newPanel} modalVisible={true}
                                  onAddPanelClose={this.onAddPanelClose}/>
             : null
       );

        return (
            <div>

               <h3>Question Panels</h3>

               <div styleName="addPanelDiv">
                  <Button type="button" className="btn btn-sm btn-default" onClick={this.onAddPanel}>Add
                     Question Panel</Button>
               </div>

                <Nav bsStyle="pills" stacked activeKey={1}>
                    {panelNav}
                </Nav>

               {newPanelForm}

            </div>
        );
    }

}


QuestionPanelListContainer.propTypes = {
    qPanels: T.array.isRequired,
    questionPanelActions: T.object.isRequired
};

function mapStateToProps(state, ownProps) {
   return {
      qPanels: [...state.questionPanels]
   };
}

function mapDispatchToProps(dispatch) {
   return {
      questionPanelActions: bindActionCreators(questionPanelActions, dispatch)
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(QuestionPanelListContainer, styles));
