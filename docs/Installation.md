[pep-comp](/) > [docs](/docs) > installation

--------------------------------------------------------------------------------

# Installation

## NOTE

Please make sure you have the following versions of Node.js and NPM installed. (it's always good to be up-to-date with these two).

Node.js version `> 7.x` and NPM version `> 5.x` are required to run and build the library.

As of writing this documentation:

```bash
# Node.js version
$ node -v
v10.3.0
# NPM version
$ npm -v
6.1.0
```

## Install via `npm`

As the `pep-comp` package is not yet available on the npm registry, you would have to install it via git + ssh:

```bash
npm i -s git+ssh://git@github.com/Pepcus/pep-comp.git#reactjs
```

## Dependencies

`pep-comp` is dependent on the following libraries: (please make sure to include them via module imports or UMD definition)

- [Axios](https://github.com/axios/axios)
- [Popper.js](https://popper.js.org/popper-documentation.html) - used in background...
- [React JSON Schema Form](https://github.com/mozilla-services/react-jsonschema-form)
- [React.js](https://github.com/facebook/react)
- [ReactDOM](https://github.com/facebook/react)

## Import using ES6+ Modules

```jsx
import { Button, getThemeProps } from 'pep-comp';

const ActiveButton = ({ children, ...rest }) => (
    <Button {...rest} active>
        {children}
    </Button>
);
```

## Import using `require`

```javascript
const pepComp = require('pep-comp');
const btnSelector = document.getElementById('btn');

pepComp.renderComponent(pepComp.button, btnSelector, {
    active: true,
    color: 'secondary'
});
```

## Import using UMD definition

Add the following to the body of your html:

```javascript
// import in your bundler
'node_modules/pep-comp/umd/pep-comp.development.js'

// development
<script type="text/javascript" src="node_modules/pep-comp/umd/pep-comp.development.js"></script>

// production
<script type="text/javascript" src="node_modules/pep-comp/umd/pep-comp.production.min.js"></script>

// pep-comp will now be present on the global window object
var btnSelector = document.getElementById('btn');
window.pepComp.renderComponent(window.pepComp.button, btnSelector, { active: true });
```

## Local Development

Install the dependencies

```bash
npm i
```

Start the local dev server

```bash
npm start
```

## Build and Pack

You can build and pack in a single command thanks to NPM.

```bash
npm pack
```
