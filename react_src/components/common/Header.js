import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles, { active } from './Header.css';
// import LoadingDots from './LoadingDots';

const Header = () => {
   return (
      <nav styleName="nav">
         <Link to="/questions" activeClassName={styles.active}>Questions</Link>
         {" | "}
         <Link to="/navigation" activeClassName={styles.active}>Navigation</Link>
         {" | "}
         <Link to="/userprops" activeClassName={styles.active}>User Properties</Link>
          {" | "}
          <Link to="/questionwizard" activeClassName={styles.active}>Question Wizard</Link>
      </nav>
   );
};

export default CSSModules(Header, styles);
