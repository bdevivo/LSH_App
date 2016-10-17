// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from '../Common/Header';
import CSSModules from 'react-css-modules';
import styles from './App.css';

class App extends React.Component {

   render() {

      let children = null;
      if (this.props.children) {
         children = React.cloneElement(this.props.children, {
            auth: this.props.route.auth //sends auth instance to children
         });
      }

      return (
         <div className="container-fluid" styleName="appStyle">
            <Header auth={this.props.route.auth} />
            {children}
         </div>
      );
   }
}

App.propTypes = {
   children: PropTypes.object.isRequired,
   route: PropTypes.object
};


export default CSSModules(App, styles);
