import React, {PropTypes} from 'react';

class HiddenInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value : this.props.value
    };
  }

  render() {
    return (
      <input type="hidden"
             name={this.props.name}
             value={this.state.value}/>
    );
  }

}

HiddenInput.propTypes = {
    name        : PropTypes.string,
    value       : PropTypes.string,
};

HiddenInput.defaultProps = {
  name  : undefined,
  value : undefined
};

module.exports = HiddenInput;