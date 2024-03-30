import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useState } from "react";

const Tooltip = ({ children, content, disabled = false }) => {
	const [open, setOpen] = useState(false);
	return (
		<TooltipPrimitive.Provider delayDuration={300}>
			<TooltipPrimitive.Root open={!disabled && open}>
				<TooltipPrimitive.Trigger
					onMouseEnter={() => setOpen(true)}
					onMouseLeave={() => setOpen(false)}
					asChild
				>
					{children}
				</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content
						sideOffset={1}
						className="bg-blue-500 py-1.5 px-2.5 rounded-md max-w-72"
					>
						<span className="text-white text-xs block leading-4">{content}</span>
						<TooltipPrimitive.Arrow className="fill-current text-blue-500" width={8} height={4} />
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
};

export default Tooltip;
