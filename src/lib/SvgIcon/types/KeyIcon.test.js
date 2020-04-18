import React from 'react';
import { shallow } from 'enzyme';

import KeyIcon from './KeyIcon';

describe('<KeyIcon />', () => {
    const wrapper = shallow(<KeyIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
