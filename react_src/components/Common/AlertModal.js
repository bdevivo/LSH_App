import React, {Component, PropTypes} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from '../../actions/uiActions';
import CSSModules from 'react-css-modules';
import styles from './Alert.css';

class AlertModal extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         visible: this.props.visible
      };

      this.close = this.close.bind(this);
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.visible != this.state.visible) {
         this.setState({visible: nextProps.visible});
      }
   }

   close() {
      this.setState({visible: false});
      this.props.uiActions.hideAlert();
   }


   render() {

      return (
            <Modal
               backdrop="static"
               animation={false}
               show={this.state.visible}
               onHide={this.close}
               dialogClassName={this.props.className}>

               <Modal.Header closeButton>
                  <Modal.Title><span className="glyphicon glyphicon-remove-circle"></span>{' '}{this.props.header}</Modal.Title>
               </Modal.Header>

               <Modal.Body>
                  {this.props.message}
               </Modal.Body>

               <Modal.Footer>
                  <Button onClick={this.close}>{this.props.okButtonText}</Button>
               </Modal.Footer>

            </Modal>
      );
   }
}


AlertModal.propTypes = {
   header: PropTypes.string.isRequired,
   message: PropTypes.string.isRequired,
   okButtonText: PropTypes.string.isRequired,
   visible: PropTypes.bool.isRequired,
   className: PropTypes.string.isRequired,
   uiActions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
   return {
      visible: state.ui.alertProps.visible
   };
}

function mapDispatchToProps(dispatch) {
   return {
      uiActions: bindActionCreators(uiActions, dispatch)
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(AlertModal, styles));


