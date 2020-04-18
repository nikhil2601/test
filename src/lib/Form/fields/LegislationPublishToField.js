import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _get from 'lodash/get';

import Col from 'lib/Col';
import Container from 'lib/Container';
import Row from 'lib/Row';
import Typography from 'lib/Typography';

import { callFunc, getHandler } from 'utils/actions';
import FormGroupTitle from './FormGroupTitle';

class LegislationPublishToField extends Component {
    constructor(props) {
        super(props);

        const { formData, uiSchema } = this.props;
        const options = this._getUiOptions(uiSchema);
        const { completionEvents } = options;

        const _formatData = formData.map((events, idx) => {
            const newValue = events.is_completed ? Boolean(events.is_completed) : null;
            return {
                completion_event: events.completion_event,
                is_completed: newValue,
            };
        });

        const formattedEvents = {};
        completionEvents.forEach((events, idx) => {
            const completionEvent = events.completion_event.replace(/ /g, '').toLowerCase();
            const keyInFormData = formData.findIndex(
                completionEvent => completionEvent.completion_event === events.completion_event
            );
            const needed = !!(
                keyInFormData >= 0 &&
                (formData[keyInFormData].is_completed === null ||
                    Boolean(formData[keyInFormData].is_completed))
            );
            const updated =
                keyInFormData >= 0 ? Boolean(formData[keyInFormData].is_completed) : false;
            formattedEvents[completionEvent] = {};
            formattedEvents[completionEvent].needed = needed;
            formattedEvents[completionEvent].updated = updated;
        });

        this.state = {
            completionEvents: formattedEvents,
            formData: _formatData,
        };
    }

    buildComponent = completionEvents => {
        return completionEvents.map((item, itemIdx) => {
            const { completion_event } = item;
            const key = `${completion_event}___${itemIdx}`;
            const dataCompletion = this.state.completionEvents[
                completion_event.replace(/ /g, '').toLowerCase()
            ];
            const checkboxUpdated =
                Boolean(dataCompletion.needed) === true ? (
                    <input
                        type="checkbox"
                        data-option="updated"
                        data-completion-event={completion_event}
                        checked={dataCompletion.updated}
                        onChange={this.handleSelecting}
                    />
                ) : (
                    <input type="checkbox" checked={dataCompletion.updated} disabled />
                );
            // Render the item.
            return (
                <Row width="auto" alignItems="baseline" key={key} style={{ margin: 0 }}>
                    <Col size={4} style={{ padding: '6px 8px' }}>
                        <Typography type="label" gutterBottom="0" fullWidth>
                            <strong>{completion_event}</strong>
                        </Typography>
                    </Col>
                    <Col size={4} style={{ justifyContent: 'center', textAlign: 'center' }}>
                        <input
                            type="checkbox"
                            data-option="needed"
                            data-completion-event={completion_event}
                            checked={dataCompletion.needed}
                            onChange={this.handleSelecting}
                        />
                    </Col>
                    <Col size={4} style={{ justifyContent: 'center', textAlign: 'center' }}>
                        {checkboxUpdated}
                    </Col>
                </Row>
            );
        });
    };

    /**
     * Get the `ui:options` for the current field.
     *
     * @method _getUiOptions
     * @private
     * @param  {Object}      schema The schema to extract the options from
     * @return {Object}             The extracted options
     */
    _getUiOptions = schema => _get(schema, 'ui:options', {});

    handleSelecting = evt => {
        const option = evt.target.getAttribute('data-option');
        const completionEventReal = evt.target.getAttribute('data-completion-event');
        const completionEvent = completionEventReal.replace(/ /g, '').toLowerCase();
        const { checked } = evt.target;
        let isCompleted = null;
        this.setState(prevState => {
            const updatedState = { ...prevState };
            if (option === 'needed') {
                updatedState.completionEvents[completionEvent].needed = checked;
                isCompleted = false;
                if (!checked) {
                    updatedState.completionEvents[completionEvent].updated = checked;
                    isCompleted = null;
                }
            } else {
                updatedState.completionEvents[completionEvent].updated = checked;
                isCompleted = true;
                if (!checked) {
                    isCompleted = false;
                }
            }

            const updateCompletionEvent = {
                completion_event: completionEventReal,
                is_completed: isCompleted,
            };

            const keyInFormData = updatedState.formData.findIndex(
                completionEvent => completionEvent.completion_event === completionEventReal
            );

            if (keyInFormData >= 0) {
                if (isCompleted === null) {
                    updatedState.formData.splice(keyInFormData, 1);
                } else {
                    updatedState.formData[keyInFormData] = updateCompletionEvent;
                }
            } else {
                updatedState.formData.push(updateCompletionEvent);
            }

            return {
                completionEvents: updatedState.completionEvents,
                formData: updatedState.formData,
            };
        });
    };

    handleOnBlur = evt => {
        const { currentTarget } = evt;
        const { formContext } = this.props;
        const { handlers = {} } = formContext;
        const publishTo = getHandler(handlers, 'publishTo');
        const completionEvents = this.state.formData;

        setTimeout(function() {
            if (!currentTarget.contains(document.activeElement)) {
                callFunc(publishTo, {
                    completionEvents,
                });
            }
        }, 0);
    };

    render() {
        const { idSchema, required, schema, uiSchema } = this.props;
        const { formData } = this.state;
        const options = this._getUiOptions(uiSchema);
        const { completionEvents } = options;
        const id = _get(idSchema, '$id', '');
        const title = _get(schema, 'title');
        const titleHelptext = _get(schema, 'helpText');

        return (
            <Container width="100%">
                <Row alignItems="baseline" width="auto">
                    <Col size={6} style={{ padding: '0 15px' }}>
                        <Row alignItems="baseline" width="auto">
                            <Col size={4}>
                                <FormGroupTitle
                                    helpText={titleHelptext}
                                    id={id}
                                    required={required && Boolean(!formData)}
                                    title={title}
                                />
                            </Col>
                            <Col size={4} style={{ justifyContent: 'center', textAlign: 'center' }}>
                                <Typography type="label" gutterBottom="0" fullWidth>
                                    <strong>Needed</strong>
                                </Typography>
                            </Col>
                            <Col size={4} style={{ justifyContent: 'center', textAlign: 'center' }}>
                                <Typography type="label" gutterBottom="0" fullWidth>
                                    <strong>Updated</strong>
                                </Typography>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row width="auto" alignItems="baseline">
                    <Col size={6}>
                        <div
                            onBlur={this.handleOnBlur}
                            style={{ border: '1px solid #EDEDED', padding: '5px 0' }}
                        >
                            {this.buildComponent(completionEvents)}
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

LegislationPublishToField.propTypes = {
    formContext: PropTypes.object,
    formData: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
    idSchema: PropTypes.object,
    options: PropTypes.object,
    required: PropTypes.bool,
    schema: PropTypes.object,
    uiSchema: PropTypes.object,
};

LegislationPublishToField.defaultProps = {
    formContext: null,
    formData: null,
    idSchema: null,
    options: null,
    required: null,
    schema: null,
    uiSchema: null,
};

export default LegislationPublishToField;
