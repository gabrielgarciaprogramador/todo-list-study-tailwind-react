import { Check, Info, X } from "@phosphor-icons/react";
import Tooltip from "../Tooltip";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

const ItemTask = ({
	id,
	name,
	createdDate = null,
	completed,
	completedDate = null,
	searchTerm = null,
	handleAlterCompletedTask,
	handleDeleteNewTask,
}) => {
	const nameTaskRef = useRef(null);
	const [lineClamp, setLineClamp] = useState(false);
	const regexSearchTerm = new RegExp(searchTerm, "gi");

	useEffect(() => {
		setLineClamp(
			nameTaskRef.current
				? nameTaskRef.current.scrollWidth > nameTaskRef.current.clientWidth
				: false
		);
	}, []);

	return (
		<div className="flex justify-between py-2.5 px-1 space-x-1">
			<div
				className="flex items-center space-x-2.5 w-full overflow-hidden hover:opacity-70 transition"
				onClick={() => handleAlterCompletedTask(id, !completed)}
			>
				<div
					className={`rounded-sm border border-neutral-400 w-4 h-4 flex items-center justify-center cursor-pointer ${
						completed ? "bg-blue-500 border-blue-500 text-white" : ""
					}`}
				>
					{completed && <Check size={14} weight="bold" />}
				</div>
				<div className="flex items-center overflow-hidden space-x-1">
					<Tooltip
						disabled={!lineClamp}
						content={
							<>
								<span className="block">{name}</span>
								{createdDate && (
									<span className="block">
										<b>Data de Criação:</b> {format(createdDate, "dd/MM/yyyy hh:mm")}
									</span>
								)}
								{completedDate && (
									<span className="block">
										<b>Data de Conclusão:</b> {format(completedDate, "dd/MM/yyyy hh:mm")}
									</span>
								)}
							</>
						}
					>
						<span
							ref={nameTaskRef}
							className={`text-neutral-500 cursor-default items-center text-sm ${
								completed ? "line-through" : ""
							} ${lineClamp ? "line-clamp-1" : "overflow-hidden text-nowrap"}`}
						>
							{searchTerm && name.split(regexSearchTerm)?.length > 0
								? name.split(regexSearchTerm).map((part, index) => {
										return index > 0 ? (
											<span key={index}>
												<span className="font-semibold text-blue-500">
													{name.match(regexSearchTerm)?.[0] || ""}
												</span>
												{part}
											</span>
										) : (
											part
										);
								  })
								: name}
						</span>
					</Tooltip>
					{!lineClamp && (createdDate || completedDate) && (
						<Tooltip
							content={
								<>
									{createdDate && (
										<span className="block">
											<b>Data de Criação:</b> {format(createdDate, "dd/MM/yyyy hh:mm")}
										</span>
									)}
									{completedDate && (
										<span className="block">
											<b>Data de Conclusão:</b> {format(completedDate, "dd/MM/yyyy hh:mm")}
										</span>
									)}
								</>
							}
						>
							<span className="inline-block text-neutral-500 hover:text-neutral-400">
								<Info weight="fill" size={13} />
							</span>
						</Tooltip>
					)}
				</div>
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
