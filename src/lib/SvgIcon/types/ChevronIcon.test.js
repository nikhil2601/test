import React from 'react';
import { shallow } from 'enzyme';

import ChevronIcon from './ChevronIcon';

describe('<ChevronIcon />', () => {
    let wrapper;

    it('should render correctly by default', () => {
        wrapper = shallow(<ChevronIcon />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Up Chevron', () => {
        wrapper = shallow(<ChevronIcon direction="up" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Down Chevron', () => {
        wrapper = shallow(<ChevronIcon direction="down" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Left Chevron', () => {
        wrapper = shallow(<ChevronIcon direction="left" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Right Chevron', () => {
        wrapper = shallow(<ChevronIcon direction="right" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Double Up Chevron', () => {
        wrapper = shallow(<ChevronIcon direction="up" type="double" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Double Down Chevron', () => {
        wrapper = shallow(<ChevronIcon direction="down" type="double" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Double Left Chevron', () => {
        wrapper = shallow(<ChevronIcon direction="left" type="double" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Double Right Chevron', () => {
        wrapper = shallow(<ChevronIcon direction="right" type="double" />);
        expect(wrapper).toMatchSnapshot();
    });
});
