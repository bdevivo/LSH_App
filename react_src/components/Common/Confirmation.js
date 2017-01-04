import React, { PropTypes } from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { confirmable } from 'react-confirm';

class Confirmation extends React.Component {
   render() {
      const {
         okLabel = 'OK',
         cancelLabel = 'Cancel',
         message,
         show,
         proceed,
         dismiss,
         cancel,
         enableEscape = false,
      } = this.props;

      return (
         <div className="static-modal">
            <Modal
               show={show}
               onHide={dismiss}
               backdrop={enableEscape ? true : 'static'}
               keyboard={enableEscape}
               dialogClassName="confirmDialog">

               <Modal.Body>
                  {message}
               </Modal.Body>
               <Modal.Footer>
                  <Button onClick={cancel}>{cancelLabel}</Button>
                  <Button onClick={proceed}>{okLabel}</Button>
               </Modal.Footer>
            </Modal>
         </div>
      );
   }
}

Confirmation.propTypes = {
   okLabel: PropTypes.string,
   cancelLabel: PropTypes.string,
   message: PropTypes.string,
   show: PropTypes.bool,
   proceed: PropTypes.func,     // called when ok button is clicked.
   cancel: PropTypes.func,      // called when cancel button is clicked.
   dismiss: PropTypes.func,     // called when backdrop is clicked or escaped.
   enableEscape: PropTypes.bool,
};

export default confirmable(Confirmation);
