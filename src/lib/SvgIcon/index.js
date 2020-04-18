import SvgIcon from './SvgIcon';

// Import in the rest of the icons
import AlertIcon from './types/AlertIcon';
import ArrowIcon from './types/ArrowIcon';
import CheckboxEmptyIcon from './types/CheckboxEmptyIcon';
import CheckboxIcon from './types/CheckboxIcon';
import CheckboxIndeterminateIcon from './types/CheckboxIndeterminateIcon';
import ChevronIcon from './types/ChevronIcon';
import ClearIcon from './types/ClearIcon';
import EmailIcon from './types/EmailIcon';
import EyeIcon from './types/EyeIcon';
import GearIcon from './types/GearIcon';
import GridIcon from './types/GridIcon';
import KeyIcon from './types/KeyIcon';
import MenuIcon from './types/MenuIcon';
import PhoneIcon from './types/PhoneIcon';
import SearchIcon from './types/SearchIcon';
import TrashIcon from './types/TrashIcon';

/**
 * All of the SVG Icon types map with an easier to read key names.
 *
 * @type {Object}
 */
const types = {
    alert: AlertIcon,
    arrow: ArrowIcon,
    checkbox: CheckboxIcon,
    checkboxEmpty: CheckboxEmptyIcon,
    checkboxIndeterminate: CheckboxIndeterminateIcon,
    chevron: ChevronIcon,
    clear: ClearIcon,
    email: EmailIcon,
    eye: EyeIcon,
    gear: GearIcon,
    grid: GridIcon,
    key: KeyIcon,
    menu: MenuIcon,
    phone: PhoneIcon,
    search: SearchIcon,
    trash: TrashIcon,
};

/**
 * Add the types to the SVG Icon default export.
 *
 * @type {Object}
 */
SvgIcon.types = types;

// Default export the SvgIcon
export default SvgIcon;

export {
    AlertIcon,
    ArrowIcon,
    CheckboxEmptyIcon,
    CheckboxIcon,
    CheckboxIndeterminateIcon,
    ChevronIcon,
    ClearIcon,
    EmailIcon,
    EyeIcon,
    GearIcon,
    KeyIcon,
    MenuIcon,
    PhoneIcon,
    SearchIcon,
    GridIcon,
    TrashIcon,
};
