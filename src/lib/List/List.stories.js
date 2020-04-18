import React from 'react';

import Box from '../Box';
import List from './List';
import ListItem from '../ListItem';
import { genID } from '../../utils';

export default {
    title: 'List',
    component: List,
};

export const list = () => (
    <Box>
        <List flush>
            {[1, 2, 3, 4].map(item => (
                <ListItem key={genID()} button>
                    Item {item}
                </ListItem>
            ))}
        </List>
    </Box>
);

export const orderedList = () => (
    <Box width="50%">
        <List ordered>
            {[1, 2, 3, 4].map(item => (
                <ListItem key={genID()} button>
                    Item {item}
                </ListItem>
            ))}
        </List>
    </Box>
);

export const bulletList = () => (
    <Box width="50%">
        <List margin="20px" listStyle="disc">
            {[1, 2, 3, 4].map(item => (
                <ListItem key={genID()}>Item {item}</ListItem>
            ))}
        </List>
    </Box>
);

export const listWithDivider = () => (
    <List width="50%" margin="20px">
        {[1, 2, 3, 4].map(item => (
            <ListItem key={genID()} button divider>
                Item {item}
            </ListItem>
        ))}
    </List>
);
