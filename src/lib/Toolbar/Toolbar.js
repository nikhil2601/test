import PropTypes from 'prop-types';
import React from 'react';

import Box from 'lib/Box';

function Toolbar(props) {
    // Define the default `Box` props for the Toolbar.
    const boxProps = {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: '0',
        borderWidth: '0',
        padding: '16px 0',
        ...props,
    };
    // Render the `Box` with the updated props.
    return <Box {...boxProps} />;
}

Toolbar.propTypes = {
    /**
     * The children to render inside the Toolbar.
     * Usually a couple of `Rows` with `Cols` and inner components.
     */
    children: PropTypes.node,
};

Toolbar.defaultProps = {
    children: null,
};

export default Toolbar;
