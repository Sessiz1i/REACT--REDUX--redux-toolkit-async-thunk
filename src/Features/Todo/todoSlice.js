import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuid_v4} from 'uuid';

const initialState = [];

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        add: (state, action) => {
            const newTodo = {id: uuid_v4(), title: action.payload, completed: false}
            state.push(newTodo)

        },
        remove: (state, action) => {
            return state.filter(todo => todo.id !== action.payload)
        },
        toggle:(state,action)=>{
            state.map( todo => todo.id === action.payload ? todo.completed = !todo.completed : todo)
        }
    }

})

export const {add,remove,toggle} = todoSlice.actions;

export default todoSlice.reducer;