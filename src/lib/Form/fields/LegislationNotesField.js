import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _get from 'lodash/get';

import Col from 'lib/Col';
import Row from 'lib/Row';
import TextArea from 'lib/TextArea';
import Typography from 'lib/Typography';

import { callFunc, getHandler } from 'utils/actions';
import FormGroupTitle from './FormGroupTitle';

class LegislationNotesField extends Component {
    constructor(props) {
        super(props);

        const { formData } = this.props;

        this.state = {
            errors: false,
            formData,
            typingTimeout: null,
        };
    }

    handleOnChange = evt => {
        const notes = evt.target.value;

        if (this.state.typingTimeout !== null) {
            clearTimeout(this.state.typingTimeout);
        }

        const typingTimeout = setTimeout(() => {
            this.setState(
                () => ({ formData: notes }),
                () => {
                    this.saveNotes(notes);
                }
            );
        }, 1000);

        this.setState({
            typingTimeout,
        });
    };

    handleOnBlur = evt => {
        const notes = this.state.formData;
        this.saveNotes(notes);
    };

    saveNotes = _notes => {
        const { formContext } = this.props;
        const { handlers = {} } = formContext;
        const updateNotes = getHandler(handlers, 'updateNotes');

        if (_notes.length <= 2000) {
            callFunc(updateNotes, {
                notes: _notes,
            });
            this.setState({
                errors: false,
            });
        } else {
            this.setState({
                errors: true,
            });
        }
    };

    render() {
        const { errors, formData } = this.state;
        const { idSchema, required, schema } = this.props;
        const id = _get(idSchema, '$id', '');
        const title = _get(schema, 'title');
        const titleHelptext = _get(schema, 'helpText');
        const notesStyles = {
            overflowY: 'scroll',
        };
        const message = errors ? (
            <Typography color="error" gutterBottom="0" style={{ margin: '10px 5px' }}>
                You have exceed 2000 characters limit.
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
                    <TextArea
                        defaultValue={formData}
                        onChange={this.handleOnChange}
                        onBlur={this.handleOnBlur}
                        placeholder="Type your note here"
                        rows={5}
                        style={notesStyles}
                    />
                    {message}
                </Col>
            </Row>
        );
    }
}

LegislationNotesField.propTypes = {
    formContext: PropTypes.object,
    formData: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
    idSchema: PropTypes.object,
    options: PropTypes.object,
    required: PropTypes.bool,
    schema: PropTypes.object,
    uiSchema: PropTypes.object,
};

LegislationNotesField.defaultProps = {
    formContext: null,
    formData: null,
    idSchema: null,
    options: null,
    required: null,
    schema: null,
    uiSchema: null,
};

export default LegislationNotesField;
