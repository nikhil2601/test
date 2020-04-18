import React from 'react';
import { mount } from 'enzyme';

import List from './index';

describe('<List />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<List />);
    });
    afterEach(() => {
        wrapper.unmount();
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a blank list, without children present', () => {
        expect(wrapper.find('ul')).toHaveLength(1);
        expect(wrapper.find('li')).toHaveLength(0);
    });

    it('should render a list, when children are present', () => {
        wrapper.setProps({ children });
        expect(wrapper.find('ul')).toHaveLength(1);
        expect(wrapper.find('li')).toHaveLength(3);
        expect(wrapper.find('li').at(1)).toHaveText('Item 2');
    });
});

const children = (
    <>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </>
);
