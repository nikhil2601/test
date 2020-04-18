[pep-comp](/) > [docs](/docs/README.md) > [helpers](/docs/helpers/README.md) > renderComponent

--------------------------------------------------------------------------------

# renderComponent

**src**: [renderComponent.js](/src/lib/renderComponent/renderComponent.js)

`renderComponent` renders a given `pep-comp` or React component into the provided selector.

This is a useful function if you would like to render a component in another framework, such as Backbone.js, Angular.js, Vue.js, etc., where adding a React.js component is not applicable.

## Example

```javascript
import { renderComponent, Button } from 'pep-comp';
// Grab the element where you would like to render the `Button` component.
const el = document.getElementById('someDiv');
// Render the `Button` component in the provided el.
renderComponent(Button, null, el);
```

Pass in `props` to the rendered component (the second argument):

```javascript
import { renderComponent, Button } from 'pep-comp';
// Grab the element where you would like to render the `Button` component.
const el = document.getElementById('someDiv');
// onClick handler.
const onClick = () => console.log('rendered button was clicked!');
// Render the `Button` component in the provided el.
renderComponent(
    Button,
    {
        active: true,
        color: 'secondary',
        onClick
    },
    el
);
```

`renderComponent` uses the [ReactDOM](https://reactjs.org/docs/react-dom.html) package internally. Please make sure you have it available in your project.
