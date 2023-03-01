const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk");
const fetchTodos = require("./functions");

// initial State
const initialState = {
    todos: [],
};

// reducer
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "todos/todoAdded":
            return {
                ...state,
                todos: [...state.todos, { text: action.payload }],
            };
        case "todos/todoLoaded":
            return {
                ...state,
                todos: [...state.todos, ...action.payload],
            };
        default:
            return state;
    }
};

// create store
const store = createStore(todoReducer, applyMiddleware(thunk.default)); // default for node js app

// subscribe to ui changes
store.subscribe(() => {
    console.log(store.getState());
});

// dispatch actions
// store.dispatch({
//     type: "todos/todoAdded",
//     payload: "Learn with LWS",
// });

store.dispatch(fetchTodos);
