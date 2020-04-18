[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > ButtonLink

--------------------------------------------------------------------------------

# ButtonLink

**src**: [ButtonLink.js](/src/lib/Button/ButtonLink.js)

`ButtonLink` Component renders a simple `<a />` to the DOM, styled as an anchor link.

It accepts all of the properties of an [HTML `a` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).

## Example

```jsx
import React from 'react';
import { ButtonLink } from 'pep-comp';

const Container = () => (
    <div>
        <ButtonLink onClick={() => window.open('google.com')}>Google Me!</ButtonLink>
    </div>
);
```

## Props

Any extra `props` supplied will be spread to the root `a` HTML native element.

```javascript
/**
 * The content of the button.
 */
children : PropTypes.node,
/**
 * @ignore
 */
className: PropTypes.string,
/**
 * Default onClick handler for the button
 */
onClick  : PropTypes.func
```

## Default Props

```javascript
children : null,
className: '',
onClick  : () => {}
```
