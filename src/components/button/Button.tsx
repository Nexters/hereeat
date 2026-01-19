import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { twJoin } from "tailwind-merge";

const buttonVariants = cva(
	[
		"ygi:inline-flex ygi:items-center ygi:justify-center",
		"ygi:text-center ygi:whitespace-nowrap",
		"ygi:px-xl ygi:py-sm",
		"ygi:cursor-pointer ygi:transition-colors",
		"ygi:disabled:cursor-not-allowed ygi:disabled:opacity-50",
		"ygi:heading-18-bd",
	],
	{
		variants: {
			variant: {
				primary: [
					"ygi:bg-palette-gray-900 ygi:text-palette-common-white",
					"ygi:hover:bg-palette-gray-800",
					"ygi:disabled:hover:bg-palette-gray-900",
				],
				secondary: [
					"ygi:bg-palette-primary-500 ygi:text-palette-common-white",
					"ygi:hover:bg-palette-primary-700",
					"ygi:disabled:hover:bg-palette-primary-500",
				],
				tertiary: [
					"ygi:bg-palette-gray-100 ygi:text-palette-gray-500",
					"ygi:hover:bg-palette-gray-200 ygi:hover:text-palette-gray-600",
					"ygi:disabled:hover:bg-palette-gray-100 ygi:disabled:hover:text-palette-gray-500",
				],
			},
			shape: {
				rounded: "ygi:rounded-md",
				pill: "ygi:rounded-full",
			},
		},
		defaultVariants: {
			variant: "primary",
			shape: "rounded",
		},
	},
);

export type ButtonProps = ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

export const Button = ({
	variant = "primary",
	shape = "rounded",
	disabled = false,
	children,
	asChild = false,
	className,
	ref,
	...props
}: ButtonProps) => {
	const Component = asChild ? Slot : "button";

	return (
		<Component
			ref={ref}
			disabled={disabled}
			aria-disabled={disabled}
			className={twJoin(
				buttonVariants({
					variant,
					shape,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
};
