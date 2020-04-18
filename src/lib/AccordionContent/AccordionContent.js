import PropTypes from 'prop-types';
import React from 'react';

import AccordionContentStyled from './AccordionContentStyled';

/**
 * The content component for the Accordion.
 *
 * @method      AccordionContent
 * @param       {Object}        props Component props
 * @constructor
 */
function AccordionContent(props) {
    const { children, ...rest } = props;
    // Render the AccordionContent.
    return (
        <AccordionContentStyled
            borderRadius="0"
            borderWidth="0"
            margin="0"
            padding="12px 15px"
            {...rest}
        >
            {children}
        </AccordionContentStyled>
    );
}

AccordionContent.propTypes = {
    /**
     * The content of the AccordionContent.
     */
    children: PropTypes.node,
    /**
     * Either collapse or expand the Accordion.
     */
    expanded: PropTypes.bool,
};

AccordionContent.defaultProps = {
    children: null,
    expanded: null,
};

export default AccordionContent;
