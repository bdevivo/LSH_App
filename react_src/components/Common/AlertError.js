import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { confirmable } from 'react-confirm';
import CSSModules from 'react-css-modules';
import styles from './Alert.css';

class AlertError extends React.Component {
   render() {
      const {
         okLabel = 'OK',
         title,
         message,
         show,
         proceed,
         dismiss,
      } = this.props;

      return (
         <div className="static-modal">
            <Modal
               show={show}
               onHide={dismiss}
               backdrop="static"
               dialogClassName="alertError">

               <Modal.Header>
                  <Modal.Title><span className="glyphicon glyphicon-remove-circle"></span>{' '}{title}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  {message}
               </Modal.Body>
               <Modal.Footer>
                  <Button onClick={proceed}>{okLabel}</Button>
               </Modal.Footer>
            </Modal>
         </div>
      );
   }
}

AlertError.propTypes = {
   okLabel: PropTypes.string,
   title: PropTypes.string,
   message: PropTypes.string,
   show: PropTypes.bool,
   proceed: PropTypes.func,     // called when ok button is clicked.
   dismiss: PropTypes.func,     // called when backdrop is clicked or escaped.
};

export default confirmable(CSSModules(AlertError, styles));
