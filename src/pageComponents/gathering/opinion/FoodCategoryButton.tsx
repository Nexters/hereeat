"use client";

import { motion } from "motion/react";
import { XIcon } from "#/icons/xIcon";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence } from "motion/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twJoin } from "tailwind-merge";

const foodCategoryButtonVariants = cva(
	[
		"ygi:flex ygi:flex-col ygi:items-center ygi:justify-center",
		"ygi:size-[156px] ygi:rounded-full",
		"ygi:gap-1 ygi:p-6",
		"ygi:cursor-pointer ygi:transition",
		"ygi:border ygi:border-solid",
	],
	{
		variants: {
			variant: {
				default: [],
				noPreference: [],
			},
			selected: {
				false: [
					"ygi:bg-surface-lightgray-50",
					"ygi:border-transparent",
				],
				true: [],
			},
		},
		compoundVariants: [
			{
				variant: "default",
				selected: true,
				class: ["ygi:bg-surface-primary", "ygi:border-border-primary"],
			},
			{
				variant: "noPreference",
				selected: true,
				class: [
					"ygi:bg-surface-secondary",
					"ygi:border-border-secondary",
				],
			},
		],
		defaultVariants: {
			variant: "default",
			selected: false,
		},
	},
);

export type FoodCategoryButtonProps = Omit<
	ComponentPropsWithoutRef<"button">,
	"className"
> &
	VariantProps<typeof foodCategoryButtonVariants> & {
		icon?: ReactNode;
		label: string;
	};

export const FoodCategoryButton = ({
	variant,
	selected,
	icon,
	label,
	...props
}: FoodCategoryButtonProps) => {
	return (
		<button
			aria-pressed={selected ?? false}
			className={foodCategoryButtonVariants({ variant, selected })}
			{...props}
		>
			<div className="ygi:relative ygi:size-20">
				{icon}
				<AnimatePresence>
					{selected && variant !== "noPreference" && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.2, ease: "easeInOut" }}
							className="ygi:absolute ygi:top-0 ygi:left-0 ygi:flex ygi:size-20 ygi:items-center ygi:justify-center"
						>
							<XIcon
								size={80}
								className="ygi:stroke-border-primary-opacity"
								strokeWidth={8}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<span
				className={twJoin(
					"ygi:heading-18-bd ygi:text-center",
					selected
						? "ygi:text-text-primary"
						: "ygi:text-text-secondary",
				)}
			>
				{label}
			</span>
		</button>
	);
};
