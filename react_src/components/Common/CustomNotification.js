import React, {PropTypes} from 'react';

const CustomNotification = ({ message, canDismiss, icon, id, handleDismiss}) => {
    let styles = {
        margin: '5px 0',
        padding: '2px 5px',
        border: '1px solid #333',
        float: 'right',
        clear: 'right',
        width: '330px',
        boxSizing: 'border-box',
    };

    if (canDismiss) {
        styles = Object.assign({}, styles, {cursor: 'pointer'});
    }
    return (
        <div onClick={(e) => {
            if (canDismiss) {
                handleDismiss(id);
            }
        }} style={styles}>
            {message}
        </div>
    );
};

CustomNotification.propTypes = {
    message: PropTypes.string.isRequired,
    canDismiss: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleDismiss: PropTypes.func.isRequired,
};

export default CustomNotification;
