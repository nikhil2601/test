import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';

import Button from 'lib/Button';
import { ChevronIcon, TrashIcon } from 'lib/SvgIcon';
import { getThemeProps } from 'utils/theme';

import FormGroupTitle from './FormGroupTitle';
import FormGroupContent from './FormGroupContent';

const ArrayFieldTemplateStyled = styled.div`
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('ArrayFieldTemplate.styles')};
`;

const ArrayFieldButtons = styled.div`
    padding: 10px 0;
`;

function ArrayFieldTemplate(props) {
    const { canAdd, disabled, formContext, idSchema, items, onAddClick, required, schema } = props;

    const schemaId = _get(idSchema, '$id');
    const uiSchemaTitle = _get(props, ['uiSchema', 'ui:title']);
    const propsTitle = _get(props, 'title');
    const titleId = `${schemaId}__title`;
    const formGroup = _get(schema, 'formGroup', false);

    const renderArrayFields = () => (
        <>
            {items.map(item => (
                <div key={item.index}>
                    <div>{item.children}</div>
                    <ArrayFieldButtons>
                        {item.hasMoveDown && (
                            <Button
                                noMinWidth
                                noPaddingY
                                disabled={disabled}
                                onClick={item.onReorderClick(item.index, item.index + 1)}
                                style={{ marginRight: '10px' }}
                                width="47px"
                            >
                                <ChevronIcon direction="down" style={{ width: 25, height: 25 }} />
                            </Button>
                        )}
                        {item.hasMoveUp && (
                            <Button
                                noMinWidth
                                noPaddingY
                                disabled={disabled}
                                onClick={item.onReorderClick(item.index, item.index - 1)}
                                style={{ marginRight: '10px' }}
                                width="47px"
                            >
                                <ChevronIcon direction="up" style={{ width: 25, height: 25 }} />
                            </Button>
                        )}
                        <Button
                            noMinWidth
                            noPaddingY
                            disabled={disabled}
                            onClick={item.onDropIndexClick(item.index)}
                            color="error"
                            width="47px"
                        >
                            <TrashIcon style={{ width: 25, height: 25 }} />
                        </Button>
                    </ArrayFieldButtons>
                </div>
            ))}

            {canAdd && (
                <div>
                    <Button disabled={disabled} onClick={onAddClick}>
                        Add Item
                    </Button>
                </div>
            )}
        </>
    );

    const renderContent = () =>
        formGroup ? (
            <FormGroupContent schema={schema}>{renderArrayFields()}</FormGroupContent>
        ) : (
            renderArrayFields()
        );

    const renderTitle = () => (
        <FormGroupTitle
            formContext={formContext}
            id={titleId}
            required={required}
            root={schemaId === 'root'}
            title={propsTitle || uiSchemaTitle}
        />
    );

    return (
        <ArrayFieldTemplateStyled>
            {renderTitle()}
            {renderContent()}
        </ArrayFieldTemplateStyled>
    );
}

ArrayFieldTemplate.propTypes = {
    canAdd: PropTypes.bool,
    disabled: PropTypes.bool,
    formContext: PropTypes.object,
    idSchema: PropTypes.object,
    items: PropTypes.array,
    onAddClick: PropTypes.func,
    required: PropTypes.bool,
    schema: PropTypes.object.isRequired,
};

ArrayFieldTemplate.defaultProps = {
    canAdd: false,
    disabled: false,
    formContext: null,
    idSchema: {},
    items: [],
    onAddClick: () => {},
    required: false,
};

export default ArrayFieldTemplate;
