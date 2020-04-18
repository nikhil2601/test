import React from 'react';
import { shallow } from 'enzyme';

import SearchIcon from './SearchIcon';

describe('<SearchIcon />', () => {
    const wrapper = shallow(<SearchIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
