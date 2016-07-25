import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
   render() {
      return (
         <div>
            <h1>Question Navigation</h1>
            <p>List of Navigation Scenarios, plus Add Scenario button</p>
            {/*<Link to="about" className="btn btn-primary btn-lg">Learn more</Link>*/}
         </div>
      );
   }
}

export default HomePage;
