import { addExpense,  editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action =  removeExpense({ id: '1232132'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '1232132'
    });
});


test('should setup edit expense action object', () => {
    const action =  editExpense("2334242", { note : 'New Note Value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: "2334242",
        updates : { note:'New Note Value'}
    });
});

test('should setup create expense action with provided values', () => {
    const expenseDate = {
        description : 'New Note Value',
        amount: 232,
        createdAt: 1000,
        note: "This was last month rent"
    };
    const action =  addExpense(expenseDate);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseDate,
            id: expect.any(String)
        }
    });
});

test('should setup create expense action with default values', () => {
    const action =  addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: "",
            amount : 0,
            createdAt: 0,
            note: '',
            id: expect.any(String)
        } 
    });
});