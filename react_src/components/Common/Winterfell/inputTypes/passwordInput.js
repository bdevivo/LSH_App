import React, {PropTypes} from 'react';

class PasswordInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value : this.props.value
    };
  }

  handleChange(e) {
    this.setState({
      value : e.target.value
    }, this.props.onChange.bind(null, e.target.value));
  }

  render() {
    return (
      <input type="password"
             name={this.props.name}
             id={this.props.id}
             //aria-labelledby={this.props.labelId}
             className={this.props.classes.input}
             placeholder={this.props.placeholder}
             value={this.state.value}
             required={this.props.required
                         ? 'required'
                         : undefined}
             onChange={this.handleChange.bind(this)}
             onBlur={this.props.onBlur.bind(null, this.state.value)}
             onKeyDown={this.props.onKeyDown} />
    );
  }

}

PasswordInput.propTypes = {
    classes     : PropTypes.object,
    name        : PropTypes.string,
    id          : PropTypes.string,
    value       : PropTypes.string,
    placeholder : PropTypes.string,
    onChange    : PropTypes.func,
    onKeyDown   : PropTypes.func,
    onBlur      : PropTypes.func,
    required    : PropTypes.bool
};

PasswordInput.defaultProps = {
  classes     : {},
  name        : undefined,
  id          : undefined,
  value       : undefined,
  placeholder : undefined,
  onChange    : () => {},
  onBlur      : () => {},
  onKeyDown   : () => {}
};

module.exports = PasswordInput;