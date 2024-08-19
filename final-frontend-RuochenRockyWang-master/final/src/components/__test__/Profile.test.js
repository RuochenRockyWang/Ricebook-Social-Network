import { Component } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Update from "../profile/Update";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, {mount, shallow} from 'enzyme';

Enzyme.configure({adapter:new Adapter()})

describe("Profile Validation",() =>{

    it("should fetch the logged in user's profile username ",() =>{
        let wrapper = shallow(<Update />);
        const instance = wrapper.instance();
        expect(localStorage.getItem("userName")).toEqual(null)

    })

})