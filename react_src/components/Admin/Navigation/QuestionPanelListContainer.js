import React, {PropTypes as T} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class QuestionPanelListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qPanels: this.props.qPanels
        };
    }

    componentDidMount() {
        this.props.questionActions.getAllQuestionPanels();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({qPanels: [...nextProps.qPanels]});
    }

    onAddQuestion() {

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

    onAddQuestionClose() {

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
        let panelNav = this.state.qPanels.map((panel, index) =>
            <LinkContainer to="/admin/questionPanel/panelId" key="index">
                <NavItem eventKey={index}>{panel.name}</NavItem>
            </LinkContainer>
        );

        return (
            <div>

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
