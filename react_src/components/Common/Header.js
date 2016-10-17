import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles, { active } from './Header.css';
// import LoadingDots from './LoadingDots';

const Header = ({auth}) => {

    function onLogin()
    {
        auth.login();
    }

    function onLogout()
    {
        auth.logout();
    }

    function isLoggedIn()
    {
        return auth.loggedIn();
    }

    let loginDiv;
    if (isLoggedIn())
    {
        loginDiv = (<div className="hidden-sm hidden-xs" styleName="navRight">
            <a styleName="link" onClick={onLogout}>Logout</a>
        </div>);
    }
    else
        {
        loginDiv = (<div className="hidden-sm hidden-xs" styleName="navRight">
            <a styleName="link" onClick={onLogin}>Sign In/Sign Up</a>
        </div>);
    }

   return (
       <header styleName="nav">

            {/* TODO: only show these when logged in*/}
           <nav>
               <Link to="/admin" activeClassName={styles.active}>Admin</Link>
               {" | "}
               <Link to="/questionwizard" activeClassName={styles.active}>Question Wizard</Link>

               {loginDiv}

           </nav>




       </header>
   );
};

Header.propTypes = {
    auth: PropTypes.object.isRequired
};


export default CSSModules(Header, styles);
