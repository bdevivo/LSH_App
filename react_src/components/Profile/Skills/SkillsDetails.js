import React, {PropTypes} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Skills.css';


const SkillsDetails = ({skills, enterEditMode}) => {

    let skillBadges =
        skills.length > 0
            ? skills.map(s => { return <span key={s.value}><span className="badge alert-info">{s.label}</span>{ }</span>; })
            : <p>No items to display</p>;

    return (
        <div>
            <Row styleName="userProfile">
                <Col md={12}>
                    {skillBadges}
                </Col>
            </Row>

            <Row styleName="editRow">
                <Col md={2}>
                    <Button type="button" className="btn btn-sm btn-default" aria-label="Edit"
                            onClick={enterEditMode}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </Button>
                </Col>
            </Row>

        </div>
    );

};

SkillsDetails.propTypes = {
    skills: PropTypes.array.isRequired,
    enterEditMode: PropTypes.func.isRequired,
};

export default CSSModules(SkillsDetails, styles);
