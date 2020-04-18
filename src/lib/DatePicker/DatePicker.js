import PropTypes from 'prop-types';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePicker(props) {
    const { onBlur, onChange, onSelect, selected, ...rest } = props;

    return (
        <ReactDatePicker
            onBlur={onBlur}
            onChange={onChange}
            onSelect={onSelect}
            selected={selected}
            {...rest}
        />
    );
}

DatePicker.propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

DatePicker.defaultProps = {
    onBlur: null,
    onChange: null,
    onSelect: null,
    selected: '',
};

export default DatePicker;
