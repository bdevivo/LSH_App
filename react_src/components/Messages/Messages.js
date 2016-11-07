import React, { PropTypes as T } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import AuthService from '../../auth_utils/AuthService';
//import styles from './styles.module.css';

class Messages extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            publicMsg: "",
            privateMsg: ""
        };
    }
// KEEPING THIS EXAMPLE AROUND.  IN PRODUCTION THIS SHOULD NOT HAPPEN IN componentDidMount
    // componentDidMount(){
    //     const { auth } = this.props;
    //     // public http request
    //     fetch('/api/public')
    //         .then(response => response.json())
    //         .then(response => this.setState({publicMsg: response.message}));
    //
    //     // using auth to send an http request with authorization header
    //     auth.fetch('/api/private')
    //         .then(response =>
    //             {
    //                 console.log(response.message);
    //                 this.setState({privateMsg: response.message});
    //             }
    //         )
    //         .catch(error => this.setState({privateMsg: "Error fetching private resource: " + error }));
    // }

    render(){

        let rootStyle = {
            width: '320px',
            margin: '10px auto'
        };


        return (
            <ListGroup className={rootStyle}>
                <ListGroupItem header="/api/public response">
                    {this.state.publicMsg}
                </ListGroupItem>
                <ListGroupItem header="/api/private response">
                    {this.state.privateMsg}
                </ListGroupItem>
            </ListGroup>
        );
    }
}

Messages.propTypes =  {
    auth: T.instanceOf(AuthService)
};

export default Messages;
