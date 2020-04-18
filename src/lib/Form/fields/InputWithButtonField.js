import PropTypes from 'prop-types';
import React from 'react';
import _set from 'lodash/set';

import { Button, Col, Input, Row } from 'lib';
import { callFunc, get, getHandler } from 'utils';

class InputWithButton extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        idSchema: PropTypes.object.isRequired,
        formContext: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        readonly: PropTypes.bool,
        registry: PropTypes.object.isRequired,
        required: PropTypes.bool,
        schema: PropTypes.object.isRequired,
        uiSchema: PropTypes.object.isRequired,
        formData: PropTypes.string,
    };

    static defaultProps = {
        disabled: null,
        readonly: null,
        required: null,
        formData: '',
    };

    constructor(props) {
        super(props);

        this.inputRef = React.createRef();

        // Bindings.
        this.handleOnClick = this.handleOnClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    /**
     * Get the `ui:options` for the current field.
     *
     * @method _getUiOptions
     * @private
     * @param  {Object}      schema The schema to extract the options from
     * @return {Object}             The extracted options
     */
    _getUiOptions = schema => get(schema, 'ui:options', {});

    onInputChange({ target: { value } }) {
        const {
            formContext,
            idSchema: { $id },
        } = this.props;
        const formData = { ...formContext.getFormData() };
        const path = $id.split('_').splice(1);

        _set(formData, path.join('.'), value);
        formContext.updateFormData({ formData });
    }

    async handleOnClick(event) {
        event.preventDefault();
        const { formContext } = this.props;
        const handlers = get(formContext, 'handlers', {});
        const actionInputButton = getHandler(handlers, 'actionInputButton');
        const inputValue = await callFunc(actionInputButton);
        const code = get(inputValue, 'code', '');
        // To Update input value.
        this.inputRef.current.value = code;
        // To update parent formData.
        const { onChange } = this.props;
        onChange(code);
    }

    render() {
        const {
            disabled: disabledProps,
            idSchema,
            formData,
            name,
            readonly,
            registry,
            required,
            schema,
            uiSchema,
        } = this.props;
        // Determine if the field is disabled
        const disabled = readonly || disabledProps;
        // Extract couple of fields from the props.
        const options = this._getUiOptions(uiSchema);
        const title = get(schema, 'title') || name;
        const TitleField = get(registry, 'fields.FormGroupTitleField');
        const { $id: id } = idSchema;
        const { btnProps = {}, btnLabel = '' } = options;
        // Render the `FileField` component.
        return (
            <>
                <Row width="auto">
                    <Col size={12}>
                        <TitleField id={id} title={title} required={required} />
                    </Col>
                    <Col style={{ position: 'relative' }}>
                        <Input
                            required={required}
                            type="text"
                            ref={this.inputRef}
                            onChange={this.onInputChange}
                            defaultValue={formData}
                        />
                    </Col>
                    <Col size="auto">
                        <Button
                            disabled={disabled}
                            onClick={this.handleOnClick}
                            type="button"
                            {...btnProps}
                        >
                            {btnLabel}
                        </Button>
                    </Col>
                </Row>
            </>
        );
    }
}

export default InputWithButton;
