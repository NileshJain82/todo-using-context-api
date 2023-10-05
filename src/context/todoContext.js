import { createContext, useCallback, useContext } from "react";

export const TodoContext = createContext({
    todos:[
        {
            id:1,
            msg: "Todo msg",
            complete:false
        }
    ],
    addTodo:(msg)=>{},
    deleteTodo:(id)=>{},
    updateTodo:(id,msg)=>{},
    toggleTodo:(id)=>{},
})

export const TodoProvider = TodoContext.Provider

export default function useTodo(){
    return useContext(TodoContext)
}