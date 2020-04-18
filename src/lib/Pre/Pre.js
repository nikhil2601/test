import React from 'react';

import PreStyled from './PreStyled';

/**
 * Styled <pre> tag component.
 *
 * @constructor
 */
const Pre = React.forwardRef((props, ref) => {
    return (
        <PreStyled
            borderRadius="0"
            borderWidth="0"
            display="block"
            margin="0"
            padding="10px"
            width="100%"
            {...props}
            as="pre"
            ref={ref}
        />
    );
});

// Update the `displayName` for this component.
Pre.displayName = 'Pre';

export default Pre;
