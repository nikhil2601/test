import React from 'react';
import PropTypes from 'prop-types';

import { ButtonLink, Col, Row, Typography } from 'lib';
import { accessControl, getHandler } from 'utils';

function SidebarOption(props) {
    const { handlers, icon, onClick: onClickProps, text } = props;
    // Rebuild the onClick handler for the button.
    const onClick =
        typeof onClickProps === 'string' ? getHandler(handlers, onClickProps) : onClickProps;
    // Render the sidebar option.
    return (
        <ButtonLink
            color="secondary"
            onClick={onClick}
            style={{ padding: '3px 0', display: 'block' }}
        >
            <Typography type="caption">
                <Row padding="0" margin="0">
                    <Col size={{ md: 2 }}>{icon}</Col>
                    <Col size={{ md: 10 }}>
                        <Typography type="sidebarOption" color="sidebarOption">
                            {text}
                        </Typography>
                    </Col>
                </Row>
            </Typography>
        </ButtonLink>
    );
}

SidebarOption.propTypes = {
    handlers: PropTypes.objectOf(PropTypes.func),
    icon: PropTypes.node,
    onClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    text: PropTypes.string,
};

SidebarOption.defaultProps = {
    handlers: null,
    icon: null,
    onClick: null,
    text: '',
};

export default accessControl(SidebarOption);
