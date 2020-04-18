import PropTypes from 'prop-types';
import React from 'react';

import Typography from 'lib/Typography';

/**
 * A simple anchor link component.
 * NOTE: Uses `Typography` component underneath.
 *
 * @constructor
 */
const Link = React.forwardRef((props, ref) => {
    return <Typography gutterBottom="0" {...props} ref={ref} />;
});

Link.propTypes = {
    /**
     * The content of the link.
     */
    children: PropTypes.node.isRequired,
    /**
     * Set theme styled colors and styling to the underneath `Typography` component.
     */
    type: PropTypes.string,
};

Link.defaultProps = {
    type: 'link',
};

Link.displayName = 'Link';

export default Link;
