import { Check, X } from "@phosphor-icons/react";

const ItemTask = ({ id, name, check, handleAlterCompletedTask, handleDeleteNewTask }) => {
	return (
		<div className="flex justify-between py-2.5 px-1">
			<div
				className="flex items-center space-x-2.5 hover:opacity-70 transition"
				onClick={() => handleAlterCompletedTask(id, !check)}
			>
				<div
					className={`rounded-sm border border-neutral-400 w-4 h-4 flex items-center justify-center cursor-pointer ${
						check ? "bg-blue-500 border-blue-500 text-white" : ""
					}`}
				>
					{check && <Check size={14} weight="bold" />}
				</div>
				<span className="text-neutral-500 cursor-default text-sm">{name}</span>
			</div>
			<button
				type="button"
				className="text-neutral-400 hover:opacity-60 transition"
				onClick={() => handleDeleteNewTask(id)}
			>
				<X size={13} />
			</button>
		</div>
	);
};

export default ItemTask;
