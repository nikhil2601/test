import React from 'react';
import { shallow } from 'enzyme';

import EmailIcon from './EmailIcon';

describe('<EmailIcon />', () => {
    const wrapper = shallow(<EmailIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
