import React from 'react';

import Pagination from './Pagination';

export default {
    title: 'Pagination',
    component: Pagination,
};

export const simple = () => <Pagination />;

export const withProps = () => (
    <Pagination
        currentPage={1}
        hidePagination={false}
        onChangePage={() => {}}
        onChangeRowsPerPage={() => {}}
        rowsPerPage={5}
        rowsPerPageLabel="Rows / page:"
        rowsPerPageOptions={[2, 4, 6, 8]}
        totalRows={3}
        totalRowsLabel="Total Rows:"
    />
);
