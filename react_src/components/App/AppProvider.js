import React, {Component, PropTypes} from 'react';
import {persistStore} from 'redux-persist';
//import { persistStore } from 'redux-persist-immutable';
import {Provider} from 'react-redux';

//const store = configureStore(initialState);
//store.dispatch(getAllQuestions());

// hotmodule reloading fix
// if (module.hot) {
//     module.hot.accept();
// }


export default class AppProvider extends Component {
    constructor() {
        super();
        this.state = {rehydrated: false};
    }

    componentWillMount() {
        //debugger;

        //persistStore(this.props.store).purge();

        persistStore(this.props.store, {}, () => {
            this.setState({rehydrated: true});
        });
    }

    render() {
        if (!this.state.rehydrated) {
            return <div>Loading...</div>;
        }
        return (
            <Provider store={this.props.store}>
                {this.props.children}
            </Provider>
        );
    }
}

AppProvider.propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};
