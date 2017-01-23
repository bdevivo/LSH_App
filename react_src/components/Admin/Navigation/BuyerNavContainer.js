import React, {PropTypes as T} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


const BuyerNavContainer = ({children}) => {


    return (
        <div>

            <Nav bsStyle="pills" activeKey={1}>
                <LinkContainer to="/admin/questionPanelListContainer">
                    <NavItem eventKey="1">Question Panels</NavItem>
                </LinkContainer>

                <LinkContainer to="/admin/conditionalQuestionListContainer">
                    <NavItem eventKey="1">Conditional Questions</NavItem>
                </LinkContainer>
            </Nav>

            {children}
        </div>
    );
};


BuyerNavContainer.propTypes = {
    children: T.object
};

export default BuyerNavContainer;
