import PropTypes from 'prop-types';
import React from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

import Col from 'lib/Col';
import FaIcon from 'lib/FaIcon';
import Row from 'lib/Row';
import { THEME } from 'constants/theme';

import AccordionHeaderStyled from './AccordionHeaderStyled';

/**
 * The header component for the Accordion.
 *
 * @method      AccordionHeader
 * @param       {Object}        props Component props
 * @constructor
 */
function AccordionHeader(props) {
    const {
        children,
        disabled,
        expanded,
        icon: Icon,
        iconPosition,
        iconColor,
        onChange,
        ...rest
    } = props;

    // Build the styles for the `FaIcon`.
    const faIconStyles = {
        transition: THEME.transitions.create('transform'),
        transform: expanded ? 'rotate(90deg)' : null,
        color: iconColor,
    };

    // Render the AccordionHeader.
    return (
        <AccordionHeaderStyled
            borderRadius="0"
            disabled={disabled}
            margin="0"
            padding="12px 15px"
            {...rest}
            onClick={onChange}
        >
            <Row alignItems="center">
                {iconPosition === 'left' && (
                    <Col size="30px" padding="0 0 0 10px">
                        {Icon ? (
                            <Icon
                                expanded={expanded}
                                iconPosition={iconPosition}
                                faIconStyles={faIconStyles}
                            />
                        ) : (
                            <FaIcon
                                icon={faChevronRight}
                                height="16px"
                                width="16px"
                                style={faIconStyles}
                            />
                        )}
                    </Col>
                )}
                <Col>{children}</Col>
                {iconPosition === 'right' && (
                    <Col size="30px" padding="0 10px 0 0">
                        {Icon ? (
                            <Icon
                                expanded={expanded}
                                iconPosition={iconPosition}
                                faIconStyles={faIconStyles}
                            />
                        ) : (
                            <FaIcon
                                icon={faChevronRight}
                                height="16px"
                                width="16px"
                                style={faIconStyles}
                            />
                        )}
                    </Col>
                )}
            </Row>
        </AccordionHeaderStyled>
    );
}

AccordionHeader.propTypes = {
    /**
     * The content of the AccordionHeader.
     */
    children: PropTypes.node,
    /**
     * If enabled, prop hides the arrow and removes the cursor
     */
    disabled: PropTypes.bool,
    /**
     * Either collapse or expand the Accordion.
     */
    expanded: PropTypes.bool,
    /**
     * Should we render the icon on the left? right? or not at all?
     */
    iconPosition: PropTypes.oneOf(['right', 'left', 'none']),
    /**
     * What color should we render the icon
     */
    iconColor: PropTypes.string,
    /**
     * The Icon component for the Accordion from the rendering component.
     */
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /**
     * Callback fired when the Accordion expands/collapses.
     */
    onChange: PropTypes.func,
};

AccordionHeader.defaultProps = {
    children: null,
    disabled: false,
    expanded: null,
    iconPosition: 'left',
    iconColor: null,
    icon: null,
    onChange: null,
};

export default AccordionHeader;
