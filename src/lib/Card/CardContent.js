import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const CardContentStyled = styled.div`
    padding: 5px;
`;

/**
 * Wrapper to render contents for card component.
 *
 * @method          CardContent
 * @param           {Object}        props
 * @constructor
 */
function CardContent(props) {
    const { children, ...rest } = props;

    return <CardContentStyled {...rest}>{children}</CardContentStyled>;
}

CardContent.propTypes = {
    /**
     *  Content for the card.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
};

CardContent.defaultProps = {
    children: null,
    className: '',
};

export default CardContent;
