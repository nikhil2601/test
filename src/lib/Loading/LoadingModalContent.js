import PropTypes from 'prop-types';
import React from 'react';

import Box from 'lib/Box';

function LoadingModalContent(props) {
    const { style, ...rest } = props;
    // Build some styles for the `Box` Component.
    const boxStyles = {
        minWidth: '230px',
        maxWidth: '500px',
        ...style,
    };
    // Build the Loading Modal Content.
    return (
        <Box
            elevation={5}
            margin="0 auto"
            padding="30px"
            style={boxStyles}
            width="auto"
            {...rest}
        />
    );
}

LoadingModalContent.propTypes = {
    style: PropTypes.object,
};

LoadingModalContent.defaultProps = {
    style: null,
};

export default LoadingModalContent;
