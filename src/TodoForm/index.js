import React from "react";
import "./TodoForm.css";
import { TodoContext } from "../TodoContext";

function TodoForm() {

    const {
        addTodo,
        setOpenModal,
    } = React.useContext(TodoContext);

    const [newTodoValue, setNewTodoValue] = React.useState('');

    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setOpenModal(false);
        addTodo(newTodoValue);
    }

    const onCancel = () => {
        setOpenModal(false);
    }

    return(
        <form onSubmit={onSubmit}>
            <label>Escribe tu nuevo TODO</label>
            <textarea placeholder="Agrega tu TODO" value={newTodoValue} onChange={onChange}/>
            <div className="TodoForm-buttonContainer">
                <button type="submit"  className="TodoForm-button TodoForm-button--cancel">Añadir</button>
                <button type="button" className="TodoForm-button TodoForm-button--add" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    )

}

export { TodoForm }