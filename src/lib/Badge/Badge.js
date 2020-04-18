import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'lib/Box';
import Row from 'lib/Row';

const BadgeStyled = styled(Box)`
    min-width: 32px;
    text-align: center;
`;

const Badge = React.forwardRef((props, ref) => {
    const { children, ...rest } = props;

    return (
        <BadgeStyled
            borderRadius="15px"
            borderWidth="0"
            height="auto"
            margin="0"
            padding="2px 5px"
            {...rest}
            ref={ref}
        >
            <Row alignItems="center" justify="center" gutter={false}>
                {children}
            </Row>
        </BadgeStyled>
    );
});

Badge.propTypes = {
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * The width for the Badge.
     */
    width: PropTypes.string,
};

Badge.defaultProps = {
    children: null,
    width: 'auto',
};

Badge.displayName = 'Badge';

export default Badge;
