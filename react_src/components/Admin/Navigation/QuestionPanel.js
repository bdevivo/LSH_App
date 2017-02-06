import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './QuestionPanel.css';

const QuestionPanel = ({qPanel, panelTargets}) => {

    let subHeader = <p><b>Sub-header: </b> {qPanel.subHeader}</p>;
    let defaultAction;
    if (qPanel.defaultAction.action === "goto")
    {
        defaultAction = "GO TO ";
        let targetPanel = panelTargets.find(x => x.id == qPanel.defaultAction.target);
        if (targetPanel) {
            defaultAction += targetPanel.name;
        }
    }
    else {
        defaultAction = "SUBMIT";
    }

    let panel_body =
        (<div>
            <p><b>Header: </b> {qPanel.header}</p>
            {qPanel.subHeader && qPanel.subHeader.length > 0 && subHeader}
            <p><b>Default Action: </b> {defaultAction}</p>
            <p><b>"Next" button text:</b> {qPanel.nextButtonText}</p>
            <p><b>"Back" button text:</b> {qPanel.backButtonText}</p>
        </div>);


    return (

        <Row styleName="questionPanelDiv">

            <Col md={6} styleName="questionPanelBodyDiv">
                { panel_body }
            </Col>

        </Row>
    );
};


QuestionPanel.propTypes = {
    qPanel: PropTypes.object.isRequired,
    panelTargets: PropTypes.array.isRequired
};

export default CSSModules(QuestionPanel, styles);


