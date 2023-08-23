import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({ children }) {

    // Estados
  const {item: todos,saveItem: saveTodos, loading, error} = useLocalStorage("TODOS_V1", [])
  const [searchValue, setSearchValue] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)

  // Estados derivados
  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const searchedTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchValue.toLowerCase()))

  const addTodo = (text) => {
    const newTodos = [...todos]
    newTodos.push({
      text,
      completed: false,
    })
    saveTodos(newTodos)
  }

  const completeTodo = (id) => {
    const newTodos = [...todos]
    const todoIndex = newTodos.findIndex(todo => todo.id === id)
    newTodos[todoIndex].completed = true
    saveTodos(newTodos)
  }

  const deleteTodo = (id) => {
    const newTodos = [...todos]
    const todoIndex = newTodos.findIndex(todo => todo.id === id)
    newTodos.splice(todoIndex, 1)
    saveTodos(newTodos)
  }

    return (
        <TodoContext.Provider value={{
            addTodo,
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContext, TodoProvider }