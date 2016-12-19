// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import HeaderContainer from '../Header/HeaderContainer';
import CSSModules from 'react-css-modules';
import styles from './App.css';

class App extends React.Component {

   render() {

      return (
         <div className="container-fluid" styleName="appStyle">
            <HeaderContainer currentPath={this.props.routerPath} />
            {this.props.children}
         </div>
      );
   }
}

App.propTypes = {
   children: PropTypes.object.isRequired,
    routerPath: PropTypes.string
};

function mapStateToProps(state, ownProps) {
    return {
        routerPath: ownProps.location.pathname
    };
}

export default connect(mapStateToProps, null)(CSSModules(App, styles));
