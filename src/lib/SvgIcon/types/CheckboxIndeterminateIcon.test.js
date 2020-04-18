import React from 'react';
import { shallow } from 'enzyme';

import CheckboxIndeterminateIcon from './CheckboxIndeterminateIcon';

describe('<CheckboxIndeterminateIcon />', () => {
    const wrapper = shallow(<CheckboxIndeterminateIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
