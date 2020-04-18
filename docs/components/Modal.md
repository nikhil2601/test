[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > Modal

--------------------------------------------------------------------------------

# Modal

**src**: [Modal.js](/src/lib/Modal/Modal.js)

`Modal` provides a solid foundation for rendering lightboxes, popups, dialogs, action items, popovers, or anything else. It simpley renders its `children` node in front of a [Backdrop](/docs/components/Backdrop.md) component.

The `Modal` offers a few helpful features over using just a `<Portal />` component and some styles:

- Manages dialog stacking when one-at-a-time just isn't enough.
- Creates a `[Backdrop](/docs/components/Backdrop.md)`, for disabling interaction below the modal.
- It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
- It disables scrolling of the page content while open.

This component shares various concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).

## Example

```jsx
import React, { Component } from 'react';
import styled from 'styled-components';

import { Button, Modal, Typography } from 'lib';

// Styled version of the Sample Modal
const SampleModalStyled = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
`;

/**
 * Generate a random value
 *
 * @method randomVal
 * @return {number}
 */
const randomVal = () => Math.round(Math.random() * 20) - 10;

/**
 * Build the random Modal's style
 *
 * @method getModalStyle
 * @return {Object}
 */
const getModalStyle = () => {
    const left = 50 + randomVal();
    const top = 50 + randomVal();

    return {
        background: 'white',
        left: `${left}%`,
        position: 'absolute',
        top: `${top}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
};

class SampleModal extends Component {
    state = {
        isOpen: false,
        modalStyle: getModalStyle()
    };

    handleModalOpen = () => this.setState(() => ({ isOpen: true }));

    handleModalClose = () => this.setState(() => ({ isOpen: false }));

    render() {
        const { isOpen, modalStyle } = this.state;

        return (
            <SampleModalStyled>
                <Button onClick={this.handleModalOpen}>Open MOdal</Button>
                <Typography>Click to get the full Modal experience!</Typography>
                <Modal open={isOpen} onClose={this.handleModalClose} style={modalStyle}>
                    <div>
                        <Typography type="headline">Text inside a modal</Typography>
                        <Typography>Lorem ipsum dolor sit amet.</Typography>
                        <SampleModal />
                    </div>
                </Modal>
            </SampleModalStyled>
        );
    }
}

export default SampleModal;
```

## Props

```javascript
/**
 * Children for the Modal.
 */
children            : PropTypes.node,
/**
 * Should the Modal close on the Backdrop click?
 */
closeOnBackdropClick: PropTypes.bool,
/**
 * If `true`, the modal will close on `esc` keydown.
 */
closeOnEsc          : PropTypes.bool,
/**
 * The container to append the Modal to.
 */
container           : PropTypes.node,
/**
 * Callback fired upon the Backdrop click.
 */
onBackdropClick     : PropTypes.func,
/**
 * Callback fired when the component requests to be closed.
 */
onClose             : PropTypes.func,
/**
 * Callback fired when the Modal enters the DOM.
 */
onEntered           : PropTypes.func,
/**
 * Callback fired upon the `esc` keydown event.
 */
onEscKeyDown        : PropTypes.func,
/**
 * Callback fired when the Modal exits the DOM.
 */
onExited            : PropTypes.func,
/**
 * If `true`, the modal is open.
 */
open                : PropTypes.bool,
/**
 * @ignore
 */
style               : PropTypes.object,
/**
 * The duration for the transition, in milliseconds.
 */
timeout             : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })
])
```

## Default Props

```javascript
children            : null,
closeOnBackdropClick: true,
closeOnEsc          : true,
container           : null,
onBackdropClick     : null,
onClose             : null,
onEntered           : null,
onEscKeyDown        : null,
onExited            : null,
open                : false,
style               : null,
timeout             : DURATION.regular
```
