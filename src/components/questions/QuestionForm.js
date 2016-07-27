import React, { Component, PropTypes } from 'react';
import AnswerTypeOptions from './AnswerTypeOptions';

class QuestionForm extends Component {

   handleChange(field, e) {
      this.props.handleChange(field, e.target.value);
   }

   handleClose(e) {
      e.preventDefault();
      this.props.handleClose();
   }



   render() {

      var inlineDiv = {
         display:'inline-block'
      };

      return (
         <div>
            <div className="question_big">
               <form onSubmit={this.props.handleSubmit.bind(this)}>

                  <input type="text"
                         value={this.props.draftQuestion.name}
                         onChange={this.handleChange.bind(this, "name")}
                         placeholder="Enter Question Name"
                         required={true}
                         autoFocus={true} />

                  <textarea value={this.props.draftQuestion.text}
                            onChange={this.handleChange.bind(this, "text")}
                            placeholder="Enter Question Text"
                            required={true} />

                  <label htmlFor="displayType">Display Type</label>
                  <div id="displayType" style={inlineDiv}>
                     <div className="radio-inline">
                        <label><input type="radio" name="optDisplayType" />Question text above input</label>
                     </div>
                     <div className="radio-inline">
                        <label><input type="radio" name="optDisplayType" />Question text inline with input</label>
                     </div>
                  </div>


                  <div className="divAnswerType">
                     <label htmlFor="answerType">Answer Type:</label>
                     <select id="answerType"
                             value={this.props.draftQuestion.answerType}
                             onChange={this.handleChange.bind(this, "answerType")}>
                        <option value="selection">Selection</option>
                        <option value="yesNo">Yes/No</option>
                        <option value="text">Text</option>
                        <option value="date">Date</option>
                     </select>

                     <div className="answerTypeOptions">
                        <AnswerTypeOptions answerType={this.props.draftQuestion.answerType}/>
                     </div>
                   </div>

                  <div className="checkbox answerTypeDiv">
                     <label><input type="checkbox" value="hideByDefault" id="hideByDefault" />Hide by Default</label>
                  </div>

                  <div className="checkbox">
                     <label><input type="checkbox" value="answerRequired" id="answerRequired" />Answer Required</label>
                  </div>

                  <div className="actions">
                     <button type="submit">{this.props.buttonLabel}</button>
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
      name: PropTypes.string,
      text: PropTypes.string,
      answerType: PropTypes.string
      }).isRequired,
   handleChange: PropTypes.func.isRequired,
   handleSubmit: PropTypes.func.isRequired,
   handleClose: PropTypes.func.isRequired
}

export default QuestionForm;
