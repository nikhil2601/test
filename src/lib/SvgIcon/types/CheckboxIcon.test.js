import React from 'react';
import { shallow } from 'enzyme';

import CheckboxIcon from './CheckboxIcon';

describe('<CheckboxIcon />', () => {
    const wrapper = shallow(<CheckboxIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
