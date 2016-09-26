import React, { Component, PropTypes } from 'react';
import AnswerType from '../../constants/AnswerTypeEnum';

class SelectionOption extends Component {

    checkInputKeyPress(evt){
        if(evt.key === 'Enter'){
            this.props.AnswerTypeCallbacks.addSelectionOption(evt.target.value);
            evt.target.value = '';
        }
    }

    render() {
       let options;
       //console.log("Rendering SelectionOption");
       //console.log("selectionOptions: " + this.props.selectionOptions);
       if (typeof(this.props.selectionOptions) !== "undefined" && this.props.selectionOptions !== null)
       {
          options = this.props.selectionOptions.map(
             (opt) => <li key={opt}>{opt}{' '}
                <a href="#" className="answerType-option-remove" onClick={
                   this.props.AnswerTypeCallbacks.deleteSelectionOption(null, opt)
                }/></li>
          );
       }

       return(
           <div>
               <h4>Options:</h4>
                <div className="answerTypeOptions">
                    <ul className="answerTypeSelection">
                        {options}
                    </ul>
                </div>
              <div className="add-selection-option">
                    <input type="text"
                        placeholder="Type here, then hit Enter to add option"
                        onKeyPress={this.checkInputKeyPress(this)}  />
              </div>
           </div>
        );
    }
}

SelectionOption.propTypes = {
   selectionOptions: PropTypes.arrayOf(React.PropTypes.string),
   AnswerTypeCallbacks: PropTypes.object
};

class TextOption extends Component {

    handleChange(field, isCheckBox, e) {
        //console.log("field: " + field + "   isCheckBox: " + isCheckBox + "   e: " + e);
        this.props.AnswerTypeCallbacks.handleTextOptionChange(field, e.target.value, isCheckBox);
    }

    render() {
        return(
            <div>

                <label htmlFor="textWidth">Width:</label>
                <input type="text"
                       name="textWidth"
                       value={this.props.textOptions.width}
                       onChange={this.handleChange(this, "width", false)}
                       id="textWidth"
                       required/>

                <div className="checkbox-inline">
                    <label><input
                        type="checkbox"
                        value="multiLine"
                        onChange={this.handleChange(this, "multiLine", true)}
                        id="multiLine" />MultiLine</label>
                </div>

                <div className="checkbox-inline">
                    <label><input
                        type="checkbox"
                        value="numeric"
                        onChange={this.handleChange(this, "numeric", true)}
                        id="numeric" />Numeric only</label>
                </div>
            </div>
        );
    }
}

TextOption.propTypes = {
    textOptions: PropTypes.shape({
        width: PropTypes.number,
        multiLine: PropTypes.bool,
        numeric: PropTypes.bool
    }),
    AnswerTypeCallbacks: PropTypes.object
};

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

        let inlineDiv = {
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
            <div className="answerTypeContainer">
                { this.props.answerType == "s" ? <SelectionOption selectionOptions={this.props.selectionOptions} AnswerTypeCallbacks={this.props.AnswerTypeCallbacks} /> : null }
                { this.props.answerType == "t" ? <TextOption textOptions={this.props.textOptions} AnswerTypeCallbacks={this.props.AnswerTypeCallbacks} /> : null }
                { this.props.answerType == "yn" ? <BooleanOption /> : null }
                { this.props.answerType == "d" ? <DateOption /> : null }
            </div>
        );
    }
}


AnswerTypeOptions.propTypes = {
    answerType: PropTypes.string.isRequired,
    selectionOptions: PropTypes.arrayOf(React.PropTypes.string),
    textOptions: PropTypes.shape({
        width: PropTypes.number,
        multiLine: PropTypes.bool,
        numeric: PropTypes.bool
    }),
    AnswerTypeCallbacks: PropTypes.object
};

export default AnswerTypeOptions;
