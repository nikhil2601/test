import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import Collapse from 'lib/Collapse';

import AccordionHeader from 'lib/AccordionHeader';
import AccordionContent from 'lib/AccordionContent';
import { callFunc } from 'utils/actions';

import AccordionStyled from './AccordionStyled';

/**
 * A Collapsible Panel with Header and Content Components.
 *
 * @method      Accordion
 * @param       {Object}  props Component props
 * @constructor
 */
const Accordion = forwardRef((props, ref) => {
    const {
        CollapseProps,
        ContentProps,
        HeaderProps,
        children,
        contentComponent: Content,
        defaultExpanded,
        description,
        disabled,
        expanded: expandedProps,
        headerComponent: Header,
        onChange,
        ...rest
    } = props;
    // Determine if we're dealing with a controlled Accordion.
    const isControlled = expandedProps != null;
    // Determine the initial expanded state based on `defaultExpanded` being present or not.
    const initialExpandedState = defaultExpanded != null ? defaultExpanded : false;
    // `use`Hooks
    // Build the `expanded` state for the Accordion.
    const [expandedState, setExpandedState] = useState(initialExpandedState);
    // We will pass an onChange handler to the `Header` Component.
    function handleOnChange(event) {
        // if disabled, don't process the click event
        if (disabled) {
            return;
        }
        // Determine if we're dealing with a controlled Accordion.
        const expandedOnChange = isControlled ? expandedProps : expandedState;
        // If we're not controlled, then set the local state instead.
        if (!isControlled) {
            setExpandedState(!expandedOnChange);
        }
        // Either way, fire off the `onChange` from props.
        callFunc(onChange, event, !expandedOnChange);
    }
    // Is the Accordion expanded?
    let isExpanded = isControlled ? expandedProps : expandedState;
    // if disabled is true, it overrides `isExpanded`
    if (disabled) {
        isExpanded = false;
    }
    // Render the Accordion and it's children.
    return (
        <AccordionStyled
            elevation={5}
            expanded={isExpanded}
            margin="0"
            overflow={isExpanded ? 'visible' : 'hidden'}
            padding="0"
            {...rest}
            ref={ref}
        >
            <Header
                {...HeaderProps}
                disabled={disabled}
                expanded={isExpanded}
                onChange={handleOnChange}
            >
                {description}
            </Header>
            <Collapse {...CollapseProps} in={isExpanded}>
                <Content {...ContentProps} expanded={isExpanded}>
                    {children}
                </Content>
            </Collapse>
        </AccordionStyled>
    );
});

Accordion.propTypes = {
    /**
     * Properties passed down to the `Collapse` component.
     */
    CollapseProps: PropTypes.object,
    /**
     * Properties passed down to the `Content` component.
     */
    ContentProps: PropTypes.object,
    /**
     * Properties passed down to the `Header` component.
     */
    HeaderProps: PropTypes.object,
    /**
     * The content of the Accordion.
     */
    children: PropTypes.node,
    /**
     * The content component for the Accordion.
     */
    contentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /**
     * If `true`, the Accordion will be expanded by default.
     */
    defaultExpanded: PropTypes.bool,
    /**
     * The description of the Accordion, in other words the `header` content.
     */
    description: PropTypes.node,
    /**
     * If `true`, the Accordion will be rendered in a disabled state.
     */
    disabled: PropTypes.bool,
    /**
     * Either collapse or expand the Accordion.
     */
    expanded: PropTypes.bool,
    /**
     * The header component for the Accordion.
     */
    headerComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /**
     * Callback fired when the Accordion expands/collapses.
     */
    onChange: PropTypes.func,
    /**
     * Set to `true` if you're rendering a single Accordion component.
     */
    single: PropTypes.bool,
};

Accordion.defaultProps = {
    CollapseProps: null,
    ContentProps: null,
    HeaderProps: null,
    children: null,
    contentComponent: AccordionContent,
    defaultExpanded: null,
    description: null,
    disabled: null,
    expanded: null,
    headerComponent: AccordionHeader,
    onChange: null,
    single: null,
};

Accordion.displayName = 'Accordion';

export default Accordion;
