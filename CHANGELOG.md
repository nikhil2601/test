# Changelog

## 1.0

### **_November 11, 2018_**

- Split the pre-built 'super' components (composed of individual library components) from the current `pep-comp` library components.
- Upgrade to `styled-components` v4! (big update includes using the `React.forwardRef` API instead of `innerRef` prop)
- Update `CHANGELOG` with latest updates and fixes.

### **_November 9, 2018_**

- Add in `<ESignatureDetails />` component for viewing individual handbook details.
- Add in `<ESignatureDocuments />` component for viewing current user's documents.
- Add in `<ESignatureManagement />` component for Admins.
- Add in a `<RadioWidget />` for the `Form` widget, as well as a `<Radio />` component to build HTML `radio buttons`.
- Add in a `<SendForEsigForm />` component to send a handbook out for eSignature.
- Add in a double-column `<Transfer />` component.
- Add in multiple components for `eSignature` Management.
- Add the `<Transfer />` component as part of the `Form` with a new field type `transfer`.
- Fix the `<Checkbox />` component to use the new `<FaIcon />`.
- Fix the `<FaIcon />` component to accept more props, `height`, `margin`, `padding`, and more.
- Fix the `<Form />` component to accept a list of action `handlers` and pass them down to the `formContext`.
- Fix the `<Switch />` component to better control the current `checked` state, and build better dynamic `icon` components.
- Fix the current tests, make `mocha` compatible with `babel 7`.
- Move the `<SearchInput />` to its own component folder, out of the `Input`s.

### **_November 7, 2018_**

- Add in an `eSignatureStats` component, to display the `inProgress`, `completed`, `expired`, and more statistics. (dynamic component)
- Add in an `iFrame` component.

### **_November 4, 2018_**

- Add in `toolbar` support to the `<DataView />` component.
- Add in a `<Toolbar />` component.
- Added `[name].module.scss` and `[name].module.css` to support CSS modules without the previous hack for including in list of exclusions in the Webpack config. This way if you want to make a CSS / SASS module available in the application, just rename the styles file to `[name].module.[ext]`. The supported extensions for css modules are `.SCSS .SASS .CSS`.
- Added a `PROXY` config to the new Express server for running an API-backend on the same URL that runs the application.
- Upgrade to `webpack 4` for faster and more optimized build / dev times and package sizes. Including the addition of auto chunks, this way we create smaller bundle sizes and move the vendors code to a separate file. (this is only for the `pep-comp-demo` side of the application, library still gets compiled with `babel`)

### **_November 1, 2018_**

- Add in the `selectedColor` and `selectedOpacity` to the `<TableRow />` to control the color output.
- Update the `selected` prop on `<TableRow />` component. It now accepts 3 different types of values:
- `boolean`, if a given boolean value, the table row will be marked as selected.
- `string`, check the string value in the map of action handlers, passed down to the table row, and execute the function with the current `row` data.
- `object`, check for all keys of the object to exist in the `row` data then match their values with those in the `row` data.

### **_October 31, 2018_**

- Add in a table cell type `actionsMenu`.
- Fixed the button width for the ActionsMenu Button.
- Update `PopoverContent` with correct arrow styles.

### **_October 26, 2018_**

- Add in a `--verbose` flag when running `babel` in watcher mode, to see which file(s) changed.
- Externalize `ngcomponent` and add a dependency on `fontawesome` and `styled-components`.
- Fix some project dependencies, and move some devDependencies to the dependencies section.
- Update the build tasks to align with a library style

### **_October 24, 2018_**

### Actions Menu

- Add in a `<List />` and a `<ListItem />` component.
- Add in a `font-awesome` Icon component, `<FaIcon />` to add dynamic icons in the application.
- Add in a `muted` color palette.
- Add in an `<ActionsMenu />` component.
- Add in an `active` state to the `<Button />` component.
- Add in tooltips to the actions menu.
- Make the `default` color of the `<Divider />` component to be `muted`.

### **_October 19, 2018_**

### Data View

- Add in three new components to standardize the previously built `list` view, and support a new `tile` view.
- `<DataTable />`, builds a simple HTML table, and adds on column sorting if needed.
- `<DataGrid />`, builds a simple HTML grid, with the given `TileComponent` props.
- `<DataView />`, combines the `DataTable` and `DataGrid` to render either one or the other, together with pagination, search, sorting, filtering, and more.

### **_October 12, 2018_**

### Box

- Add a `shadows` theme property, to add `box-shadows` to components.
- Add in a new `themeGet` function, which will eventually replace `getThemeProps` to extract props from the current `props.theme`.
- Fix the `<FormGroup />` styling to remove the excess bottom margin of `25px`.
- Fix the `<ObjectField />` properties to add bottom margin to the very last column.
- Update the `<Box />` component with new properties: `backgroundColor`, `borderColor`, `borderRadius` `borderWidth`, `boxShadow`, `elevation`, and more. Read more about it in the `Box` component's documentation.

### **_October 10, 2018_**

#### List View

- Add a `cellTypes` prop to accept a map of different types of table-cells. These `cellTypes` can be updated from the passed in `schema.json` file in the `columns[n].cellProps.type` key.

i.e. Add in a `cellTypes` prop when rendering a `<ListView />` component, then reference the `cellType` in the schema for the `column`. (see example below for `columns[n].cellProps.type = searchLink`)

```diff
    <ListView
        baseUrl={BASE_URL}
+        cellTypes={{
+            actionCell: ActionCell,
+            searchLink: SearchLinkCell
+        }}
        handlers={{
            searchGoogle: this.handleSearchingGoogle
        }}
        oAuthToken={accessToken}
        onLoad={this.handleListOnLoad}
        schema={schema}
    />
```

Sample `SearchLinkCell` Component:

```jsx
function SearchLinkCell(props) {
    // Properties for the `SearchLinkCell` cell type.
    const {
        /**
         * Simplified version of the `tableContext`
         *
         * @type {Object}
         */
        cellContext,
        /**
         * Simplied version of the passed in `cellProps` from the schema.json file.
         *
         * @type {Object}
         */
        cellProps,
        /**
         * The children for this cell, usually the value from the main data.
         *
         * @type {Node}
         */
        children,
        /**
         * THe information about the current column schema.
         * Does not include `columns[n].actions` or `columns[n].cellProps` property.
         *
         * @type {Object}
         */
        col,
        /**
         * Should the table cell be disabled?
         *
         * @type {boolean}
         */
        disabled,
        /**
         * The current order, either `asc` or `desc`.
         *
         * @type {string}
         */
        order,
        /**
         * The current orderBy property (a key name of the passed in data object).
         *
         * @type {string}
         */
        orderBy,
        /**
         * The orientation object from the schema (if applicable).
         *
         * @type {Object}
         */
        orientation,
        /**
         * The data that is being rendered on the current row.
         *
         * @type {Object}
         */
        row,
        /**
         * List of available tooltips (if applicable).
         *
         * @type {Array}
         */
        tooltipsList
    } = props;
    // The `cellContext`
    const {
        baseUrl,
        cellTypes,
        handlers,
        helpText,
        oAuthToken,
        schema
    } = cellContext;

    return <div>{children}</div>;
}
```

- Replace the `variant` prop with `cellProps` prop for the `<Table />` and its internal components, (these components include `<TableBody />`, `<TableCell />`).

i.e. `some-list-view-schema-config.json` file:

```diff
{
    "columns": [
        {
            "actions": [
                {
                    "handlerRef": "searchGoogle",
                    "mouseevent": "click",
                    "searchKey": "companyName"
                }
            ],
-            "variant": {
-                "type": "searchLink"
-            },
+            "cellProps": {
+                "type": "searchLink"
+            },
            "id": "companyName",
            "title": "Company Name"
        },
        /* ...rest of the columns definition */
    ],
    /* ...rest of the schema definition */
}
```

#### Typography

- Replace the `variant` prop with `type` prop for a better naming convention.

```diff
-<Typography variant="heading">My Heading</Typography>
+<Typography type="heading">My Heading</Typography>
```

#### Various other Components

- Replace the `variant` prop, used for picking colors from the `theme.palette`, to just a `color` prop for a better naming convention.

i.e.

```diff
-<Button variant="primary">Click me!</Button>
+<Button color="primary">Click me!</Button>
```

```diff
-<Divider variant="light" />
+<Divider color="light" />
```

#### Documentation

- Update the static documentation based on the updates described above.
