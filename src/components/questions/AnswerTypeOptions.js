import React, { Component, PropTypes } from 'react';

class SelectionOption extends Component {
    render() {
        return(
            <ul>
                <li>option 1</li>
                <li>option 2</li>
                <li>option 3</li>
            </ul>
        );
    }
}

class TextOption extends Component {
    render() {
        return(
            <input type="text"
                   name="textOption"
                   placeholder="label for text"
                   required={true}
                   autoFocus={true} />
        );
    }
}


class BooleanOption extends Component {

    render() {

        let divStyle = {

        };
        return(
            <div style={divStyle}>
                <input type="text"
                       name="boolYes"
                       placeholder="label for Yes option"
                       required={true}
                       autoFocus={true} />

                <input type="text"
                    name="boolNo"
                    placeholder="label for No option"
                    required={true}
                    autoFocus={true} />
            </div>
        );
    }
}


class AnswerTypeOptions extends Component {

    render() {
        return(

            <div className="answerTypeOptions">
                { this.props.answerType == "selection" ? <SelectionOption /> : null }
                { this.props.answerType == "text" ? <TextOption /> : null }
                { this.props.answerType == "yesNo" ? <BooleanOption /> : null }
            </div>
        );
    }



}


AnswerTypeOptions.propTypes = {
    answerType: PropTypes.string.isRequired
}

export default AnswerTypeOptions;
