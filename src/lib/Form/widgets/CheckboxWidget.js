import PropTypes from 'prop-types';
import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import Divider from 'lib/Divider';
import { getThemeProps } from 'utils/theme';

const CheckboxWidgetStyled = styled.div`
    font-size: 14px;
    label {
        align-items: baseline;
        display: flex;
        justify-content: flex-start;
        margin: 0;
        input {
            margin-right: 10px;
        }
    }
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('CheckboxWidget.styles')};
`;

function CheckboxWidget(props) {
    const { id, value, required, disabled, readonly, label, onChange, options } = props;
    const { divider, className } = options;
    const renderDivider = typeof divider === 'boolean' ? divider : !_isEmpty(divider);
    return (
        <CheckboxWidgetStyled className={className} disabled={disabled || readonly}>
            <label htmlFor={id}>
                <input
                    checked={typeof value === 'undefined' ? false : value}
                    disabled={disabled || readonly}
                    id={id}
                    onChange={event => onChange && onChange(event.target.checked)}
                    required={required}
                    type="checkbox"
                />
                <span>{label}</span>
            </label>
            {renderDivider && <Divider {...divider} />}
        </CheckboxWidgetStyled>
    );
}

CheckboxWidget.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.object,
    readonly: PropTypes.bool,
    required: PropTypes.bool,
    value: PropTypes.bool,
};

CheckboxWidget.defaultProps = {
    disabled: false,
    label: '',
    onChange: null,
    options: null,
    readonly: false,
    required: false,
    value: false,
};

export default CheckboxWidget;
