import{render,screen,cleanup, fireEvent, Wrapper,RenderResult} from '@testing-library/react';
import { Component } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Login from "../landing/Login";
import userValidation from "../landing/Login";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, {mount, shallow} from 'enzyme';
Enzyme.configure({adapter:new Adapter()})

describe("Validate Authentication",() =>{
    
    beforeEach(()=>{
        let wrapper = shallow(<Login />);
        const instance = wrapper.instance();
    });

    // afterEach(cleanup);
    it("should log in a previously registered user ",() =>{
        let wrapper = shallow(<Login />);
        const instance = wrapper.instance();
        wrapper.find('input[name="userName"]').simulate('change',{target: {name:'userName',value:'Bret'}})
        wrapper.find('input[name="password"]').simulate('change',{target: {name:'password',value:'Kulas Light'}})
        expect(wrapper.state().userName).toEqual('Bret');
        wrapper.find('button').simulate('click')
        expect(wrapper.state().redirectMain).toBe(false)
        
        
    })
    // it("should log in a previously registered user ",() =>{
    //     fireEvent.change(screen.getByTestId("userName"),{target:{value:"Bret"}});
    //     fireEvent.change(screen.getByTestId("password"),{target:{value:"Kulas Light"}});
    //     const button = screen.getByTestId('loginBtn');
    //     fireEvent.click(button);
    //     // expect(rtl.getByTestId("userName").value).toEqual("Bret");
    //     expect(screen.getByTestId("password").value).toEqual("Kulas Light");
    //     expect(localStorage.getItem('userValid')).toEqual("false");
        
        
    // })
    it("should not log in an invalid  user ",() =>{
        let wrapper = shallow(<Login />);
        const instance = wrapper.instance();
        wrapper.find('input[name="userName"]').simulate('change',{target: {name:'userName',value:'Bret'}})
        wrapper.find('input[name="password"]').simulate('change',{target: {name:'password',value:'Kulas'}})
        wrapper.find('button').simulate('click')
        expect(wrapper.state().redirectMain).toBe(false)
        
    })
})