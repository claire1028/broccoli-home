import React from 'react';
import Modal from '../src/components/Modal.jsx';
import { mount } from 'enzyme';

const map = {
    close: jest.fn(),
    keyup: null
};
document.body.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
});

describe('Modal component with closed status', () => {
    const wrapper = mount(
        <Modal isOpen={false}>
            <div>modal children</div>
        </Modal>
    );

    it('modal should be closed', () => {
        expect(wrapper.find('.rc-dialog').get(0).props.style).toHaveProperty('display', 'none');
    });

});

describe('Modal component with open status', () => {
    const wrapper = mount(
        <Modal isOpen={true} onClose={map.close} modal={false}>
            <div>modal children</div>
        </Modal>
    );
    
    const spy = jest.spyOn(map, 'close');

    it('modal should be opened', () => {
        expect(wrapper.find('.rc-dialog').get(0).props.style).toHaveProperty('display', '');
    });

    it('modal child should render', () => {
        expect(wrapper.text()).toMatch('modal children');
    });

    it('modal can be closed by click overlay', () => {
        wrapper.find('.overlay').simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('modal closed by esc key', () => {
        map.keyup({which: 27});
        expect(spy).toHaveBeenCalledTimes(2);
    })
});