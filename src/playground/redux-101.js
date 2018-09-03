 
// Action generators - functions that return action object

const IncremenetCount = ({ incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy
});

const DecrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy: decrementBy
});

const SetCount = ({ count }) => ({
    type: 'SET',
    count: count
});

const ResetCount = () => ({
    type: 'RESET',
});


// Reducers
// 1. Reducers are pure functions
// 2. Never change state or action

const countReducer = (state={ count: 0 }, action) => {
    switch (action.type){
        case 'INCREMENT':
        return {
            count : state.count + action.incrementBy
        };
        case 'DECREMENT':
            return {
                count : state.count - action.decrementBy 
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
};


const store = createStore( countReducer);
const unsubscribe = store.subscribe( () => {
    console.log(store.getState());
});

// Actions - than an object that gets sent to the store
// Incremenet, Decrement
store.dispatch(IncremenetCount({ incrementBy: 5}));

// unsubscribe();
store.dispatch(IncremenetCount());

store.dispatch(ResetCount());

store.dispatch(DecrementCount());
store.dispatch(DecrementCount({ decrementBy: 10}));

store.dispatch(SetCount({ count: 100 }));

const user =  {
    name: "Akinnurun"
}

console.log({
    ...user
});