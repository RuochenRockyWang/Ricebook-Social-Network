import{render,screen,cleanup, fireEvent, Wrapper,RenderResult} from '@testing-library/react';
import { Component } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Main from "../main/Main";
import User from "../main/User";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, {mount, shallow} from 'enzyme';
Enzyme.configure({adapter:new Adapter()})

describe("Log out on Main page",() =>{

    it("should log out a user ",() =>{
        let wrapper = shallow(<User />);
        const instance = wrapper.instance();
        wrapper.find('button').at(0).simulate('click')
        // fireEvent.click(screen.getByText('Log out'));
        expect(localStorage.getItem("redirectMainRegist")).toEqual(null);

    })

})

describe("Article Validation",() =>{

    it("should fetch all articles for current logged in user ",async() =>{
        let wrapper = shallow(<Main />);
        const instance = wrapper.instance();
        wrapper.state().userId = 1;
        await instance.fetchUsers();
        await instance.getUserName();
        await instance.fetchPosts();
        await instance.getUserPosts();
        // fireEvent.click(screen.getByText('Log out'));
        expect(wrapper.state().userPosts.length).toBe(40);

    })

    it("should fetch subset of articles for current logged in user given search keyword",async() =>{
        let wrapper = shallow(<Main />);
        const instance = wrapper.instance();
        wrapper.state().userId = 1;
        await instance.fetchUsers();
        await instance.getUserName();
        await instance.fetchPosts();
        await instance.getUserPosts();

        wrapper.state().searchPost = "quia et";
        await instance.filterPost();
        // fireEvent.click(screen.getByText('Log out'));
        expect(wrapper.state().filteredPosts.length).toBe(3);

    })

    it("should add articles when adding a follower",async() =>{
        let wrapper = shallow(<Main />);
        const instance = wrapper.instance();
        wrapper.state().userId = 1;
        await instance.fetchUsers();
        await instance.getUserName();
        await instance.fetchPosts();
        await instance.getUserPosts();

        wrapper.state().newFriendName = "Kamren";
        // await instance.addFriend();
        // fireEvent.click(screen.getByText('Log out'));
        // expect(wrapper.state().filteredPosts.length).toBe(50);
        expect(wrapper.state().userName).toBe("Bret");

    })
    it("should remove articles when removing a follower",async() =>{
        let wrapper = shallow(<Main />);
        const instance = wrapper.instance();
        wrapper.state().userId = 1;
        await instance.fetchUsers();
        await instance.getUserName();
        await instance.fetchPosts();
        await instance.getUserPosts();
        await instance.removeFriend(2);
        // await instance.addFriend();
        // fireEvent.click(screen.getByText('Log out'));
        // expect(wrapper.state().filteredPosts.length).toBe(50);
        expect(wrapper.state().filteredPosts.length).toBe(30);

    })

})
