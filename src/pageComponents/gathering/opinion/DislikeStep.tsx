"use client";

import { useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator/StepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button/Button";
import { FoodCategoryButton } from "./FoodCategoryButton";
import {
	FOOD_CATEGORIES,
	NO_CARE_LABEL,
	OPINION_TOTAL_STEPS,
} from "#/constants/gathering/opinion";
import type {
	OpinionForm,
	FoodCategory,
	DislikeStepProps,
} from "#/types/gathering";

export const DislikeStepContent = () => {
	const { control } = useFormContext<OpinionForm>();

	return (
		<div className="ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
				<StepIndicator
					currentStep={2}
					totalSteps={OPINION_TOTAL_STEPS}
				/>
				<StepHeader.Root>
					<StepHeader.Title>
						안 먹고 싶은 음식을 골라주세요
					</StepHeader.Title>
					<StepHeader.Description>
						후보에서 무조건 제외할 수 있어요.
					</StepHeader.Description>
				</StepHeader.Root>
			</div>

			<Controller
				name="dislikedFoods"
				control={control}
				render={({ field }) => {
					const dislikedFoods = field.value || [];
					const isNoCareSelected = dislikedFoods.length === 0;

					const handleFoodToggle = (food: FoodCategory) => {
						const isSelected = dislikedFoods.includes(food);
						field.onChange(
							isSelected
								? dislikedFoods.filter((f) => f !== food)
								: [...dislikedFoods, food],
						);
					};

					const handleNoCareToggle = () => {
						field.onChange([]);
					};

					return (
						<div className="ygi:flex ygi:flex-wrap ygi:justify-center ygi:gap-3 ygi:px-6 ygi:pt-6 ygi:pb-9">
							{FOOD_CATEGORIES.map((category) => (
								<FoodCategoryButton
									key={category.value}
									selected={dislikedFoods.includes(
										category.value,
									)}
									onClick={() =>
										handleFoodToggle(category.value)
									}
									label={category.label}
								/>
							))}
							<FoodCategoryButton
								variant="noPreference"
								selected={isNoCareSelected}
								onClick={handleNoCareToggle}
								label={NO_CARE_LABEL}
							/>
						</div>
					);
				}}
			/>
		</div>
	);
};

export const DislikeStepFooter = ({
	onNext,
}: Pick<DislikeStepProps, "onNext">) => {
		const handleNext = useCallback(() => {
			onNext();
		}, [onNext]);

		return (
			<Layout.Footer>
				<div className="ygi:px-6">
					<Button variant="primary" width="full" onClick={handleNext}>
						다음
					</Button>
				</div>
			</Layout.Footer>
		);
};
