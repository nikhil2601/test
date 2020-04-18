import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'lib/Box';

const CardStyled = styled(Box)``;

/**
 * Card (wrapper) component to render the passed content as children.
 *
 * @method      Card
 * @param       {Object}        props Component props
 * @constructor
 */
function Card({ children, ...rest }) {
    return <CardStyled {...rest}>{children}</CardStyled>;
}

Card.propTypes = {
    /**
     * The children to render inside Card.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
};

Card.defaultProps = {
    children: null,
    className: '',
};

export default Card;
