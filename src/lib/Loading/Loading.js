import PropTypes from 'prop-types';
import React from 'react';

import FaIcon from 'lib/FaIcon';
import Modal from 'lib/Modal';
import Row from 'lib/Row';
import Typography from 'lib/Typography';

import LoadingIcon from './LoadingIcon';
import LoadingModalContent from './LoadingModalContent';

/**
 * A Loading component that gets attached to the `document.body`
 *
 * @method      Loading
 * @param       {Object} props
 * @constructor
 */
function Loading(props) {
    const {
        BackdropProps,
        animate,
        color,
        icon,
        loading,
        noIcon,
        noUpperCase,
        text,
        ...rest
    } = props;
    // Build the loading text.
    const loadingText = (text && (noUpperCase ? text : text.toUpperCase())) || 'loading';

    return (
        <Modal
            BackdropProps={{ color: 'loading', opacity: 0.8, ...BackdropProps }}
            ContentComponent={LoadingModalContent}
            open={loading}
            {...rest}
        >
            <Row alignItems="center" gutter={false} justify="flex-start" width="100%" wrap="nowrap">
                {!noIcon && (
                    <LoadingIcon animate={animate}>
                        <FaIcon color={color} icon="cog" height="25px" width="25px" {...icon} />
                    </LoadingIcon>
                )}
                <Typography
                    color={color}
                    gutterBottom="0"
                    gutterLeft={!noIcon && '10px'}
                    gutterTop="0"
                    type="title"
                >
                    {loadingText}
                </Typography>
            </Row>
        </Modal>
    );
}

Loading.propTypes = {
    /**
     * Additional props for the internally rendered `Backdrop` Component.
     */
    BackdropProps: PropTypes.object,
    /**
     * If `true`, the loading icon will animate (rotate 360 degrees).
     */
    animate: PropTypes.bool,
    /**
     * Set the color of the internal `Typography` and `FaIcon` Component.
     *
     * Color(s) can be set in `theme.palette`.
     */
    color: PropTypes.string,
    /**
     * Additional props for the internally rendered `FaIcon` Component.
     */
    icon: PropTypes.object,
    /**
     * If `true`, the loading modal will show.
     */
    loading: PropTypes.bool,
    /**
     * If `true`, the loading icon won't be rendered.
     */
    noIcon: PropTypes.bool,
    /**
     * If `true`, the loading text will not be upper cased.
     */
    noUpperCase: PropTypes.bool,
    /**
     * The loading text to display next to the loading icon.
     */
    text: PropTypes.string,
};

Loading.defaultProps = {
    BackdropProps: null,
    animate: true,
    color: '#0C518A',
    icon: null,
    loading: false,
    noIcon: false,
    noUpperCase: false,
    text: 'loading',
};

export default Loading;
