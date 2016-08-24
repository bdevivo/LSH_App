import React, { Component, PropTypes } from 'react';
import AnswerTypeOptions from './AnswerTypeOptions';
import DisplayType from '../../constants/QuestionEnum';
import AnswerType from '../../constants/AnswerTypeEnum';

class QuestionForm extends Component {

   handleChange(field, e) {
      this.props.handleChange(field, e.target.value);
   }

   handleClose(e) {
      e.preventDefault();
      this.props.handleClose();
   }

   handleSubmit(e) {
      console.log("QuestionForm: handling submit");
      this.props.handleSubmit(e);
   }

   render() {

      console.log("QuestionForm selectionOptions: " + this.props.draftQuestion.selectionOptions);

      var inlineDiv = {
         display:'inline-block'
      };

      return (
         <div>
            <div className="question_big">
               <form onSubmit={this.props.handleSubmit.bind(this)}>

                  <label htmlFor="qName">Question Name:</label>
                  <input type="text"
                         id="qName"
                         value={this.props.draftQuestion.name}
                         onChange={this.handleChange.bind(this, "name")}
                         placeholder="Enter Question Name"
                         required={true}
                         autoFocus={true} />

                  <label htmlFor="qText">Question Text:</label>
                  <textarea value={this.props.draftQuestion.text}
                            id="qText"
                            onChange={this.handleChange.bind(this, "text")}
                            placeholder="Enter Question Text"
                            required={true} />

                  <label htmlFor="displayType">Display Type</label>
                  <div id="displayType" style={inlineDiv}>
                     <div className="radio-inline">
                        <label><input type="radio" name="optDisplayType" onChange={this.handleChange.bind(this, "displayType")} value={DisplayType.ABOVE}  />Question text above input</label>
                     </div>
                     <div className="radio-inline">
                        <label><input type="radio" name="optDisplayType" onChange={this.handleChange.bind(this, "displayType")} value={DisplayType.INLINE} />Question text inline with input</label>
                     </div>
                  </div>


                  <div className="divAnswerType">
                     <label htmlFor="answerType">Answer Type:</label>
                     <select id="answerType"
                             value={this.props.draftQuestion.answerType}
                             onChange={this.handleChange.bind(this, "answerType")}>
                        <option value={AnswerType.NONE_SELECTED}>Choose an option...</option>
                        <option value={AnswerType.SELECTION}>Selection</option>
                        <option value={AnswerType.YESNO}>Yes/No</option>
                        <option value={AnswerType.TEXT}>Text</option>
                        <option value={AnswerType.DATE}>Date</option>
                     </select>

                     <div className="answerTypeOptions">
                        <AnswerTypeOptions
                           answerType={this.props.draftQuestion.answerType}
                           selectionOptions={this.props.draftQuestion.selectionOptions}
                           AnswerTypeCallbacks = {this.props.AnswerTypeCallbacks}
                        />
                     </div>
                   </div>

                  <div className="checkbox answerTypeDiv">
                     <label><input type="checkbox" value="topLevel" id="topLevel" />Top Level</label>
                  </div>



                  <div className="actions">
                     <button type="button" onClick={this.handleSubmit.bind(this)}>{this.props.buttonLabel}</button>
                  </div>
               </form>
            </div>

            <div className="overlay" onClick={this.handleClose.bind(this)}>
            </div>

         </div>
      );
   }
}

QuestionForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    draftQuestion: PropTypes.shape({
        id: PropTypes.node,
        name: PropTypes.string,
        text: PropTypes.string,
        selectionOptions: PropTypes.arrayOf(React.PropTypes.string),
        answerType: PropTypes.string
      }).isRequired,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleClose: PropTypes.func,
    AnswerTypeCallbacks: PropTypes.object
};

export default QuestionForm;
