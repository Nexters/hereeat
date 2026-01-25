"use client";

import clsx from "clsx";

import { Chip } from "#/components/chip";
import {
	FOOD_CATEGORIES,
	RANK_LABELS,
	NO_CARE_LABEL,
	type RankKey,
} from "#/constants/gathering/opinion";
import type { FoodCategory } from "#/types/gathering";

interface RankSectionProps {
	rank: RankKey;
	selectedMenu?: FoodCategory;
	isNoneSelected: boolean;
	isDisabled: boolean;
	onMenuSelect: (menu: FoodCategory) => void;
}

export const RankSection = ({
	rank,
	selectedMenu,
	isNoneSelected,
	isDisabled,
	onMenuSelect,
}: RankSectionProps) => {
	return (
			<div className="ygi:flex ygi:flex-col ygi:gap-xl">
				<div className="ygi:flex ygi:items-center ygi:justify-between">
					<h2 className="ygi:heading-18-bd ygi:text-text-primary">
						{RANK_LABELS[rank]}
					</h2>
				</div>
				<div
					className={clsx(
						"ygi:flex ygi:flex-wrap ygi:gap-3",
						isDisabled && "ygi:opacity-40",
					)}
				>
					{FOOD_CATEGORIES.map((category) => (
						<Chip
							key={category.value}
							selected={selectedMenu === category.value}
							disabled={isDisabled}
							onClick={() => onMenuSelect(category.value)}
						>
							{category.label}
						</Chip>
					))}
					<Chip
						selected={isNoneSelected}
						disabled={isDisabled}
						onClick={() => onMenuSelect("none")}
					>
						{NO_CARE_LABEL}
					</Chip>
		</div>
	</div>
	);
};
