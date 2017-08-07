// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import HeaderContainer from '../Header/HeaderContainer';
import FooterContainer from '../Footer/FooterContainer';
import CSSModules from 'react-css-modules';
import styles from './App.css';

class App extends React.Component {

   render() {

        let bodyStyle = (this.props.routerPath === "/" || this.props.routerPath.indexOf("Home") > -1 ? "homeContainer" : "bodyContainer");

      return (
         <div  styleName="appStyle">
             <div id="main">
                 <HeaderContainer currentPath={this.props.routerPath}/>
                 <div styleName={bodyStyle}>
                     {this.props.children}
                 </div>
             </div>

                 <FooterContainer />

         </div>
      );
   }
}

App.propTypes = {
   children: PropTypes.object.isRequired,
   routerPath: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
   return {
      routerPath: ownProps.location.pathname,
   };
}

export default connect(mapStateToProps, null)(CSSModules(App, styles));
