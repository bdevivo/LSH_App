import React, { Component, PropTypes } from 'react';
import AnswerType from '../../constants/AnswerTypeEnum';

class SelectionOption extends Component {

    handleChange(field, e) {
        this.props.handleChange(field, e.target.value);
    }


    render() {
        return(
            <ul className="answerTypeSelection">
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
            <div>

                <label htmlFor="textWidth">Width:</label>
                <input type="text"
                       name="textWidth"
                       id="textWidth"
                       required={true}/>

                <div className="checkbox-inline">
                    <label><input type="checkbox" value="multiLine" id="multiLine" />MultiLine</label>
                </div>

                <div className="checkbox-inline">
                    <label><input type="checkbox" value="numericText" id="numericText" />Numeric only</label>
                </div>


            </div>
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
                       placeholder="label for Yes option"/>

                <input type="text"
                    name="boolNo"
                    placeholder="label for No option"/>
            </div>
        );
    }
}

class DateOption extends Component {

    render() {

        var inlineDiv = {
            display:'inline-block'
        };

        return(
            <div id="displayType" style={inlineDiv}>
                <div className="radio-inline">
                    <label><input type="radio" name="optDateType" value={AnswerType.SINGLE} />Single date</label>
                </div>
                <div className="radio-inline">
                    <label><input type="radio" name="optDateType" value={AnswerType.RANGE} />Date range</label>
                </div>
                <div className="radio-inline">
                    <label><input type="radio" name="optDateType" value={AnswerType.SCHEDULE} />Schedule</label>
                </div>
            </div>
        );
    }
}


class AnswerTypeOptions extends Component {

    render() {
        return(

            <div className="answerTypeOptions">
                { this.props.answerType == "s" ? <SelectionOption /> : null }
                { this.props.answerType == "t" ? <TextOption /> : null }
                { this.props.answerType == "yn" ? <BooleanOption /> : null }
                { this.props.answerType == "d" ? <DateOption /> : null }
            </div>
        );
    }



}


AnswerTypeOptions.propTypes = {
    answerType: PropTypes.string.isRequired
};

export default AnswerTypeOptions;
