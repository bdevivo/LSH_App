import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
// import LoadingDots from './LoadingDots';

const Header = () => {
   return (
      <nav>
         <Link to="/questions" activeClassName="active">Questions</Link>
         {" | "}
         <Link to="/navigation" activeClassName="active">Navigation</Link>
         {" | "}
         <Link to="/userprops" activeClassName="active">User Properties</Link>
          {" | "}
          <Link to="/questionwizard" activeClassName="active">Question Wizard</Link>
      </nav>
   );
};

export default Header;
