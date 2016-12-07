import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './Header.css';
import {Button, ButtonToolbar} from 'react-bootstrap';

const HeaderLogin = ({isLoggedIn, onLogout}) => {

   let loginDiv;

   if (isLoggedIn) {
      loginDiv = (<div className="hidden-sm hidden-xs" styleName="navRight">
         <a styleName="link" onClick={onLogout}>Logout</a>
      </div>);
   }
   else {
      loginDiv = (<div className="hidden-sm hidden-xs" styleName="navRight">
         <ButtonToolbar>
            <Button type="button" className="btn btn-sm btn-success"><Link to="/login/default" styleName="buttonLink">Login</Link></Button>

            <Button type="button" className="btn btn-sm btn-primary"><Link to="/login/hire" styleName="buttonLink">Sign
               up to hire resources</Link></Button>

            <Button type="button" className="btn btn-sm btn-primary"><Link to="/login/work" styleName="buttonLink">Sign
               up to find work</Link></Button>
         </ButtonToolbar>
      </div>);
   }

   return loginDiv;
};

HeaderLogin.propTypes = {
   isLoggedIn: PropTypes.bool.isRequired,
   onLogout: PropTypes.func.isRequired
};

export default CSSModules(HeaderLogin, styles);
