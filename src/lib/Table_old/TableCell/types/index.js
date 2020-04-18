import TableCellButton from './TableCellButton';
import TableCellCheckbox from './TableCellCheckbox';
import TableCellHead from './TableCellHead';
import TableCellLink from './TableCellLink';
import TableCellStatus from './TableCellStatus';
import TableCellSvg from './TableCellSvg';
import TableCellDate from './TableCellDate';

const types = {
    button: TableCellButton,
    checkbox: TableCellCheckbox,
    date: TableCellDate,
    head: TableCellHead,
    link: TableCellLink,
    status: TableCellStatus,
    svg: TableCellSvg,
};

export default types;

export {
    TableCellButton,
    TableCellCheckbox,
    TableCellHead,
    TableCellLink,
    TableCellStatus,
    TableCellSvg,
};
