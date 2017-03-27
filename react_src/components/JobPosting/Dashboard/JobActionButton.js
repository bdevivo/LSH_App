import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from '../JobPosting.css';

const JobActionButton = ({clickHandler, jobId, isFirst, label, glyphName}) => {

   let glyphClassName = "glyphicon glyphicon-" + glyphName;

   return (
      <span>
         {!isFirst && ' '}
         <Button type="button" className="btn btn-xs btn-default" aria-label={label}
               title={label}  onClick={() => clickHandler(jobId)}>
            <span className={glyphClassName}></span>
         </Button>

      </span>
   );
};


JobActionButton.propTypes = {
   clickHandler: PropTypes.func.isRequired,
   jobId: PropTypes.string.isRequired,
   isFirst: PropTypes.bool.isRequired,
   label: PropTypes.string.isRequired,
   glyphName: PropTypes.string.isRequired,
};

export default CSSModules(JobActionButton, styles);


