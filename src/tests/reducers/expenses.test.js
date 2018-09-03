import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses'; 
import moment from 'moment';

test('should set default state' , () => {
    const state = expensesReducer(undefined, { type : '@@INIT' });
    expect(state).toEqual([]);
});


test('should remove expense by id' , () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id:  expenses[1].id
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([expenses[0],expenses[2]]);
});


test('should not remove expense if id not found' , () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
});


test('should add an expense' , () => {
    const newExpense = {
        id: '4',
        description: 'Kill It',
        amount: 1900,
        note: 'This test is hard work ooo',
        createdAt: moment(0).add(5, 'days').valueOf()
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([...expenses,newExpense]);
});

test('should edit an expense' , () => {
    const newExpense = {
        id: '4',
        description: 'Kill It',
        amount: 1900,
        note: 'This test is hard work ooo',
        createdAt: moment(0).add(5, 'days').valueOf()
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: newExpense.id,
        updates: { ...newExpense, description: 'working on react is not that dat'}
    }
    const state = expensesReducer([...expenses,newExpense],action);
    expect(state).toEqual([...expenses, { ...newExpense, description: 'working on react is not that dat'}]);
});


test('should edit an expense if not found' , () => {
    const newExpense = {
        id: '4',
        description: 'Kill It',
        amount: 1900,
        note: 'This test is hard work ooo',
        createdAt: moment(0).add(5, 'days').valueOf()
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: 7,
        updates: { ...newExpense, description: 'working on react is not that dat'}
    }
    const state = expensesReducer([...expenses,newExpense],action);
    expect(state).toEqual([...expenses,newExpense]);
});
