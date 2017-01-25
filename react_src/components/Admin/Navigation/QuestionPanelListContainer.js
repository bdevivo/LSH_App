import React, {PropTypes as T} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import * as questionPanelActions from '../../../actions/questionPanelActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CSSModules from 'react-css-modules';
import styles from './QuestionPanel.css';

class QuestionPanelListContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         qPanels: [...props.qPanels]
      };
   }

   componentDidMount() {
      this.props.questionPanelActions.getAllQuestionPanels();
   }

   componentWillReceiveProps(nextProps) {
      this.setState({qPanels: [...nextProps.qPanels]});
   }

   render() {

      let children = this.props.children;
      let currentPanel = children && React.cloneElement(
            children,
            {
               qPanels: this.state.qPanels,
               questionPanelActions: this.props.questionPanelActions,
               userName: this.props.userName
            });

      let sortedPanels = this.state.qPanels.sort((a, b) => {
         return a.index - b.index;
      });
      let panelNav = sortedPanels.map((panel, index) =>
         <LinkContainer to="/admin/questionPanel/panelId" key="index">
            <NavItem eventKey={index}>{panel.name}</NavItem>
         </LinkContainer>
      );


      return (
         <div>

            <h3>Question Panels</h3>


            <Nav bsStyle="pills" stacked activeKey={1}>
               {panelNav}
            </Nav>

            {currentPanel}

         </div>
      );
   }

}


QuestionPanelListContainer.propTypes = {
   qPanels: T.array.isRequired,
   questionPanelActions: T.object,
   children: T.object.isRequired,
   userName: T.string
};

function mapStateToProps(state, ownProps) {
   return {
      qPanels: [...state.questionPanels],
      userName: state.profile.user_name.short
   };
}

function mapDispatchToProps(dispatch) {
   return {
      questionPanelActions: bindActionCreators(questionPanelActions, dispatch)
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(QuestionPanelListContainer, styles));
