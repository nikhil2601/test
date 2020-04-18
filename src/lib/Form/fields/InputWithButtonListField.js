import PropTypes from 'prop-types';
import React from 'react';
import { callFunc, get, getHandler } from 'pep-comp';
import styled from 'styled-components';

import { Button, ButtonLink, Col, Divider, Input, Row } from 'lib';
import { genID } from 'utils/generate';
import { isEmpty } from 'utils/lodash';

const DividerStyled = styled(Divider)`
    margin: 20px -10px;
    width: calc(100% + 20px);
`;

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
        formData: PropTypes.array,
    };

    static defaultProps = {
        disabled: null,
        formData: [],
        readonly: null,
        required: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            disableButton: true,
        };

        this.inputRef = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.formData !== prevState.items) {
            return { items: nextProps.formData };
        } else {
            return null;
        }
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

    addToList = () => {
        const { items } = this.state;
        const inputValue = this.inputRef.current.value;
        if (!isEmpty(inputValue)) {
            if (items.indexOf(inputValue) === -1) {
                items.push(inputValue);
                this.inputRef.current.value = '';
                this.setState(() => ({ items }));
                const { onChange } = this.props;
                // Update FormData
                onChange(items);
            } else {
                const { formContext } = this.props;
                const handlers = get(formContext, 'handlers', {});
                const showWarningModal = getHandler(handlers, 'showWarningModal');
                callFunc(showWarningModal);
            }
        }
    };

    removeFromList = item => {
        if (!isEmpty(item)) {
            const { items } = this.state;
            const index = items.indexOf(item);

            if (index !== -1) {
                items.splice(index, 1);

                this.setState(() => ({ items }));
                const { onChange } = this.props;
                // Update FormData
                onChange(items);
            }
        }
    };

    onInputChange = () => {
        this.setState(() => ({
            disableButton: isEmpty(this.inputRef.current.value),
        }));
    };

    renderList = (items, required) => {
        return (
            <>
                <DividerStyled color="muted" />
                <>
                    {' '}
                    {items.map(item => (
                        <div key={genID()}>
                            <Row width="auto" style={{ paddingTop: '8px' }}>
                                <Col style={{ position: 'relative' }}>
                                    <Input required={required} type="text" value={item} disabled />
                                </Col>
                                <Col size="auto">
                                    <ButtonLink
                                        onClick={() => this.removeFromList(item)}
                                        color="secondary"
                                        style={{ padding: '7px 0', display: 'block' }}
                                    >
                                        X
                                    </ButtonLink>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </>
            </>
        );
    };

    render() {
        const { idSchema, name, registry, required, schema, uiSchema } = this.props;
        const { disableButton, items } = this.state;
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
                            required={false}
                            type="text"
                            ref={this.inputRef}
                            onChange={this.onInputChange}
                        />
                    </Col>
                    <Col size="auto">
                        <Button
                            disabled={disableButton}
                            onClick={this.addToList}
                            type="button"
                            {...btnProps}
                        >
                            {btnLabel}
                        </Button>
                    </Col>
                </Row>
                {!isEmpty(items) && this.renderList(items, required)}
            </>
        );
    }
}

export default InputWithButton;
