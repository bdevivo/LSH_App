import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import CSSModules from 'react-css-modules';
import styles from '../JobPosting.css';

const JobLinkButton = ({path, jobId, isFirst, label, glyphName}) => {

    let glyphClassName = "glyphicon glyphicon-" + glyphName;
    let route = `${path}/${jobId}`;

    return (
        <span>
         {!isFirst && ' '}
         <LinkContainer to={route}>
            <Button type="button" className="btn btn-xs btn-default" aria-label={label} title={label}>
                <span className={glyphClassName}></span>
             </Button>
          </LinkContainer>
      </span>
    );
};


JobLinkButton.propTypes = {
    path: PropTypes.string.isRequired,
    jobId: PropTypes.string.isRequired,
    isFirst: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    glyphName: PropTypes.string.isRequired,
};

export default CSSModules(JobLinkButton, styles);


