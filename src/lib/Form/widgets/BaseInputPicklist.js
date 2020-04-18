import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import getDisplayName from 'recompose/getDisplayName';
import styled from 'styled-components';

import Button from 'lib/Button';
import Input from 'lib/Input';
import InputMask from 'lib/Input/InputMask';
import { getThemeProps } from 'utils/theme';
import { isClassComponent } from 'utils/component';

const PicklistButton = styled.div``;

const BaseInputPicklistStyled = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    ${PicklistButton} {
        margin-left: 15px;
    }
    /**
     * Add all of the remaining styles from the theme
     */
    ${getThemeProps('BaseInputPicklist.styles')};
`;

class BaseInputPicklist extends React.Component {
    state = {
        showPicklist: false,
    };

    /**
     * Get info about the picklist component if the picklist
     * prop exists in the schema
     *
     * @method getPicklistComponent
     * @return {Object}             The info about the picklist component
     */
    getPicklistComponent = () => {
        const { formContext, schema } = this.props;
        // Extract the picklist out of the schema
        const picklist = _get(schema, 'picklist');
        // Extract the picklists from the formContext
        const contextPicklists = _get(formContext, 'picklists');
        // Find the picklist component from the contextPicklists
        const PicklistComponent =
            !_isEmpty(picklist) &&
            picklist.id &&
            contextPicklists.find(item => getDisplayName(item).includes(picklist.id));
        // Determine whether the found component is a valid react component.
        // This validation excludes HTML tagNames, and strings, it must be a functional stateless or statefull or styled component.
        const valid =
            React.isValidElement(PicklistComponent) || isClassComponent(PicklistComponent);
        // If needed, we can assign a ref for the wrapped or regular React component
        const PicklistRef = valid && (PicklistComponent.WrappedComponent || PicklistComponent);

        return {
            valid,
            picklistProps: picklist,
            Component: PicklistComponent,
            componentRef: PicklistRef,
        };
    };

    /**
     * Handle the picklist close property
     *
     * @method handlePicklistClose
     */
    handlePicklistClose = () => {
        this.setState(() => ({ showPicklist: false }));
    };

    /**
     * Handle the picklist onPick property
     *
     * @method handlePicklistOnPick
     * @param  {Object}             formData The formData from the picklist
     */
    handlePicklistOnPick = ({ formData }) => {
        if (!_isEmpty(formData)) {
            this.handleUpdateFormData(formData);
            this.handlePicklistClose();
        }
    };

    /**
     * Handle the picklist show property
     *
     * @method handlePicklistShow
     */
    handlePicklistShow = () => {
        this.setState(() => ({ showPicklist: true }));
    };

    /**
     * Handle updating the formData to the current form
     *
     * @method handleUpdateFormData
     * @param  {Object}             formData The updated formData
     */
    handleUpdateFormData = formData => {
        const { formContext, schema } = this.props;
        // Make a copy of the current formData from the formContext
        const updatedFormData = { ...formContext.getFormData() };
        // Extract the pickmap out of the schema
        const pickmap = _get(schema, 'pickmap');
        // For each of the keys in the pickmap we will update the
        // copied form data (updatedFormData)
        Object.keys(pickmap).forEach(pickMapKey => {
            _set(updatedFormData, pickMapKey, _get(formData, pickmap[pickMapKey]));
        });
        // Update the form with the newly set data
        formContext.updateFormData({ formData: updatedFormData });
    };

    /**
     * Render the picklist if present
     *
     * @method renderPicklist
     * @return {JSX}
     */
    renderPicklist = () => {
        const { showPicklist } = this.state;
        const { readonly } = this.props;
        const Picklist = this.getPicklistComponent();

        if (readonly || !Picklist.valid) {
            return null;
        }

        return (
            <PicklistButton>
                <Button noMinWidth type="button" onClick={this.handlePicklistShow}>
                    ...
                </Button>
                {React.createElement(Picklist.Component, {
                    close: this.handlePicklistClose,
                    onPick: this.handlePicklistOnPick,
                    isOpen: showPicklist,
                    picklistProps: Picklist.picklistProps,
                })}
            </PicklistButton>
        );
    };

    render() {
        const {
            autofocus,
            disabled,
            formContext,
            id,
            onBlur,
            onChange,
            onFocus,
            options,
            readonly,
            registry,
            schema,
            value,
            ...inputProps
        } = this.props;

        if (!id) {
            throw new Error(`no id for BaseInputPicklist ${JSON.stringify(this.props)}`);
        }

        inputProps.type = options.inputType || inputProps.type || 'text';
        const _onChange = ({ target: { value } }) =>
            onChange(value === '' ? options.emptyValue : value);
        const { rawErrors, ...cleanProps } = inputProps;
        // Determine if we are rendering an input mask.
        const maskedInput = Boolean(
            !_isEmpty(options.inputMask) &&
                options.inputMask.mask &&
                Array.isArray(options.inputMask.mask)
        );

        // Render the masked input if there is a mask option available.
        if (maskedInput) {
            return (
                <BaseInputPicklistStyled>
                    <InputMask
                        {...options.inputMask}
                        guide={options.inputMask.guide || true}
                        autoFocus={autofocus}
                        disabled={disabled}
                        id={id}
                        readOnly={readonly}
                        showMask={options.showMaskPlaceholder}
                        value={value == null ? '' : value}
                        {...cleanProps}
                        onChange={_onChange}
                        onBlur={
                            typeof onBlur === 'function' &&
                            (event => onBlur(id, event.target.value))
                        }
                        onFocus={
                            typeof onFocus === 'function' &&
                            (event => onFocus(id, event.target.value))
                        }
                    />
                </BaseInputPicklistStyled>
            );
        }

        return (
            <BaseInputPicklistStyled>
                <Input
                    autoFocus={autofocus}
                    disabled={disabled}
                    id={id}
                    readOnly={readonly}
                    value={value == null ? '' : value}
                    {...cleanProps}
                    onChange={_onChange}
                    onBlur={
                        typeof onBlur === 'function' && (event => onBlur(id, event.target.value))
                    }
                    onFocus={
                        typeof onFocus === 'function' && (event => onFocus(id, event.target.value))
                    }
                />
                {this.renderPicklist()}
            </BaseInputPicklistStyled>
        );
    }
}

BaseInputPicklist.propTypes = {
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    formContext: PropTypes.object,
    id: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.object,
    readonly: PropTypes.bool,
    registry: PropTypes.object,
    required: PropTypes.bool,
    schema: PropTypes.object,
    value: PropTypes.any,
};

BaseInputPicklist.defaultProps = {
    autofocus: false,
    disabled: false,
    formContext: null,
    onBlur: false,
    onChange: false,
    onFocus: false,
    options: null,
    readonly: false,
    registry: null,
    required: false,
    schema: null,
    value: null,
};

export default BaseInputPicklist;
