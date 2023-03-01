const { createStore, applyMiddleware } = require("redux");
const { delayMiddleware, fetchTodosMiddleware } = require("./middlewares");

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
const store = createStore(
    todoReducer,
    applyMiddleware(delayMiddleware, fetchTodosMiddleware)
);

// subscribe to ui changes
store.subscribe(() => {
    console.log(store.getState());
});

// dispatch actions
// store.dispatch({
//     type: "todos/todoAdded",
//     payload: "Learn with LWS",
// });

store.dispatch({
    type: "todos/todoFetched",
});
