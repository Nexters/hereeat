"use client";

import { useFormContext } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator/StepIndicator";
import { Button } from "#/components/button/Button";
import { Chip } from "#/components/chip";
import { useLocationStepValidation } from "#/hooks/gathering";
import type { CreateMeetingForm, Location } from "#/types/gathering";

interface LocationStepProps {
	onComplete: () => void;
}

export const LocationStep = ({ onComplete }: LocationStepProps) => {
	const { control, setValue, watch } = useFormContext<CreateMeetingForm>();
	const isValid = useLocationStepValidation(control);

	const location = watch("location");

	const handleLocationChange = (loc: Location) => {
		setValue("location", loc === location ? undefined : loc, {
			shouldValidate: true,
		});
	};

	return (
		<section className="ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
				<StepIndicator currentStep={3} totalSteps={3} />
				<h1 className="ygi:heading-22-bd ygi:text-text-primary">
					장소를 선택해 주세요
				</h1>
				<div className="ygi:flex ygi:gap-3">
					<Chip
						selected={location === "hongdae"}
						onClick={() => handleLocationChange("hongdae")}
					>
						홍대입구역
					</Chip>
					<Chip
						selected={location === "gangnam"}
						onClick={() => handleLocationChange("gangnam")}
					>
						강남역
					</Chip>
				</div>
			</div>

			<Layout.Footer>
				<div className="ygi:px-6">
					<Button
						variant="primary"
						width="full"
						disabled={!isValid}
						onClick={onComplete}
					>
						완료
					</Button>
				</div>
			</Layout.Footer>
		</section>
	);
};
