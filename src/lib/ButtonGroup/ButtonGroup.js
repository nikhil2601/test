import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import Button from 'lib/Button';
import FaIcon from 'lib/FaIcon';
import Row from 'lib/Row';
import { checkObjectKeys } from 'utils/object';
import { isReactComponent } from 'utils/component';
import { replaceHandlerRefs } from 'utils/actions';

// CSS for the ButtonGroup if the `toggle` prop is set to `true`.
const ToggleCss = css`
    border-radius: 0;
    &:nth-child(n):not(:last-child) {
        border-right: none;
    }
    &:first-child {
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
    }
    &:last-child {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
    }
`;
// Non-toggle CSS for ButtonGroup.
const NonToggleCss = css`
    margin-right: ${({ spacing }) => spacing || '7.5px'};
    &:last-child {
        margin-right: 0;
    }
`;
// The ButtonGroup Styled.
const ButtonGroupStyled = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    ${Button} {
        ${({ toggle }) => (toggle ? ToggleCss : NonToggleCss)}};
    }
`;

/**
 * Render a group of buttons. Turn them into toggleable buttons via the `toggle` prop.
 *
 * @method      ButtonGroup
 * @constructor
 */
function ButtonGroup({
    activeId,
    activeProps,
    buttons,
    className,
    handlers,
    inactiveProps,
    invokeWith,
    toggle,
    spacing,
}) {
    if (!buttons || buttons.length === 0) {
        return null;
    }
    // Update the handler refs in buttons, if present,
    // with the actual functions from the `handlers`.
    const buttonsWithHandlers = replaceHandlerRefs(buttons, handlers, 'onClick', invokeWith);
    /**
     * Build the button props based on the `activeId`
     *
     * @method      _getBtnProps
     * @param       {Object}      btn The props for the current button
     * @return      {Object}         The updated props for the button
     */
    function _getBtnProps(btn) {
        // Dynamically disable or enable the button (if needed).
        const disabled = checkObjectKeys(invokeWith, btn.disabled, handlers);
        // If we don't have `toggle` turned on, there is no need to go foward.
        if (!toggle) {
            return {
                ...btn,
                disabled,
            };
        }
        // Update the button props if the `toggle` is turned on.
        return activeId === btn.id
            ? {
                  ...btn,
                  disabled,
                  ...activeProps,
              }
            : {
                  ...btn,
                  disabled,
                  ...inactiveProps,
              };
    }
    // Render the Icon for the Button, if applicable.
    function renderIcon(BtnIcon, IconProps) {
        // Build the styles for the icon.
        const iconStyle = {
            marginRight: 5,
        };
        // If the Icon is a boolean and true,
        // then we want to render our FaIcon component.
        if (typeof BtnIcon === 'boolean' && BtnIcon) {
            return <FaIcon style={iconStyle} {...IconProps} />;
        } else if (isReactComponent(BtnIcon)) {
            // If the Icon is a valid React Component,
            // then render the Icon.
            return <BtnIcon style={iconStyle} {...IconProps} />;
        }
        // Don't render anything.
        return null;
    }

    // Return the `ButtonGroup`.
    return (
        <ButtonGroupStyled spacing={spacing} className={className} toggle={toggle}>
            {buttonsWithHandlers.map(
                (
                    {
                        IconProps,
                        buttonComponent: ButtonComponent,
                        icon: BtnIcon,
                        label,
                        rowProps,
                        ...btn
                    },
                    idx
                ) => {
                    // NOTE: This is a small array, and probably won't matter if we
                    // re-render the children for now, so usage of array idx in key
                    // should be fine.
                    if (ButtonComponent) {
                        return (
                            <ButtonComponent
                                // eslint-disable-next-line react/no-array-index-key
                                key={`${label}__${idx}`}
                                label={label}
                                {...btn}
                            />
                        );
                    }

                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <Button type="button" {..._getBtnProps(btn)} key={`${label}__${idx}`}>
                            <Row
                                as="span"
                                alignItems="center"
                                gutter={false}
                                justify="center"
                                wrap="nowrap"
                                {...rowProps}
                            >
                                {renderIcon(BtnIcon, IconProps)}
                                {label}
                            </Row>
                        </Button>
                    );
                }
            )}
        </ButtonGroupStyled>
    );
}

ButtonGroup.propTypes = {
    /**
     * The id of the active button, if the `toggle` prop is set to `true`.
     */
    activeId: PropTypes.string,
    /**
     * The props of the button in `active` state, if the `toggle` props is set to `true`.
     */
    activeProps: PropTypes.object,
    /**
     * The list of buttons to render.
     */
    buttons: PropTypes.array.isRequired,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The props of the button in `inactive` state, if the `toggle` props is set to `true`.
     */
    inactiveProps: PropTypes.object,
    /**
     * A map of action handlers for the buttons.
     */
    handlers: PropTypes.object,
    /**
     * Invoke each of the button onClick handlers with some data.
     */
    invokeWith: PropTypes.object,
    /**
     * Add a bit of margin between the rendered buttons.
     * NOTE: This only comes into play when the `toggle` prop is set to `false` (default).
     */
    spacing: PropTypes.string,
    /**
     * If set to `true`, turn the ButtonGroup into a ButtonToggle instead.
     */
    toggle: PropTypes.bool,
};

ButtonGroup.defaultProps = {
    activeId: null,
    activeProps: null,
    className: '',
    handlers: null,
    inactiveProps: null,
    invokeWith: null,
    spacing: null,
    toggle: false,
};

export default ButtonGroup;
