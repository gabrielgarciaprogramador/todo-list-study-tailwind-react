import ItemTask from "../ItemTask";

const ListTasks = ({ title, list, handleAlterCompletedTask, handleDeleteNewTask }) => {
	return (
		<div>
			<div className="mb-2 flex items-center space-x-2.5">
				<h4 className="text-neutral-700 font-medium">{title}</h4>
				{list.length > 0 && (
					<span className="bg-blue-400 text-white text-xs px-1 py-[1px] rounded">
						{`${list.length} ${list.length == 1 ? "task" : "tasks"}`}
					</span>
				)}
			</div>
			{list.length > 0 ? (
				<div className=" h-auto max-h-32 overflow-y-auto pr-3 -mr-3">
					<div className="divide-y divide-neutral-100 border-t border-neutral-100">
						{list.map((task) => {
							return (
								<ItemTask
									key={"item-task-" + task.id}
									id={task.id}
									name={task.name}
									check={task.completed}
									handleAlterCompletedTask={handleAlterCompletedTask}
									handleDeleteNewTask={handleDeleteNewTask}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<p className="text-neutral-400 text-sm">Não há tasks nesta situação.</p>
			)}
		</div>
	);
};

export default ListTasks;
