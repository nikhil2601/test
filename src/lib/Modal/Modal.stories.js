import React from 'react';
import { action, actions } from '@storybook/addon-actions';

import Modal from './Modal';

export default {
    title: 'Modal',
    component: Modal,
};

export const simple = () => (
    <Modal
        open
        closeOnBackdropClick
        closeOnEsc
        onBackdropClick={action('on-backdrop-click')}
        onClose={action('on-close-click')}
        onEntered={action('on-entered-modal')}
        onEscKeyDown={action('on-esckey-down')}
        onExited={action('on-exited')}
    >
        <h1>Simple Modal</h1>
    </Modal>
);
