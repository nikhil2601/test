[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > DataView

--------------------------------------------------------------------------------

# DataView

**src**: [DataView.js](/src/lib/DataView/DataView.js)

`DataView` is a 'super component' that renders either a `DataGrid` or `DataList` internally. It can toggle between the two via button switch.

It requires an `actions` and a `schema` property to render itself. You can pass in a list of `data`, data objects, to control the data from the parent, or pass in a `schema.apis` key along with an `oAuthToken` to fetch data from the server.

## Schema

The `schema` is the crucial part of the `DataView` component, so let's break it down.

### `schema.apis`

The `schema.apis` defines the dynamic fetching of data, it takes in 3 keys:

- _dataKey_: key to extract the final data from the returned API response.
- _request_: an [`axios` request config](https://github.com/axios/axios#request-config) object.
- _totalKey_: key to extract the 'totalRows' from the returned API response.

Example `schema.apis` object:

```json
{
    "apis": {
        "dataKey": "users",
        "request": {
            "baseURL": "https://google.com",
            "method": "get",
            "url": "/test/users/list"
        },
        "totalKey": "records.total"
    }
}
```

### `schema.gridSchema`

The `schema.gridSchema` defines the config for the rendered `DataGrid` component.

- _grid_: properties passed down to the rendered [`GridList` component](https://github.com/Pepcus/pep-comp/blob/develop/src/lib/GridList/GridList.js).
- _item_: properties passed down to the rendered [`GridListItem` component](https://github.com/Pepcus/pep-comp/blob/develop/src/lib/GridListItem/GridListItem.js).
- _noData_: text to display when no data is available.
- _ItemComponent_: a `renderProp` which gets four (4) properties `schema`, `gridProps`, `item`, and `itemProps`, (detailed below).
- _NoDataComponent_: a `renderProp` which gets only one (1) property the `schema` object.

Example `schema.gridSchema` object:

```json
{
    "gridSchema": {
        "grid": {
            "cellHeight": 250,
            "cols": 5
        },
        "noData": "No Data Found...sorry",
        "ItemComponent": RefToSomeReactFunctionOrClass,
        "NoDataComponent": RefToSomeReactFunctionOrClass
    }
}
```

Since the `schema` will be in a `.json` file format, you can use the [`addSchemaValue` helper function](https://github.com/Pepcus/pep-comp/blob/develop/src/lib/utils/schema.js#L14) to add / update valules in the passed in schema. By default it'll mutate the schema, so you can do it multiple times.

```javascript
import React from 'react';
import { DataView, addSchemaValue } from 'pep-comp';

import ItemComponent from './ItemComponent';
import NoDataComponent from './NoDataComponent';
import SCHEMA from './schema.json';

function Component(props) {
    // Update schema values
    addSchemaValue(SCHEMA, 'gridProps.ItemComponent', ItemComponent);
    addSchemaValue(SCHEMA, 'gridProps.NoDataComponent', NoDataComponent);
    // Render the data view
    return (
        <Container>
            <DataView schema={SCHEMA} />
        </Container>
    )
}
```

### `schema.listSchema`

The `schema.listSchema` defines the config for the rendered `DataList` component.

- _cellTypes_: define a map of custom `cellTypes` to be rendered in the `DataList`. You can define a custom `cellType` when configuring the `listSchema.columns` property.
- _columns_: define the number of columns needed in the data list and their properties.
- _columns.actions.handlerRef_: reference to the function defined in passed in `actions`.
- _columns.actions.mouseevent_: the mouseevent to fire this function upon.
- _columns.cellProps_: custom properties for the table cell being rendered.
- _columns.cellProps.as_: the type of table cell to render, you can define different cell types in the _schema.cellTypes_ property.
- _columns.helpText_: define a tooltip to popup when the user hovers over the table cell. It accepts all properties of the [`Tooltip` component](https://github.com/Pepcus/pep-comp/blob/develop/src/lib/Tooltip/Tooltip.js).
- _columns.id_: the key to extract value from the data.
- _columns.size_: define the size for the column.
- _columns.title_: the title of the column.
- _noData_: text to display when no data is available.
- _rows_: define the config for the rendered table rows.
- _rows.zebraColor_: the color value from `theme.palette.${zebraColor}.color`.
- _rows.zebraOpacity_: the opacity of the color value for zebra striping.
- _rows.zebra_: should we zebra stripe the rows?
- _table_: define the props for the rendered `Table` component (at the moment it doesn't take any props).
- _table.boxProps_: add custom properties to the internal 'Box' component rendered inside the table.

Example `schema.listSchema` object:

```json
{
    "listSchema": {
        "cellTypes": {
            "UserNameCell": RefToSomeReactFunctionOrClass
        },
        "columns": [
            {
                "actions": [
                    {
                        "handlerRef": "onUsernameClick",
                        "mouseevent": "click"
                    }
                ],
                "cellProps": {
                    "as": "link"
                },
                "id": "username",
                "size": 2,
                "title": "User Name"
            },
            {
                "cellProps": {
                    "as": "UserNameCell",
                    "customProp": "custom cellType defined in my schema"
                },
                "id": "firstName",
                "size": 2,
                "title": "First Name"
            },
            {
                "cellProps": {
                    "as": "UserNameCell",
                    "customProp": "custom cellType defined in my schema"
                },
                "id": "lastName",
                "size": 2,
                "title": "Last Name"
            },
            {
                "id": "bio",
                "size": 5,
                "title": "Bio"
            },
            {
                "actions": [
                    {
                        "handlerRef": "viewUserDetails",
                        "mouseevent": "click"
                    }
                ],
                "cellProps": {
                    "as": "button",
                    "value": "View Details",
                    "color": "primary"
                },
                "size": 1,
                "title": "Actions"
            }
        ],
        "rows": {
            "zebra": "even",
            "zebraColor": "primary",
            "zebraOpacity": "0.3"
        }
    }
}
```

### `schema.onLoadRef`

The `schema.onLoadRef` takes a reference to the action that is fired while loading data. The action must be defined in the passed in `actions` property.

### `schema.pagination`

The `schema.pagination` defines the config for the `Pagination` component.

- _currentPage_: the current page that the user is viewing, it's set by the `GridView`.
- _position_: where to position the rendered pagination? Accepts top, bottom, or both values.
- _rowsPerPage_: number of initial rows per page to show in the `DataView`. This also handles displaying the number of `GridItem`s when in the 'grid' mode.
- _rowsPerPageLabel_: the label for the rows per page option.
- _rowsPerPageOptions_: list of options for the rows per page, `[5, 10, 15, 20]`, will build a dropdown with those options.
- _totalRowsLabel_: the label for the total rows

Example `schema.pagination` object:

```json
{
    "pagination": {
        "position": "both",
        "rowsPerPage": 5,
        "rowsPerPageLabel": "Records per page",
        "rowsPerPageOptions": [
            50,
            25,
            10,
            5
        ],
        "totalRowsLabel": "Total rows:"
    }
}
```

### `schema.search`

The `schema.search` defines the config for the `SearchInput` component.

- _placeholder_: the placeholder for the search input.

### `schema.sorting`

The `schema.sorting` defines the config for the `Sorting` component.

- _default.order_: define the default order, either 'asc' or 'desc'.
- _default.orderBy_: the default order-by key of the passed in data object.
- _iconPosition_: the position of the icon in the table-header-cell, either 'right' or 'left'.

Example `schema.sorting` object:

```json
{
    "sorting": {
        "default": {
            "order": "asc",
            "orderBy": "firstName"
        },
        "iconPosition": "right"
    }
}
```

### `schema.viewSchema`

The `schema.viewSchema` defines the config for the overall `DataView` component.

- _default_: the default view type to render, either 'list' or 'grid', defaults to 'list'.
- _switcher_: properties for the internal switcher component.
- _switcher.active_: properties for the 'active' button, accepts all `Button` props.
- _switcher.inactive_: properties for the 'inactive' button, accepts all `Button` props.
- _switcher.text_: the label to display for the switcher buttons.
- _switcher.text.grid_: the label for the 'grid' view button.
- _switcher.text.list_: the label for the 'list' view button.

Example `schema.viewSchema` object:

```json
{
    "viewSchema": {
        "default": "tile",
        "switcher": {
            "active": {
                "border": true,
                "color": "primary",
                "noMinWidth": true,
                "width": "130px"
            },
            "inactive": {
                "border": true,
                "color": "white",
                "noMinWidth": true,
                "width": "130px"
            },
            "text": {
                "grid": "Tile View",
                "list": "List View"
            }
        }
    }
}
```

## Example

```jsx
import React from 'react';
import { Container, DataView } from 'pep-comp';

import SCHEMA from './schema.json';

const Component = () => (
    <Container>
        <DataView schema={SCHEMA} />
    </Container>
);

export default Component;
```

## Props

```javascript
/**
 * A map of action handlers used by rendered components.
 */
actions   : PropTypes.object,
/**
 * The main data for the body of the component.
 */
data      : PropTypes.array,
/**
 * An `oAuth` token to make API calls.
 */
oAuthToken: PropTypes.string,
/**
 * The JSON schema for the `DataView` and its inner components.
 * These include the `DataList` and `DataGrid` components.
 */
schema    : PropTypes.object,
/**
 * Add a custom theme to the rendered `DataView` and its inner components.
 */
theme     : PropTypes.object
```

## Default Props

```javascript
actions   : null,
data      : null,
oAuthToken: null,
schema    : null,
theme     : null
```
