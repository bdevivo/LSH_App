import React, {PropTypes} from 'react';

class EmailInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value : this.props.value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
     this.setState({
       value : e.target.value
     }, this.props.onChange(e.target.value));
  }

  render() {
    return (
      <input type="email"
             name={this.props.name}
             id={this.props.id}
             //aria-labelledby={this.props.labelId}
             className={this.props.classes.input}
             placeholder={this.props.placeholder}
             value={this.state.value}
             required={this.props.required
                         ? 'required'
                         : undefined}
             onChange={this.handleChange}
             onBlur={this.props.onBlur.bind(null, this.state.value)}
             onKeyDown={this.props.onKeyDown}
      />
    );
  }

}

EmailInput.propTypes = {
    classes     : PropTypes.object,
    name        : PropTypes.string,
    id          : PropTypes.string,
    value       : PropTypes.string,
    placeholder : PropTypes.string,
    onChange    : PropTypes.func,
    onBlur      : PropTypes.func,
    onKeyDown   : PropTypes.func,
    required    : PropTypes.bool
};

EmailInput.defaultProps = {
  classes     : {},
  name        : undefined,
  id          : undefined,
  value       : "",
  placeholder : undefined,
  onChange    : () => {},
  onBlur      : () => {},
  onKeyDown   : () => {}
};

module.exports = EmailInput;