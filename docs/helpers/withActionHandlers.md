[pep-comp](/) > [docs](/docs/README.md) > [helpers](/docs/helpers/README.md) > withActionHandlers

--------------------------------------------------------------------------------

# withActionHandlers

**src**: [withActionHandlers.js](/src/lib/withActionHandlers/withActionHandlers.js)

`withActionHandlers` is a HOC (Higher Order Component) that wraps a given React Component, injecting global synthetic events with the corresponding action handlers to the Wrapped Component.

This comes in handy when adding dynamic events to an HTML element, or React Component.

A list of available synthetic events: [Events on MDN](https://developer.mozilla.org/en-US/docs/Web/Events)

## Example

```jsx
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { withActionHandlers, Button } from 'pep-comp';
// Build the list of actions
const actionsList = [
    {
        // upon double-clicking this element,
        // fire the 'handleDoubleClick' event, if present.
        mouseevent: 'dblclick',
        handlerRef: 'handleDoubleClick'
    },
    {
        // upon mouse-over on this element,
        // fire the 'logValue' event, if present.
        mouseevent: 'mouseover',
        handlerRef: 'logValue'
    }
];
// Build the handlers map
const handlersMap = {
    handleDoubleClick(props) {
        const { title } = props;
        const title = title || 'Title!';

        return alert(title);
    },
    logValue(props, ref, action) {
        console.log('logValue : props :', props);
        console.log('logValue : ref :', ref);
        console.log('logValue : action :', action);
    }
};
// Build some data
const someData = {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
};
// Build the component
const SuperButton = ({ actions, handlers }) => (
    <Fragment>
        {/* Upon clicking on this button, an alert will be thrown with
            the text 'quis ut nam facilis et officia qui' */}
        <Button actions={[...actions[0]]} handlers={handlers} color="secondary">
            Double click me!
        </Button>
        {/* Upon hover, all of the params of the action handler func
            will be logged to the console */}
        <Button actions={[...actions[1]]} handlers={handlers} color="dark">
            Hover over me!
        </Button>
    </Fragment>
);

SuperButton.propTypes = {
    actions: PropTypes.array,
    data: PropTypes.object,
    handlerRef: PropTypes.object
};

SuperButton.defaultProps = {
    actions: actionsList,
    data: someData,
    handlers: handlersList
};

export default withActionHandlers(SuperButton);
```

## Advanced Example

Coming soon...
