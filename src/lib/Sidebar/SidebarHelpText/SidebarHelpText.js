import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from 'pep-comp';

function SidebarHelpText(props) {
    const { helpText } = props;
    return helpText ? (
        <Typography color="sidebarHelpText" type="sidebarHelpText">
            {helpText}
        </Typography>
    ) : null;
}

SidebarHelpText.propTypes = {
    helpText: PropTypes.string,
};

SidebarHelpText.defaultProps = {
    helpText: null,
};

export default SidebarHelpText;
