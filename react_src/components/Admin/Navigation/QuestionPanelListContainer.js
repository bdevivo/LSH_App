import React, {PropTypes as T} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import QuestionPanelContainer from './QuestionPanelContainer';

class QuestionPanelListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qPanels: [...props.qPanels],
            newPanel: {_id: -1}    // -1 is code for "there is no new panel in the current state" (new panel would have _id == 0)
        };
    }

    componentDidMount() {
        this.props.questionActions.getAllQuestionPanels();
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
            answerType: "none"
        };

        let newState = update(this.state, {
                newQuestion: {$set: newQuestion}
            }
        );

        this.setState(newState);
    }

    onAddPanelClose() {

        let newQuestion = {
            _id: -1
        };

        let newState = update(this.state, {
                newQuestion: {$set: newQuestion}
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

       let questionList = (
          sortedQuestions.length > 0
             ? sortedQuestions.map(q => <QuestionContainer key={q.index} question={q} modalVisible={false}
                                                           onAddQuestionClose={this.onAddQuestionClose}/>)
             : <p>No items to display</p>
       );

       let newPanelForm = (
          newQuestion._id === 0
             ? <QuestionPanelContainer question={newQuestion} modalVisible={true}
                                  onAddQuestionClose={this.onAddQuestionClose}/>
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

            </div>
        );
    }

}




QuestionPanelListContainer.propTypes = {
    qPanels: T.array.isRequired,
    questionActions: T.object.isRequired
};

export default QuestionPanelListContainer;
