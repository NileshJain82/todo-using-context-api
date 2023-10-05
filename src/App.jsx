import React, { useEffect, useState } from "react";
import { TodoProvider } from "./context/todoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {

  const [todos, setTodos] = useState([]);

  // All todos = prevTodos 
  // now map on each of the prevTodos you will get the individual todo
  // individual todo = eachTodo 
  // Now keep the other eachtodo as it is and just change the todo property of the current todo remaining property same 

  const addTodo=(msg)=>{
    setTodos((prevTodos)=>[...prevTodos,{id:Date.now(),...msg}])
  }

  const deleteTodo = (id) => {
    setTodos((prevTodos) => 
      prevTodos.filter((eachTodo) => 
        eachTodo.id !== id));
  };

  const updateTodo = (id, msg) => {
    setTodos((prevTodos) =>
      prevTodos.map((eachTodo) =>
        eachTodo.id === id ?    
          {...msg} : eachTodo
      )
    );
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((eachTodo) =>
        eachTodo.id === id
          ? { ...eachTodo, complete: !eachTodo.complete }
          : eachTodo
      )
    );
  };

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0)
    setTodos(todos)
  },
  [])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },
  [todos])

  return (
    <TodoProvider value={{ todos,addTodo, deleteTodo, updateTodo, toggleTodo }}>
      <div className="bg-gray-700 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=> (
              <div key={todo.id} className="w-full">
                  <TodoItem todo={todo}/>
              </div>
            ))}
            
            
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
