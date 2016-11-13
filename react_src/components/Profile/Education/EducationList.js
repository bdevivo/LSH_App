import React, {PropTypes} from 'react';
import EducationDetails from './EducationDetails';
import CSSModules from 'react-css-modules';
import styles from './Education.css';


const EducationList = ({educationRecords, enterEducationEditMode}) => {

    let educationDetailsList = (
        educationRecords.length > 0
            ? educationRecords.map(edu => <li key={edu.id}><EducationDetails educationRecord={edu} enterEducationEditMode={enterEducationEditMode} /></li>)
            : <p>No items to display</p>
    );

    return (
        <div>
            <ul>
                {educationDetailsList}
            </ul>

            <p><a href="#" onClick={() => enterEducationEditMode(0)}>Add</a></p>

        </div>
    );

};

EducationList.propTypes = {
    educationRecords: PropTypes.array.isRequired,
    enterEducationEditMode: PropTypes.func.isRequired
};

export default CSSModules(EducationList, styles);
