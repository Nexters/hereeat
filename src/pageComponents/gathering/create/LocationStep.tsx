"use client";

import { StepIndicator } from "#/components/stepIndicator/StepIndicator";

interface LocationStepProps {
	onComplete: () => void;
}

// Placeholder component (will be implemented in feature/gathering-create-step3)
export function LocationStep({ onComplete }: LocationStepProps) {
	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-xl">
			<StepIndicator currentStep={3} totalSteps={3} />
			<h1 className="ygi:px-xl ygi:heading-22-bd ygi:text-text-primary">
				장소를 선택해 주세요
			</h1>
			<p className="ygi:px-xl ygi:text-text-secondary">
				(Step 3 구현 예정 - feature/gathering-create-step3)
			</p>
		</div>
	);
}
