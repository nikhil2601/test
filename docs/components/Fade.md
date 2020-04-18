[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > Fade

--------------------------------------------------------------------------------

# Fade

**src**: [Fade.js](/src/lib/Fade/Fade.js)

> Motion helps make a UI expressive and easy to use.

<cite>
  <a href="https://material.io/design/motion/#principles">-- Google Material Design</a>
</cite>

`Fade` in from a transparent element to an opaque one.

## Example

```jsx
import React, { Component } from 'react';
import { Container, Fade, Typography } from 'pep-comp';

class FadeAnimation extends Component {
    state = {
        faded: false
    };

    handleChange = () => this.setState(prevState => ({ faded: !prevState.faded }));

    render() {
        const { faded } = this.state;
        return (
            <Container>
                <Fade in={faded}>
                    <Typography type="display1">Some Content</Typography>
                </Fade>
            </Container>
        );
    }
}

export default FadeAnimation;
```

## Props

Any extra `props` supplied will be spread to the internal root `react-transition-group`'s [Transition element](https://reactcommunity.org/react-transition-group/transition).

```javascript
/**
 * A single element for the Transition to render.
 */
children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
/**
 * If `true`, the transition will kick in.
 */
in      : PropTypes.bool,
/**
 * Callback fired before the `entering` status is applied.
 *
 * @param {HTMLElement} node
 * @param {boolean}     isAppearing
 */
onEnter : PropTypes.func,
/**
 * Callback fired before the `exiting` status is applied.
 *
 * @param {HTMLElement} node
 */
onExit  : PropTypes.func,
/**
 * @ignore
 */
style   : PropTypes.object,
/**
 * The duration for the transition, in milliseconds.
 */
timeout : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })
])
```

## Default Props

```javascript
children: null,
in      : null,
onEnter : null,
onExit  : null,
style   : null,
timeout : {
    enter: DURATION.enter,
    exit : DURATION.exit
}
```
