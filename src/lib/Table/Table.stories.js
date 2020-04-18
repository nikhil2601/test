import React from 'react';

import Table from './Table';
import TableHead from '../TableHead';
import TableRow from '../TableRow';
import TableBody from '../TableBody';
import TableCell from '../TableCell';

export default {
    title: 'Table',
    component: Table,
};

const tableData = {
    header: ['First name', 'Last name', 'Age', 'Foo', 'Foo'],
    body: ['John', 'Doe', '00', 'Foo', 'Foo'],
};

export const table = () => (
    <Table margin={2} placement="bottom-end" width="50%">
        <TableHead>
            <TableRow>
                {tableData.header.map(title => (
                    <TableCell>{title}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                {tableData.body.map(value => (
                    <TableCell>{value}</TableCell>
                ))}
            </TableRow>
        </TableBody>
    </Table>
);

export const tableElevation = () => (
    <Table margin={2} cols={3} placement="bottom-end" width="50%">
        <TableHead>
            <TableRow>
                {tableData.header.map(title => (
                    <TableCell>{title}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                {tableData.body.map(value => (
                    <TableCell>{value}</TableCell>
                ))}
            </TableRow>
        </TableBody>
    </Table>
);
