[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > Backdrop

--------------------------------------------------------------------------------

# Backdrop

**src**: [Backdrop.js](/src/lib/Backdrop/Backdrop.js)

`Backdrop` Component renders its children in an animated fashion with or without a background. It uses the internal [Fade](/docs/components/Fade.md) transition component as it's root element, to help animate during its mounting and unmounting phases.

It accepts all of the properties of a `react-transition-group`'s [Transition](https://reactcommunity.org/react-transition-group/transition) Component.

## Example

The following code is taken from the [Modal](/src/lib/Modal/Modal.js) Component's `render()` method.

```jsx
<Portal container={container}>
    <Backdrop
        appear
        in={open}
        onBackdropClick={this.handleBackdropClick}
        onEntered={this.handleEntered}
        onExited={this.handleExited}
        timeout={timeout}
    >
        <ModalStyled
            onMouseDown={this.handleModalEvent}
            onMouseUp={this.handleModalEvent}
            onClick={this.handleModalEvent}
        >
            {this.props.children}
        </ModalStyled>
    </Backdrop>
</Portal>
```

## Props

Any extra `props` supplied will be spread to the internal root [Fade](/docs/Fade.md) Component.

```javascript
/**
 * A Transition Component.
 */
TransitionComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
/**
 * The main content for the backdrop.
 */
children           : PropTypes.node,
/**
 * Apply themed styling to Backdrop.
 *
 * Colors can be defined in `theme.palette`.
 */
color              : PropTypes.string,
/**
 * Callback fired on backdrop click event.
 */
onBackdropClick    : PropTypes.func,
/**
 * The opacity of the background color.
 */
opacity            : PropTypes.number,
/**
 * If `true`, the Backdrop is open.
 */
open               : PropTypes.bool,
/**
 * Sets the 'position' css property.
 */
position           : PropTypes.oneOf(['absolute', 'fixed', 'relative']),
/**
 * The duration for the transition, in milliseconds.
 */
transitionDuration : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })
])
```

## Default Props

```javascript
TransitionComponent: Fade,
children           : null,
color              : 'dark',
onBackdropClick    : () => {},
opacity            : 0.5,
open               : false,
position           : 'fixed',
transitionDuration : 0
```
