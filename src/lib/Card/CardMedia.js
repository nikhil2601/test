import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from 'lib/Box';

const ImageWrapperStyled = styled.div`
    position: relative;
    left: 2px;
    width: 64px;
    height: 68px;
    overflow: hidden;
`;

/**
 * Renders media to card.
 *
 * @method          CardMedia
 * @param           {Object}        props
 * @constructor
 */
function CardMedia(props) {
    const { alt, children, src, imageStyle, ...rest } = props;

    return (
        <Box padding="2px" borderWidth="0" {...rest}>
            <ImageWrapperStyled>
                <img style={imageStyle} src={src} alt={alt} />
            </ImageWrapperStyled>
        </Box>
    );
}

CardMedia.propTypes = {
    /**
     *  Alternate text.
     */
    alt: PropTypes.string.isRequired,
    /**
     *  Custom media.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * Custom styling for <img/> element
     */
    imageStyle: PropTypes.object,
    /**
     *  Image source for <img/> element.
     */
    src: PropTypes.string.isRequired,
};

CardMedia.defaultProps = {
    children: null,
    className: '',
    imageStyle: {},
};

export default CardMedia;
