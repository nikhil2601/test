import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { callFunc } from 'pep-comp';

import Button from 'lib/Button';
import Col from 'lib/Col';
import FaIcon from 'lib/FaIcon';
import Input from 'lib/Input';
import Row from 'lib/Row';

class FileUploadField extends React.Component {
    static propTypes = {
        /**
         * If `true`, the field is disabled.
         */
        disabled: PropTypes.bool,
        /**
         * The schema object for identifying the field.
         */
        idSchema: PropTypes.object.isRequired,
        /**
         * The name for the field.
         */
        name: PropTypes.string.isRequired,
        /**
         * Callback fired on the change event of the input element.
         */
        onChange: PropTypes.func.isRequired,
        /**
         * If `true`, the field will be readonly.
         */
        readonly: PropTypes.bool,
        /**
         * The form's registry object, containing the registered custom fields and widgets.
         */
        registry: PropTypes.object.isRequired,
        /**
         * Is this a required field?
         */
        required: PropTypes.bool,
        /**
         * The JSON Schema for this field.
         */
        schema: PropTypes.object.isRequired,
        /**
         * The JSON uiSchema for this field.
         */
        uiSchema: PropTypes.object.isRequired,
        /**
         * The value for this field.
         */
        value: PropTypes.object,
    };

    static defaultProps = {
        disabled: null,
        readonly: null,
        required: null,
        value: null,
    };

    // Create a reference to the hidden `input` DOM element.
    hiddenFileInputRef = React.createRef();

    constructor(props) {
        super(props);
        // TODO: Switch to use `useSate` hook later on...
        this.state = {
            // Create an empty files list.
            filesList: [],
        };
    }

    /**
     * Get the `ui:options` for the current field.
     *
     * @method _getUiOptions
     * @private
     * @param  {Object}      schema The schema to extract the options from
     * @return {Object}             The extracted options
     */
    _getUiOptions = schema => _get(schema, 'ui:options', {});

    /**
     * The label for the rendered `Input` component.
     *
     * @method getInputLabel
     * @return {string}
     */
    getInputLabel = () => {
        const { uiSchema, value } = this.props;
        const { filesList } = this.state;
        // Determine the value based on current formData or internal filesList.
        const files = value || filesList;
        // Get the uiOptions
        const options = this._getUiOptions(uiSchema);
        const { chooseFileLabel = 'Select a file...' } = options;
        const count = (files && files.length) || 0;
        // Based on the `count` value, update the label.
        if (!count) {
            return chooseFileLabel;
        } else if (count > 1) {
            return `${count} files selected.`;
        }
        return _get(files, '[0].name', '1 file selected.');
    };

    /**
     * Styles for the hidden `input` element
     *
     * @method getHiddenInputStyle
     * @return {Object}
     */
    getHiddenInputStyle = () => ({
        height: 38,
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: -1,
    });

    handleOnUploadClick = event => {
        event.preventDefault();
        const { current } = this.hiddenFileInputRef;
        // Invoke the input click() event.
        current && typeof current.click === 'function' && current.click();
    };

    handleOnInputChange = event => {
        // Extract the `onChange` handler from props.
        const { onChange } = this.props;
        const setParentState = _get(this.props, 'formContext.handlers.setParentState');
        // Extract the files out of the file input.
        const { current } = this.hiddenFileInputRef;
        const files = (current && current.files) || {};
        // Update the current files list.
        this.setState(
            () => ({
                filesList: files,
            }),
            () => {
                // Invoke the `onChange` handler.
                typeof onChange === 'function' && onChange(files);
            }
        );
        // The use case for this is that if you need to know from the parent if a file has
        // been uploaded to the input field. That way from your parent you can do other checks.
        // For example, if you need a button disabled in your form, you can set the state
        // in order to know when the file has a value. See `CompaniesDeactivate.js` for an example.
        callFunc(setParentState, { selectedFile: current && current.files });
    };

    render() {
        const {
            disabled: disabledProps,
            idSchema,
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
        const title = _get(schema, 'title') || name;
        const TitleField = _get(registry, 'fields.FormGroupTitleField');
        const { $id: id } = idSchema;
        const {
            accept = '*',
            multiple = false,
            btnProps = {},
            btnLabel = 'Upload',
            showIcon = true,
        } = options;
        // Render the `FileField` component.
        return (
            <Row width="auto">
                <Col size={12}>
                    <TitleField id={id} title={title} required={required} />
                </Col>
                <Col style={{ position: 'relative' }}>
                    <Input
                        onChange={() => {}}
                        onClick={this.handleOnUploadClick}
                        required={required}
                        type="text"
                        value={this.getInputLabel()}
                    />
                    <input
                        accept={accept}
                        defaultValue=""
                        disabled={disabled}
                        multiple={multiple}
                        onChange={this.handleOnInputChange}
                        ref={this.hiddenFileInputRef}
                        required={required}
                        style={this.getHiddenInputStyle()}
                        tabIndex={-1}
                        type="file"
                    />
                </Col>
                <Col size="auto">
                    <Button
                        disabled={disabled}
                        onClick={this.handleOnUploadClick}
                        type="button"
                        {...btnProps}
                    >
                        {showIcon && <FaIcon icon={faUpload} margin="0 5px 0 0" />}
                        {btnLabel}
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default FileUploadField;
