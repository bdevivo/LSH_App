import React from 'react';
import { render } from 'react-dom';
import question_wizard_store from './stores/question_wizard_store';
import TestPage from './TestPage';


export default class QuestionWizardPage extends React.Component {
    constructor() {
        super();
        this.state = {
            questions: []
        };
    }

    componentWillMount(){
        // The initial state of the component is
        // taken from the initial state of the Flux store.
        this.setState({questions: question_wizard_store.state});
    }

    componentDidMount() {
        question_wizard_store.on('change', this.onStoreChange.bind(this));
    }

    // Removes the store "change" listener.
    componentWillUnmount() {
        question_wizard_store.removeListener('change', this.onStoreChange);
    }

    // re-render when store changes
    onStoreChange(state)
    {
        this.setState({questions: state});
    }

    // Renders a list of items.
    render() {
        return (
            <TestPage Questions={this.state.questions}/>
        );
    }
}
