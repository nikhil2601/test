import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _get from 'lodash/get';

import Col from 'lib/Col';
import Row from 'lib/Row';
import Input from 'lib/Input';
import Typography from 'lib/Typography';

import { callFunc, getHandler } from 'utils/actions';
import FormGroupTitle from './FormGroupTitle';

class LegislationLinkField extends Component {
    constructor(props) {
        super(props);

        const { formData } = this.props;

        this.state = {
            formData,
            errors: false,
        };
    }

    handleOnChange = evt => {
        const pattern = /^(?:http|https|ftp):\/\/[\w.]+(?:\.[\w]+)+[\w\-.,@?^=%&:;/~\\+#]+$/;
        const link = evt.target.value;

        if (link && !pattern.test(link)) {
            this.setState({
                errors: true,
            });
        } else {
            this.setState({
                formData: link,
                errors: false,
            });
        }
    };

    handleOnBlur = evt => {
        if (this.state.errors) {
            return false;
        }
        const { currentTarget } = evt;
        const { formContext } = this.props;
        const { handlers = {} } = formContext;
        const updatePublicLink = getHandler(handlers, 'updatePublicLink');
        const link = this.state.formData || null;

        setTimeout(function() {
            if (!currentTarget.contains(document.activeElement)) {
                callFunc(updatePublicLink, {
                    link,
                });
            }
        }, 0);
    };

    render() {
        const { formData, errors } = this.state;
        const { idSchema, required, schema } = this.props;
        const id = _get(idSchema, '$id', '');
        const title = _get(schema, 'title');
        const titleHelptext = _get(schema, 'helpText');
        const message = errors ? (
            <Typography color="error" gutterBottom="0" style={{ margin: '10px 5px' }}>
                Please enter a valid url.
            </Typography>
        ) : (
            ''
        );

        return (
            <Row width="auto">
                <Col size={12}>
                    <FormGroupTitle
                        helpText={titleHelptext}
                        id={id}
                        required={required && Boolean(!formData)}
                        title={title}
                    />
                </Col>
                <Col size={12} style={{ position: 'relative' }}>
                    <Input
                        defaultValue={formData}
                        id={id}
                        onChange={this.handleOnChange}
                        onBlur={this.handleOnBlur}
                        required={required}
                        tabIndex={-1}
                        type="text"
                    />
                    {message}
                </Col>
            </Row>
        );
    }
}

LegislationLinkField.propTypes = {
    formContext: PropTypes.object,
    formData: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
    idSchema: PropTypes.object,
    options: PropTypes.object,
    required: PropTypes.bool,
    schema: PropTypes.object,
    uiSchema: PropTypes.object,
};

LegislationLinkField.defaultProps = {
    formContext: null,
    formData: null,
    idSchema: null,
    options: null,
    required: null,
    schema: null,
    uiSchema: null,
};

export default LegislationLinkField;
