import AsyncReactSelectWidget from './AsyncReactSelectWidget';
import BaseInput from './BaseInputPicklist';
import CheckboxWidget from './CheckboxWidget';
import DocSendFromWidget from './DocSendFromWidget';
import HandbookSearchWidget from './HandbookSearchWidget';
import RadioWidget from './RadioWidget';
import ReactSelectWidget from './ReactSelectWidget';
import TextAreaWidget from './TextAreaWidget';

const widgets = {
    AsyncSelectWidget: AsyncReactSelectWidget,
    BaseInput,
    CheckboxWidget,
    DocSendFromWidget,
    HandbookSearchWidget,
    RadioWidget,
    SelectWidget: ReactSelectWidget,
    textarea: TextAreaWidget,
};

export default widgets;
