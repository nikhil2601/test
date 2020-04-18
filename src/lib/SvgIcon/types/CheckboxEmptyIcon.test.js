import React from 'react';
import { shallow } from 'enzyme';

import CheckboxEmptyIcon from './CheckboxEmptyIcon';

describe('<CheckboxEmptyIcon />', () => {
    const wrapper = shallow(<CheckboxEmptyIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
