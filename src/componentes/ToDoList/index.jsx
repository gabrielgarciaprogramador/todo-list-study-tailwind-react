import { useState } from "react";
import ListTasks from "../ListTasks";

const ToDolist = () => {
	const [tasks, setTasks] = useState([
		{
			id: 1,
			name: "Tarefa 1",
			completed: true,
		},
		{
			id: 2,
			name: "Tarefa 2",
			completed: true,
		},
		{
			id: 3,
			name: "Tarefa 3",
			completed: false,
		},
		{
			id: 4,
			name: "Tarefa 4",
			completed: true,
		},
		{
			id: 5,
			name: "Tarefa 5",
			completed: false,
		},
	]);

	const [valueNewTask, setValueNewTask] = useState("");

	const handleChangeInputNewTask = (e) => {
		setValueNewTask(e.target.value);
	};

	const handleDeleteNewTask = (idTask) => {
		let newListTasks = [...tasks];
		const indexTask = searchIndexTaskById(idTask);

		newListTasks.splice(indexTask, 1);
		setTasks(newListTasks);
	};

	const handleCreateNewTask = () => {
		if (valueNewTask !== "") {
			const nextIdTask = Math.max(...tasks.map((task) => task.id));
			setTasks([
				...tasks,
				{
					id: nextIdTask + 1,
					name: valueNewTask,
					completed: false,
				},
			]);
			setValueNewTask("");
		}
	};

	const handleAlterCompletedTask = (idTask, completed) => {
		let newListTasks = [...tasks];
		const indexTask = searchIndexTaskById(idTask);

		newListTasks[indexTask].completed = completed;
		newListTasks.push(newListTasks.splice(indexTask, 1)[0]);
		setTasks(newListTasks);
	};

	const searchIndexTaskById = (id) => {
		return tasks.findIndex((task) => task.id === id);
	};

	return (
		<div className="bg-white max-w-md w-full py-5 px-6 shadow-md rounded-xl">
			<h2 className="text-blue-500 text-3xl font-bold mb-4">Criador de tarefas</h2>
			<div className="mb-7 space-y-7">
				<ListTasks
					title="Pendentes"
					list={tasks.filter((task) => task.completed == false)}
					handleAlterCompletedTask={handleAlterCompletedTask}
					handleDeleteNewTask={handleDeleteNewTask}
				/>
				<ListTasks
					title="Concluídos"
					list={tasks.filter((task) => task.completed == true)}
					handleAlterCompletedTask={handleAlterCompletedTask}
					handleDeleteNewTask={handleDeleteNewTask}
				/>
			</div>
			<div className="flex flex-col space-y-3">
				<input
					className="border border-neutral-200 py-2 px-3 rounded-sm text-base text-neutral-500 bg-neutral-50 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-300 focus:shadow-sm transition"
					type="text"
					value={valueNewTask}
					placeholder="Digite aqui sua task"
					onChange={handleChangeInputNewTask}
				/>
				<button
					className={` text-white p-2.5 text-base font-semibold rounded-sm transition ${
						valueNewTask == ""
							? "bg-neutral-300 cursor-not-allowed"
							: "bg-green-500 hover:bg-green-600"
					}`}
					type="button"
					disabled={valueNewTask == ""}
					onClick={handleCreateNewTask}
				>
					Adicione uma task
				</button>
			</div>
		</div>
	);
};

export default ToDolist;
