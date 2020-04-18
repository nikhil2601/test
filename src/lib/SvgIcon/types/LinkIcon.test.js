import React from 'react';
import { shallow } from 'enzyme';

import LinkIcon from './LinkIcon';

describe('<LinkIcon />', () => {
    const wrapper = shallow(<LinkIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
