import React, {PropTypes} from 'react';

class FileInput extends React.Component {

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
    return (<input type="file"
                  name={this.props.name}
                  id={this.props.id}
                  //aria-labelledby={this.props.labelId}
                  className={this.props.classes.file}
                  required={this.props.required
                              ? 'required'
                              : undefined}
                  onChange={this.handleChange.bind(this)}
                  onBlur={this.props.onBlur.bind(null, this.state.value)} />);
  }

}

FileInput.propTypes = {
    classes     : PropTypes.object,
    name        : PropTypes.string,
    id          : PropTypes.string,
    value       : PropTypes.string,
    onChange    : PropTypes.func,
    onBlur      : PropTypes.func,
    required    : PropTypes.bool
};

FileInput.defaultProps = {
  classes   : {},
  name      : undefined,
  id        : undefined,
  value     : undefined,
  onChange  : () => {},
  onBlur    : () => {}
};

module.exports = FileInput;