[pep-comp](/) > [docs](/docs/README.md) > [helpers](/docs/helpers/README.md) > generate

--------------------------------------------------------------------------------

# generate

**src**: [generate.js](/src/lib/utils/generate.js)

These are some `biased` utility functions that we use internally for `pep-comp`. We thought it would be good to expose these to the public API, as we found them to be very useful during our dev / build cycle.

## genID

Generate a random ID, given a prefix and or max length.

```javascript
import { genID } from 'pep-comp';

const id_1 = genID();
// id_1 = 'MTA3ODY5MT'
const id_2 = genID(3);
// id_2 = 'MTA'
const id_3 = genID(null, 'item_');
// id_3 = item_MTA3ODY5MT
const id_4 = genID(15, 'four_');
// id_3 = four_MTA3ODY5MTA2NDU
```
