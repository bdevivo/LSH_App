import React, {PropTypes} from 'react';

class Button extends React.Component {

  handleClick(e) {
    e.preventDefault();

    this.props.onClick();
  }

  render() {
    return (
      <button href="#"
         className={this.props.className}
         onClick={this.handleClick.bind(this)}>
        {this.props.text}
      </button>
    );
  }

}

Button.propTypes = {
    text      : PropTypes.string,
    className : PropTypes.string,
    onClick   : PropTypes.func,
};

Button.defaultProps = {
  text      : 'Submit',
  className : undefined,
  onClick   : () => {}
};

module.exports = Button;