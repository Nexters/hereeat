"use client";

import { StepIndicator } from "#/components/stepIndicator/StepIndicator";

interface DateStepProps {
	onNext: () => void;
}

// Placeholder component (will be implemented in feature/gathering-create-step2)
export function DateStep({ onNext }: DateStepProps) {
	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-xl">
			<StepIndicator currentStep={2} totalSteps={3} />
			<h1 className="ygi:heading-22-bd ygi:text-text-primary ygi:px-xl">
				약속 날짜를 입력해 주세요
			</h1>
			<p className="ygi:px-xl ygi:text-text-secondary">
				(Step 2 구현 예정 - feature/gathering-create-step2)
			</p>
		</div>
	);
}
