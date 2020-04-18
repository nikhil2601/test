import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from 'lib/Box';
import ButtonGroup from 'lib/ButtonGroup';

const ButtonGroupStyled = styled(ButtonGroup)`
    flex-flow: wrap;
`;

/**
 * Card Actions component used to add action buttons on the card
 *
 * @method          CardAction
 * @param           {Object}            props
 * @constructor
 */
function CardActions(props) {
    const { buttons, children, className, handlers, ...restProps } = props;

    function renderChildren() {
        if (!_isEmpty(buttons)) {
            return <ButtonGroupStyled buttons={buttons} handlers={handlers} />;
        }

        return children;
    }

    return (
        <Box borderWidth="0" padding="5px" margin="0" className={className} {...restProps}>
            {renderChildren()}
        </Box>
    );
}

CardActions.propTypes = {
    /**
     *  Array of action buttons.
     */
    buttons: PropTypes.array,
    /**
     *  Custom Action component.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * Map of button's onClick action handlers
     */
    handlers: PropTypes.object,
};

CardActions.defaultProps = {
    buttons: [],
    children: null,
    className: '',
    handlers: null,
};

export default CardActions;
