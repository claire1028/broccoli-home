import React from 'react';
import Body from '../src/Body.jsx';
import { mount } from 'enzyme';
import mockAxios from '../__mocks__/axios';


describe('Body rendered', () => {
    const wrapper = mount(
        <Body />
    );
    it('h3 text be rendered', () => {
        expect(wrapper.find('.content h3')).toHaveLength(2);
    });

    it('request modal be shown', () => {
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'openRequestModal');
        instance.forceUpdate();
        wrapper.find('.content button').simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });

});

describe('Request modal with opened', () => {
    const wrapper = mount(
        <Body />
    );

    beforeEach(() => {
        wrapper.find('.content button').simulate('click');
    });

    it('request modal validate', () => {
        expect(wrapper.find('#requestBtn').get(0).props).toHaveProperty('disabled', true);
    });

    it('input onchange trigger', () => {
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'handleChange');
        instance.forceUpdate();
        wrapper.find('input[name="name"]').simulate("change", { target: { value: 'f' } });
        wrapper.find('input[name="email"]').simulate("change", { target: { value: 'f' } });
        wrapper.find('input[name="confirmEmail"]').simulate("change", { target: { value: 'f' } });
        expect(spy).toHaveBeenCalledTimes(3);
    });

    it('validate name length err', () => {
        wrapper.setState({ name: 'b' });
        wrapper.setState({ email: 'b' });
        wrapper.setState({ confirmEmail: 'b' });
        wrapper.find('#requestBtn').simulate('click');
        wrapper.update();
        expect(wrapper.state('tip')).toMatch('name length at least 3');
    });

    it('validate email format err', () => {
        wrapper.setState({ name: 'bcd' });
        wrapper.setState({ email: 'b' });
        wrapper.setState({ confirmEmail: 'b' });
        wrapper.find('#requestBtn').simulate('click');
        wrapper.update();
        expect(wrapper.state('tip')).toMatch('email format wrong');
    });

    it('validate confirm email not match with email err', () => {
        wrapper.setState({ name: 'bcd' });
        wrapper.setState({ email: 'bcd@ddd.com' });
        wrapper.setState({ confirmEmail: 'bdd' });
        wrapper.find('#requestBtn').simulate('click');
        wrapper.update();
        expect(wrapper.state('tip')).toMatch('confirm email not match with email');
    });
   
});

describe('validate success with api ok', () => {
    const wrapper = mount(
        <Body />
    );
    
    beforeEach(() => {
        wrapper.find('.content button').simulate('click');
        wrapper.setState({ name: 'bcd' });
        wrapper.setState({ email: 'bcd@ddd.com' });
        wrapper.setState({ confirmEmail: 'bcd@ddd.com' });
    });

    it('validate pass sending status true', () => {
        wrapper.find('#requestBtn').simulate('click');
        expect(wrapper.state('sending')).toBeTruthy();
    });

    it('validate pass with api 200', async () => {
        mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({
              status: 200
            })
          });
        wrapper.find('#requestBtn').simulate('click');
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/prod/fake-auth",
            {
                name: 'bcd',
                email: 'bcd@ddd.com'
            }
        );
        setTimeout(() => {
            expect(wrapper.state('modal')).toMatch('done');
        });
    });
    
});


describe('validate success with api 400', () => {
    const wrapper = mount(
        <Body />
    );
    it('validate pass with api 400', async() => {
        wrapper.find('.content button').simulate('click');

        wrapper.setState({ name: 'kkk' });
        wrapper.setState({ email: 'usedemail@airwallex.com' });
        wrapper.setState({ confirmEmail: 'usedemail@airwallex.com' });
        wrapper.update();

        mockAxios.post.mockImplementationOnce(() => {
            return Promise.reject({
                response: {data: {errorMessage: 'has registered'}},
                status: 400
            });
        });
        wrapper.find('#requestBtn').simulate('click');
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/prod/fake-auth",
            {
                name: 'kkk',
                email: 'usedemail@airwallex.com'
            }
        );
        setTimeout(() => {
            expect(wrapper.state('tip')).toMatch('has registered');
        });
    });
})