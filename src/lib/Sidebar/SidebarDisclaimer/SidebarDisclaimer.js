import PropTypes from 'prop-types';
import React from 'react';
import { Box, Divider, Typography } from 'pep-comp';

import styled from 'styled-components';
import { sanitizeMarkup } from 'utils/sanitize';

// import { AlertCircleOutline } from 'components/Icons';

const SidebarDisclaimerStyled = styled.div``;

const DisclaimerHeader = styled.div`
    display: flex;
    align-items: center;
    padding-left: 15px;
`;

function SidebarDisclaimer({ disclaimer }) {
    return disclaimer ? (
        <SidebarDisclaimerStyled>
            <DisclaimerHeader>
                {/* <AlertCircleOutline /> */}
                <Typography type="disclaimer" gutterTop="2px" gutterBottom="0" gutterLeft="5px">
                    DISCLAIMER
                </Typography>
            </DisclaimerHeader>
            <Divider color="muted" gutterBottom="0" />
            <Box borderWidth="0" margin="0" padding="0 15px 20px">
                <Typography dangerouslySetInnerHTML={sanitizeMarkup(disclaimer)} />
            </Box>
        </SidebarDisclaimerStyled>
    ) : null;
}

SidebarDisclaimer.propTypes = {
    disclaimer: PropTypes.string,
};

SidebarDisclaimer.defaultProps = {
    disclaimer: '',
};

export default SidebarDisclaimer;
