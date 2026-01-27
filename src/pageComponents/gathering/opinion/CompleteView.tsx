"use client";

import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { twJoin } from "tailwind-merge";
import { FoodCategoryCarousel } from "./FoodCategoryCarousel";

export const CompleteView = () => {
	const title = "메뉴 선택이 끝났어요!";
	const description = "추천 결과를 확인해 보세요";

	return (
		<Layout.Content background="gray">
			<div
				className={twJoin(
					"ygi:flex ygi:flex-col",
					"ygi:h-full ygi:pt-3",
				)}
			>
				<div className="ygi:px-6">
					<StepHeader.Root>
						<StepHeader.Title>{title}</StepHeader.Title>
						<StepHeader.Description>
							{description}
						</StepHeader.Description>
					</StepHeader.Root>
				</div>

				<div className="ygi:mt-9 ygi:w-full">
					<FoodCategoryCarousel />
				</div>
			</div>
		</Layout.Content>
	);
};
