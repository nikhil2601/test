import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

import FormGroupTitle from './FormGroupTitle';
import ErrorList from './ErrorList';

const FormGroupStyled = styled.div`
    margin-bottom: ${({ isGroup }) => !isGroup && '15px'};
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('FormGroup.styles')};
`;

function FormGroup(props) {
    const {
        children,
        classNames,
        description,
        displayLabel,
        help,
        id,
        label,
        rawErrors,
        required,
        schema,
    } = props;

    const type = _get(schema, 'type');
    const descriptionPosition = schema.descriptionPosition || 'bottom';
    const value = _get(children, '0.props.formData');
    const isFormGroup = schema.formGroup || false;
    const titleHelptext = _get(schema, 'helpText');
    const labelString = `${label}`;
    let showRequiredMark = required;
    if (!isFormGroup) {
        showRequiredMark = required && !value;
    }

    const renderLabel = () =>
        !isFormGroup &&
        displayLabel && (
            <FormGroupTitle
                helpText={titleHelptext}
                id={id}
                required={showRequiredMark}
                title={labelString}
            />
        );
    const renderDescriptionTop = () =>
        id !== 'root' && descriptionPosition === 'top' && description;
    const renderDescriptionBottom = () =>
        id !== 'root' && descriptionPosition === 'bottom' && description;

    return (
        <FormGroupStyled isGroup={isFormGroup} className={classNames} type={type}>
            {renderLabel()}
            {renderDescriptionTop()}
            {children}
            {renderDescriptionBottom()}
            <ErrorList errors={rawErrors} />
            {help}
        </FormGroupStyled>
    );
}

FormGroup.propTypes = {
    children: PropTypes.node,
    classNames: PropTypes.string,
    description: PropTypes.element,
    displayLabel: PropTypes.bool,
    help: PropTypes.element,
    id: PropTypes.string,
    label: PropTypes.string,
    rawErrors: PropTypes.array,
    required: PropTypes.bool,
    schema: PropTypes.object,
};

FormGroup.defaultProps = {
    children: null,
    classNames: '',
    description: null,
    displayLabel: true,
    help: null,
    id: null,
    label: null,
    rawErrors: null,
    required: false,
    schema: {},
};

export default FormGroup;
