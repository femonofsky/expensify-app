import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses'; 

let onSubmit, onDeleteExpense, history, wrapper;

beforeEach( () => {
    onSubmit = jest.fn();
    onDeleteExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage expense={expenses[1]} onSubmit={onSubmit} onDeleteExpense={onDeleteExpense} history={history}/>);
})

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should hanlde onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(onSubmit).toHaveBeenLastCalledWith(expenses[1].id,{...expenses[1]});
});

test('should hanlde onDelete', () => {
    wrapper.find('button').prop('onClick')();
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(onDeleteExpense).toHaveBeenLastCalledWith(expenses[1].id);
});