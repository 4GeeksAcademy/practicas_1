import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { BACKEND_URL } from '../components/BackendURL';
import CreateTask from "./CreateTask.jsx"
import TaskItem from "./TaskItem.jsx";

export const Home = () => {
	
	const [tasks, setTasks] = useState([]);

	const [newTitle, setnewTitle] = useState([]);
	
	useEffect(() => {
		fetch(BACKEND_URL+'/api/tasks')
			.then(respuesta => respuesta.json())
			.then(datos => {
				 console.log('Tareas recibidas:', datos)
				setTasks(datos);
				})	
			.catch(error => console.error('error al conectar con el backend:', error));
			
	}, [])

	const handleUpdateTask = (id, updates) => {
		fetch(`${BACKEND_URL}/api/tasks/${id}`, {
			method: 'PUT',
			headers: { "Content-Type": "application/json"},
			body: JSON.stringify(updates)
		})	
			.then(respuesta => respuesta.json())
			.then(updated =>{
				setTasks(prev =>
					 prev.map(task => (task.id === id ? updated: task))
				);
			})
			.catch(error => console.error("Error al actualizar tareas: ", error));	
	};

	const handleDelete = (id) => {
		if(!id) return;

		fetch(`${BACKEND_URL}/api/tasks/${id}`, {method: "DELETE"})
			.then(respuesta =>{
				if(!respuesta.ok) throw new error(`HTTP ${respuesta.status}`);
				return respuesta.json().catch(() => ({}));
			})
			.then(() =>{
				setTasks((prev) => prev.filter((tarea) => tarea.id != id));
			})
			
			.catch((error) => {
				console.error("Error al eliminar la tarea:", error);
			});
	};


	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}


	return (
		 <div className="text-center mt-5">
			<h1 className="display-4">Lista de Tareas</h1>
				<ul className="list-group">
					{tasks.map(task =>(
						<TaskItem
							key= {task.id}
							task = {task}
							handleUpdateTask={handleUpdateTask}
							handleDelete={handleDelete}
						/>
					))}

				</ul>


			<CreateTask setTasks={setTasks}/>
			

		 </div>
	);
}; 



{/* <ul className="list-group">
	{tasks.map(task =>(
		<li key= {task.id} className = 'list-group-item d-flex justify-content-between align-items-center' >
			{task.title}
			<span> {task.done ? "✅" : "🕒"} </span>

			<button 
			className="btn btn-sm btn-outline-danger"
			onClick={ () => handleDelete(task.id)}
			>
				Eliminar
			</button>

		</li>
	))}
</ul>  */}