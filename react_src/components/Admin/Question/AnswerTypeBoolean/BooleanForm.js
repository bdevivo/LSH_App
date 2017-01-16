import React, {PropTypes as T} from 'react';
import BooleanItemContainer from './BooleanItemContainer';
import styles from './Boolean.css';
import CSSModules from 'react-css-modules';

class BooleanForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let question = this.props.question;
        if ((typeof question.booleanOptions == 'undefined')) {
            question.booleanOptions = {
                yesText: "",
                noText: ""
            };
        }

        let booleanItems = [
            {
                name: "yes",
                prompt: 'Text for "Yes" option: ',
                text: question.booleanOptions.yesText
            },
            {
                name: "no",
                prompt: 'Text for "No" option: ',
                text: question.booleanOptions.noText
            }
        ];

        let booleanOptions = booleanItems.map((item, i) => (
            <BooleanItemContainer key={i} booleanItem={item} onEditItemSave={this.props.onSave} />
        ));

        return (
            <div>
                {booleanOptions}
            </div>
        );
    }
}

BooleanForm.propTypes = {
    question: T.object.isRequired,
    onSave: T.func.isRequired,
};

export default CSSModules(BooleanForm, styles);
