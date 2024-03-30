import { Check, X } from "@phosphor-icons/react";
import Tooltip from "../Tooltip";
import { useEffect, useRef, useState } from "react";

const ItemTask = ({ id, name, check, handleAlterCompletedTask, handleDeleteNewTask }) => {
	const nameTaskRef = useRef(null);
	const [lineClamp, setLineClamp] = useState(false);

	useEffect(() => {
		setLineClamp(
			nameTaskRef.current
				? nameTaskRef.current.scrollWidth > nameTaskRef.current.clientWidth
				: false
		);
	}, []);

	return (
		<div className="flex justify-between py-2.5 px-1">
			<div
				className="flex items-center space-x-2.5 w-full overflow-hidden hover:opacity-70 transition"
				onClick={() => handleAlterCompletedTask(id, !check)}
			>
				<div
					className={`rounded-sm border border-neutral-400 w-4 h-4 flex items-center justify-center cursor-pointer ${
						check ? "bg-blue-500 border-blue-500 text-white" : ""
					}`}
				>
					{check && <Check size={14} weight="bold" />}
				</div>
				<Tooltip disabled={!lineClamp} content={name}>
					<span
						ref={nameTaskRef}
						className={`text-neutral-500 cursor-default text-sm ${check ? "line-through" : ""} ${
							lineClamp ? "line-clamp-1" : "overflow-hidden text-nowrap"
						}`}
					>
						{name}
					</span>
				</Tooltip>
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
