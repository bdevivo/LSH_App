import React, {PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import styles from '../Winterfell.css';
import CSSModules from 'react-css-modules';

class TextInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          value : this.getSafeInputValue(this.props.value)
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: this.getSafeInputValue(nextProps.value)
        });
    }

    getSafeInputValue(val) {
        return (val === null || typeof val === 'undefined'
            ? ""
            : val);
    }


    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (

            <FormControl type="text"
                         name={this.props.name}
                         id={this.props.id}
                         className={this.props.classes.input}
                         placeholder={this.props.placeholder}
                         value={this.state.value}
                         autoFocus
                         required={this.props.required
                             ? 'required'
                             : undefined}
                         onChange={this.handleChange}
                         onKeyPress={this.handleKeyPress}
                         onBlur={this.props.onBlur.bind(null, this.props.value)}
                         onKeyDown={this.props.onKeyDown}/>


            //   <input type="text"
            //          name={this.props.name}
            //          id={this.props.id}
            //          //aria-labelledby={this.props.labelId}
            //          className={this.props.classes.input}
            //          placeholder={this.props.placeholder}
            //          value={this.state.value}
            //          required={this.props.required
            //                      ? 'required'
            //                      : undefined}
            //          onChange={this.handleChange.bind(this)}
            //          onBlur={this.props.onBlur.bind(null, this.state.value)}
            //          onKeyDown={this.props.onKeyDown} />
            // );
            //}

        );
    }
}

TextInput.propTypes = {
    classes: PropTypes.object,
    name: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    required: PropTypes.bool
};

TextInput
    .defaultProps = {
    classes: {},
    name: undefined,
    id: undefined,
    value: undefined,
    placeholder: undefined,
    onChange: () => {
    },
    onBlur: () => {
    },
    onKeyDown: () => {
    }
};

module.exports = TextInput;