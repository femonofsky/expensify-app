import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();



// store.dispatch(addExpense({
//     description: "Water Bill ", amount: 50, createdAt: 10000
// }));
// store.dispatch(addExpense({
//     description: "Gas Bill", amount: 600, createdAt: 3432
// }));
//  store.dispatch(addExpense({
//     description: "Rent", amount: 10900, createdAt: 500
// }));

// store.dispatch(addExpense({
//     description: "Person", amount: 130, createdAt: 7700
// }));

// store.dispatch( setTextFilter('bill'));
// store.dispatch( setTextFilter('water'));

// // store.subscribe( () => {
// const state = store.getState();
//     // console.log(state);
// const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
// console.log(visibleExpenses);
// });

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render( jsx, document.getElementById("app"));
