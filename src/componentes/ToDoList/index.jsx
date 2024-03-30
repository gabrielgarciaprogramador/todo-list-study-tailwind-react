import { useState } from "react";
import ListTasks from "../ListTasks";
import { X } from "@phosphor-icons/react";

const ToDolist = () => {
	const [tasks, setTasks] = useState([
		{
			id: 1,
			name: "Tarefa com nome muito longo capaz de ocupar mais de uma linha",
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
		{
			id: 6,
			name: "Tarefa 6",
			completed: false,
		},
		{
			id: 6,
			name: "Tarefa 6",
			completed: true,
		},
		{
			id: 7,
			name: "Tarefa 7",
			completed: false,
		},
		{
			id: 8,
			name: "Tarefa 8",
			completed: false,
		},
		{
			id: 9,
			name: "Tarefa 9",
			completed: true,
		},
		{
			id: 10,
			name: "Tarefa 10",
			completed: false,
		},
	]);

	const [valueNewTask, setValueNewTask] = useState("");

	const handleChangeInputNewTask = (e) => {
		setValueNewTask(e.target.value);
	};

	const handleClearValueNewTask = () => {
		setValueNewTask("");
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
				<div className="flex rounded-sm bg-neutral-50 border border-neutral-200 focus-within:outline-none focus-within:border-neutral-300 focus-within:shadow-sm transition">
					<input
						className="flex-1 py-2 px-3 text-base bg-transparent focus:outline-none text-neutral-500 placeholder:text-neutral-300"
						type="text"
						value={valueNewTask}
						placeholder="Digite aqui sua task"
						onChange={handleChangeInputNewTask}
					/>
					{valueNewTask !== "" && (
						<button
							className="block h-auto p-2.5 text-neutral-400 hover:text-neutral-300 transition"
							type="button"
							onClick={handleClearValueNewTask}
						>
							<X size={13} />
						</button>
					)}
				</div>
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
