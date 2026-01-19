'use client';

import { InputField } from '#/components/inputField';

export default function InputFieldPage() {
	return (
		<div className="ygi:p-xl ygi:flex ygi:flex-col ygi:gap-xl">
			<h1 className="ygi:display-28-bd">InputField</h1>

			<section className="ygi:flex ygi:flex-col ygi:gap-md">
				<h2 className="ygi:heading-20-bd">Default</h2>
				<InputField placeholder="Placeholder" helperText="Helper text" />
			</section>

			<section className="ygi:flex ygi:flex-col ygi:gap-md">
				<h2 className="ygi:heading-20-bd">With Search Icon</h2>
				<InputField
					leftSlot={
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
								stroke="#6B7280"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					}
					placeholder="Search"
					helperText="Helper text"
				/>
			</section>

			<section className="ygi:flex ygi:flex-col ygi:gap-md">
				<h2 className="ygi:heading-20-bd">With Clear Button</h2>
				<InputField
					showClearButton
					placeholder="Type something..."
					helperText="Helper text"
				/>
			</section>

			<section className="ygi:flex ygi:flex-col ygi:gap-md">
				<h2 className="ygi:heading-20-bd">Error State</h2>
				<InputField
					isError
					placeholder="Invalid input"
					errorText="This field is required"
				/>
			</section>

			<section className="ygi:flex ygi:flex-col ygi:gap-md">
				<h2 className="ygi:heading-20-bd">Disabled</h2>
				<InputField disabled placeholder="Disabled input" helperText="Helper text" />
			</section>
		</div>
	);
}
