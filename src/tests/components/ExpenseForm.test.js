import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import  ExpenseForm  from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses'; 

test('should render ExpenseFrom correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseFrom with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit',{
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set descritption on input change', () => {
    const value = "New description"
    const wrapper = shallow(<ExpenseForm />);
    // expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(0).simulate('change',{
        target: { value}
    });
    expect(wrapper.state('description')).toBe(value);
    // expect(wrapper).toMatchSnapshot();
});


test('should set note on textarea change', () => {
    const value = "New Note"
    const wrapper = shallow(<ExpenseForm />);
    // expect(wrapper).toMatchSnapshot();
    wrapper.find('textarea').simulate('change',{
        target: { value}
    });
    expect(wrapper.state('note')).toBe(value);
    // expect(wrapper).toMatchSnapshot();
});


test('should set amount on input change if valid input', () => {
    const value = "23";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target: { value}
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should set amount on input change if invalid', () => {
    const value = "23.3221";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target: { value}
    });
    expect(wrapper.state('amount')).toBe("");
});


test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm 
        expense={expenses[0]}
        onSubmit={onSubmitSpy}
        />);
    wrapper.find('form').simulate('submit',{
            preventDefault: () => {}
        });
    expect(wrapper.state("error")).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});


test('should set new date on dateChange', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});


test('should set calendar focus on dateChange', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused: true});
    expect(wrapper.state('calenderfocused')).toBe(true);
});


