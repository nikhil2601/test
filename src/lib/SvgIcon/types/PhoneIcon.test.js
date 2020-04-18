import React from 'react';
import { shallow } from 'enzyme';

import PhoneIcon from './PhoneIcon';

describe('<PhoneIcon />', () => {
    const wrapper = shallow(<PhoneIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
