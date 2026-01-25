"use client";

import clsx from "clsx";
import { useMemo, type ReactNode } from "react";

import { CheckBoxContext } from "./context";

interface CheckBoxRootProps {
	checked: boolean;
	disabled?: boolean;
	onCheckedChange: (checked: boolean) => void;
	children: ReactNode;
}

export const Root = ({
	checked,
	disabled = false,
	onCheckedChange,
	children,
}: CheckBoxRootProps) => {
	const handleClick = () => {
		if (!disabled) {
			onCheckedChange(!checked);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleClick();
		}
	};

	const contextValue = useMemo(
		() => ({ checked, disabled }),
		[checked, disabled],
	);

	return (
		<CheckBoxContext.Provider value={contextValue}>
			<div
				role="checkbox"
				aria-checked={checked}
				aria-disabled={disabled}
				tabIndex={disabled ? -1 : 0}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				className={clsx(
					"ygi:inline-flex ygi:items-center ygi:gap-2 ygi:cursor-pointer ygi:select-none",
					disabled && "ygi:opacity-50 ygi:cursor-not-allowed",
				)}
			>
				{children}
			</div>
		</CheckBoxContext.Provider>
	);
};
