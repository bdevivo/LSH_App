import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
// import LoadingDots from './LoadingDots';

const Header = () => {
   return (
      <nav>
         <IndexLink to="/" activeClassName="active">Questions</IndexLink>
         {" | "}
         <Link to="/navigation" activeClassName="active">Navigation</Link>
         {" | "}
         <Link to="/userprops" activeClassName="active">User Properties</Link>
      </nav>
   );
};

export default Header;
