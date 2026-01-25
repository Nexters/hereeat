import type { ReactNode } from "react";

type LayoutBackground = "white" | "gray";

const BACKGROUND_CLASSES: Record<LayoutBackground, string> = {
	white: "ygi:bg-bg-white",
	gray: "ygi:bg-bg-gray",
};

interface ContentProps {
	children: ReactNode;
	background?: LayoutBackground;
}

export const Content = ({ children, background = "white" }: ContentProps) => {
	return (
		<main
			className={`ygi:relative ygi:h-dvh ygi:overflow-x-hidden ygi:overflow-y-auto ygi:pt-layout-header-height ygi:pb-layout-footer-height ${BACKGROUND_CLASSES[background]}`}
		>
			{children}
		</main>
	);
};
