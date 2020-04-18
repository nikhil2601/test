[pep-comp](/) > [docs](/docs/README.md) > [helpers](/docs/helpers/README.md) > bindToAngular

--------------------------------------------------------------------------------

# bindToAngular

**src**: [bindToAngular.js](/src/lib/bindings/bindToAngular.js)

`bindToAngular` binds a given `pep-comp` component to AngularJS **v1.x**.

**A no-fuss, no-config required binding. It just works!**

## Example

Define the `angular` module with `pep-comp` components:

```javascript
import { bindToAngular, Button, Modal } from 'pep-comp';

const module = angular
    .module('raven.js', [])
    .component('ravenModal', bindToAngular(Modal)
    .component('ravenButton', bindToAngular(Button));
```

Use the newly created `angularjs-raven` components in HTML like regular HTML elements:

```html
<div>
    ...
    <raven-button on-click="$ctrl.handleClick" color="dark">Raven Button</raven-button>
    ...
</div>
```

## Advanced

### Extra `react-props or ng-bindings`

If you would like to provide extra `props` to the `pep-comp` component, not already defined in the component's `propTypes`, then you can pass in a list of `bindings` as the second argument to `bindToAngular` function.

#### Example

As a user I want to add a `moveIt` and `doNotAnimate` prop to a `pep-comp` Button component. (for some odd reason)

```javascript
import { bindToAngular, Button } from 'pep-comp';

const module = angular
    .module('raven.js', [])
    .component('ravenButton', bindToAngular(Button, ['moveIt', 'doNotAnimate']));
```

Now in my HTML, I can add in those properties:

```html
<div>
    ...
    <raven-button move-it="left" do-not-animate>Raven Button</raven-button>
    ...
</div>
```

### AngularJS Dependency Injections

`bindToAngular` makes it easy to pass in Angular services, constants, providers, and more to a `pep-comp` React component.

```javascript
import { bindToAngular, CustomComponent } from 'pep-comp';

import customFormatter from './customFormatter';

const module = angular
    .module('raven.js', [])
    .constant('someConstant', 'SOME_VALUE')
    .component(
        'ravenCustomComponent',
        bindToAngular(CustomComponent, null, ['$http', 'customFormatter', 'someConstant'])
    );
```

Now inside the `CustomComponent.js`, I can access the injected values as the component's props:

```javascript
import React, { Component } from 'react';

class CustomComponent extends Component {
    static propTypes = {
        $http: PropTypes.func,
        customFormatter: PropTypes.func,
        someConstant: PropTypes.string
    };

    state = {
        err: null,
        data: []
    };

    componentDidMount() {
        const { $http, customFormatter, someConstant } = this.props;
        // Make the AJAX call with Angular's native $http client
        $http
            .get('/some/url')
            .then(resp => {
                if (!resp) {
                    return;
                }
                // Normalize the data via the injected angular factory
                const normalizedData = customFormatter(resp, someConstant);
                // Update state with the new data
                this.setState(() => ({ data: normalizedData }));
            })
            .catch(err => this.setState(() => ({ err })));
    }

    render() {
        const { err, data } = this.state;

        if (err) {
            return <div>Sorry but there was an error fetching the data.</div>;
        }

        return (
            <div>
                {data.map(item => (
                    <p key={item}>{item}</p>
                ))}
            </div>
        );
    }
}
```
