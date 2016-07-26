import React, { Component, PropTypes } from 'react';

class QuestionForm extends Component {

   handleChange(field, e) {
      this.props.handleChange(field, e.target.value);
   }

   handleClose(e) {
      e.preventDefault();
      this.props.handleClose();
   }

   render() {
      return (
         <div>
            <div className="question_big">
               <form onSubmit={this.props.handleSubmit.bind(this)}>

                  <input type="text"
                         value={this.props.draftQuestion.name}
                         onChange={this.handleChange.bind(this, "name")}
                         placeholder="Name"
                         required={true}
                         autoFocus={true} />

                  <textarea value={this.props.draftQuestion.text}
                            onChange={this.handleChange.bind(this, "text")}
                            placeholder="Question Text"
                            required={true} />

                  <label htmlFor="answerType">Answer Type</label>
                  <select id="answerType"
                          value={this.props.draftQuestion.answerType}
                          onChange={this.handleChange.bind(this, "answerType")}>
                     <option value="selection">Selection</option>
                     <option value="yesNo">Yes/No</option>
                     <option value="text">Text</option>
                     <option value="date">Date</option>
                     <option value="dateRange">Date Range</option>
                     <option value="schedule">Calendar Schedule</option>
                  </select>

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
