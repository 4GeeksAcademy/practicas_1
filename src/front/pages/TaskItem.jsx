import React from "react";

const TaskItem = ( {task, handleUpdateTask, handleDelete} ) => {
    const handleTitleChange = (evento) => {
        const newTitle = evento.target.value;
        handleUpdateTask(task.id, {title: newTitle});
    };

    const toggleDone = () => {
        handleUpdateTask(task.id, {done: !task.done});
    };
    
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2 w-75">
                <input 
                    className="form-control"
                    type="text"
                    value= {task.title}
                    onChange = { (evento) =>
                        handleUpdateTask(task.id, {title: evento.target.value})
                    }
                    onBlur={handleTitleChange}
                />

                <input 
                    type="checkbox"
                    checked={task.done}
                    onChange = {toggleDone}
                    />
            </div>
            <button className="btn btn-sm btn-outline-danger"
                onClick = { () => handleDelete(task.id)}
                >
                Eliminar
            </button>

        </li>
        
    );

};

export default TaskItem;