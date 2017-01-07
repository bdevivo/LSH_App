import React, {PropTypes as T} from 'react';
import {Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


const AdminContainer = ({children}) => {


    return (
        <div>
            <Nav bsStyle="tabs">

               <LinkContainer to="/admin/questionList">
                  <NavItem eventKey="1">Buyer Questions</NavItem>
               </LinkContainer>

                <NavItem eventKey="2" title="Item">Future Use</NavItem>
                <NavItem eventKey="3" disabled>Future Use</NavItem>
                <NavDropdown eventKey="4" title="Future Use" id="nav-dropdown">
                    <MenuItem eventKey="4.1">Action</MenuItem>
                    <MenuItem eventKey="4.2">Another action</MenuItem>
                    <MenuItem eventKey="4.3">Something else here</MenuItem>
                    <MenuItem divider/>
                    <MenuItem eventKey="4.4">Separated link</MenuItem>
                </NavDropdown>


            </Nav>
            {children}
        </div>
    );
};


AdminContainer.propTypes = {
    children: T.object
};

export default AdminContainer;
