import TableCellButton from './TableCellButton';
import TableCellButtonGroup from './TableCellButtonGroup';
import TableCellCheckbox from './TableCellCheckbox';
import TableCellDate from './TableCellDate';
import TableCellLinksList from './TableCellLinksList';
import TableCellStatus from './TableCellStatus';
import TableCellSvg from './TableCellSvg';

const types = {
    button: TableCellButton,
    buttonGroup: TableCellButtonGroup,
    checkbox: TableCellCheckbox,
    date: TableCellDate,
    link: TableCellLinksList,
    status: TableCellStatus,
    svg: TableCellSvg,
};

export default types;

export {
    TableCellButton,
    TableCellCheckbox,
    TableCellDate,
    TableCellLinksList,
    TableCellStatus,
    TableCellSvg,
};
