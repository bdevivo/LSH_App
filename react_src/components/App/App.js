// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from '../../actions/uiActions';
import HeaderContainer from '../Header/HeaderContainer';
import AlertModal from '../Common/AlertModal';
import CSSModules from 'react-css-modules';
import styles from './App.css';

class App extends React.Component {

   render() {

      return (
         <div className="container-fluid" styleName="appStyle">
            <HeaderContainer currentPath={this.props.routerPath}/>
            {this.props.children}
            <AlertModal {...this.props.alertProps} />
         </div>
      );
   }
}

App.propTypes = {
   children: PropTypes.object.isRequired,
   routerPath: PropTypes.string,
   alertProps: PropTypes.object
};

function mapStateToProps(state, ownProps) {
   return {
      routerPath: ownProps.location.pathname,
      alertProps: state.ui.alertProps
   };
}

export default connect(mapStateToProps, null)(CSSModules(App, styles));
