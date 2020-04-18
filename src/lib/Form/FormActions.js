import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button from 'lib/Button';
import Typography from 'lib/Typography';
import { genID } from 'utils/generate';
import { getThemeProps } from 'utils/theme';

const FormActionsSingle = styled.div`
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('FormActionsSingle.styles')};
`;

const FormActionsTitle = styled.div`
    margin: 10px 0;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('FormActionsTitle.styles')};
`;

const FormActionsStyled = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 25px 0;
    ${FormActionsSingle} {
        margin-right: 10px;
        &:last-of-type {
            margin-right: 0;
        }
    }
    /**
     * Dynamic styles
     */
    ${({ hideActions }) => hideActions && { display: 'none' }}
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('FormActions.styles')};
`;

const renderDesc = desc => <Typography>{desc}</Typography>;

const renderDescTop = (desc, pos) => desc && pos === 'top' && renderDesc(desc);

const renderDescBottom = (desc, pos) => desc && pos === 'bottom' && renderDesc(desc);

function FormActions({ actions, disabled, hideActions, title }) {
    return disabled ? (
        <FormActionsStyled hideActions={hideActions} />
    ) : (
        <FormActionsStyled hideActions={hideActions}>
            {title && (
                <FormActionsTitle>
                    <Typography type="subheading">{title}</Typography>
                </FormActionsTitle>
            )}
            {actions.map(action => {
                const { description, descriptionPosition, ...rest } = action;

                return (
                    <FormActionsSingle key={genID()}>
                        {renderDescTop(description, descriptionPosition)}
                        <Button key={genID()} {...rest} />
                        {renderDescBottom(description, descriptionPosition)}
                    </FormActionsSingle>
                );
            })}
        </FormActionsStyled>
    );
}

FormActions.propTypes = {
    /**
     * A list of action buttons for the form
     */
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            children: PropTypes.node,
            color: PropTypes.string,
            description: PropTypes.node,
            descriptionPosition: PropTypes.oneOf(['top', 'bottom']),
            onClick: PropTypes.func,
            type: PropTypes.string,
        })
    ),
    /**
     * Disable the actions and display an empty `div`.
     */
    disabled: PropTypes.bool,
    /**
     * If the actions should be hidden but still function
     */
    hideActions: PropTypes.bool,
    /**
     * A title for the form actions group
     */
    title: PropTypes.string,
};

FormActions.defaultProps = {
    actions: [],
    disabled: null,
    hideActions: false,
    title: '',
};

export default FormActions;
