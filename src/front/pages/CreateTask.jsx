import React, {useState} from 'react'
import { BACKEND_URL } from '../components/BackendURL';


const CreateTask = ({setTasks}) => {
    const [newTitle, setNewTitle] = useState("");

    const handleCreateTask = () => {
        const title = newTitle.trim();
        if (!title) return;

        fetch(`${BACKEND_URL}/api/tasks`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, done: false})
        })
        .then(respuesta => respuesta.json())
        .then(created =>{
            setTasks(prev => [created, ...prev]);
            setNewTitle("");
        })
        .catch(error => console.error("Error al crear tarea:", error));
};
    return(
        <div className='mb-3 d-flex justify-content-center gap-2'>
            <input 
            className='form-control w-50'
            type='text'
            placeholder='Escribe una nueva tarea'
            value={newTitle}
            onChange={(evento) => setNewTitle(evento.target.value)}
            onClick = {handleCreateTask}
            onKeyDown = {(evento) => evento.key === "Enter" && handleCreateTask()}
            />
            <button className='btn btn-success' onClick={handleCreateTask}>
                Agregar
            </button>
        </div>
    )
}


export default CreateTask