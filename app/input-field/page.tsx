'use client';

import { type UseFormReturn, useForm } from 'react-hook-form';

import { Button } from '#/components/button';
import { InputField } from '#/components/inputField';

type FormValues = {
	email: string;
	nickname: string;
	search: string;
    birthdate: string;
};

type FormSectionProps = {
	title: string;
	children: React.ReactNode;
};

const FormSection = ({ title, children }: FormSectionProps) => (
	<section className="ygi:flex ygi:flex-col ygi:gap-md">
		<h2 className="ygi:heading-20-bd">{title}</h2>
		{children}
	</section>
);

type FormFieldProps = {
	form: UseFormReturn<FormValues>;
};

const EmailInput = ({ form }: FormFieldProps) => {
	const {
		register,
		setValue,
		formState: { errors },
	} = form;

	return (
		<FormSection title="Email (Required)">
			<InputField
				{...register('email', {
					required: '이메일을 입력해주세요',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: '올바른 이메일 형식이 아닙니다',
					},
				})}
				type="email"
				placeholder="example@email.com"
				helperText="이메일 주소를 입력하세요"
				errorText={errors.email?.message}
				showClearButton
				onClear={() => setValue('email', '')}
			/>
		</FormSection>
	);
};

const NicknameInput = ({ form }: FormFieldProps) => {
	const {
		register,
		setValue,
		formState: { errors },
	} = form;

	return (
		<FormSection title="Nickname (Min 2 chars) (optional)">
			<InputField
				{...register('nickname', {
					minLength: {
						value: 2,
						message: '닉네임은 2자 이상이어야 합니다',
					},
				})}
				placeholder="닉네임을 입력하세요"
				helperText="2자 이상 입력해주세요"
				errorText={errors.nickname?.message}
				showClearButton
				onClear={() => setValue('nickname', '')}
			/>
		</FormSection>
	);
};

const SearchIcon = () => (
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
);

const SearchInput = ({ form }: FormFieldProps) => {
	const { register, setValue } = form;

	return (
		<FormSection title="Search (With Icon) (optional)">
			<InputField
				{...register('search')}
				leftSlot={<SearchIcon />}
				placeholder="검색어를 입력하세요"
				helperText="검색어를 입력하세요"
				showClearButton
				onClear={() => setValue('search', '')}
			/>
		</FormSection>
	);
};

const formatBirthdate = (value: string): string => {
	const numbers = value.replace(/\D/g, '').slice(0, 8);

	if (numbers.length <= 4) {
		return numbers;
	}
	if (numbers.length <= 6) {
		return `${numbers.slice(0, 4)}.${numbers.slice(4)}`;
	}
	return `${numbers.slice(0, 4)}.${numbers.slice(4, 6)}.${numbers.slice(6)}`;
};

const parseBirthdate = (formatted: string): string => {
	return formatted.replace(/\D/g, '');
};

const isLeapYear = (year: number): boolean => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getDaysInMonth = (year: number, month: number): number => {
	const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if (month === 2 && isLeapYear(year)) {
		return 29;
	}

	return daysInMonth[month - 1];
};

const validateBirthdate = (value: string): string | true => {
	if (!value) {
		return true;
	}

	const digits = value.replace(/\D/g, '');

	if (digits.length !== 8) {
		return '생년월일 8자리를 모두 입력해주세요';
	}

	const year = parseInt(digits.slice(0, 4), 10);
	const month = parseInt(digits.slice(4, 6), 10);
	const day = parseInt(digits.slice(6, 8), 10);

	if (month < 1 || month > 12) {
		return '월은 01~12 사이여야 합니다';
	}

	const maxDays = getDaysInMonth(year, month);

	if (day < 1 || day > maxDays) {
		return `${month}월은 01~${maxDays.toString().padStart(2, '0')}일 사이여야 합니다`;
	}

	return true;
};

const BirthdateInput = ({ form }: FormFieldProps) => {
	const {
		register,
		setValue,
		watch,
		formState: { errors },
	} = form;

	const birthdateValue = watch('birthdate');

	return (
		<FormSection title="Birthdate (8 digits)">
			<InputField
				{...register('birthdate', {
					required: '생년월일을 입력해주세요',
					validate: validateBirthdate,
				})}
				value={formatBirthdate(birthdateValue)}
				onChange={(e) => {
					const raw = parseBirthdate(e.target.value);
					setValue('birthdate', raw, { shouldValidate: true });
				}}
				inputMode="numeric"
				placeholder="yyyy.mm.dd"
				helperText="생년월일 8자리를 입력하세요"
				errorText={errors.birthdate?.message}
				showClearButton
				onClear={() => setValue('birthdate', '', { shouldValidate: true })}
			/>
		</FormSection>
	);
};

const DisabledInput = () => (
	<FormSection title="Disabled">
		<InputField
			disabled
			placeholder="수정할 수 없습니다"
			helperText="비활성화된 입력 필드입니다"
		/>
	</FormSection>
);

export default function InputFieldPage() {
	const form = useForm<FormValues>({
		defaultValues: {
			email: '',
			nickname: '',
			search: '',
			birthdate: '',
		},
	});

	const { handleSubmit, watch } = form;

	const onSubmit = (data: FormValues) => {
		console.log('Form submitted:', data);
		alert(JSON.stringify(data, null, 2));
	};

	return (
		<div className="ygi:p-xl ygi:flex ygi:flex-col ygi:gap-xl">
			<h1 className="ygi:display-28-bd">InputField</h1>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="ygi:flex ygi:flex-col ygi:gap-xl"
			>
				<EmailInput form={form} />
                <BirthdateInput form={form} />
				<NicknameInput form={form} />
				<SearchInput form={form} />
				<DisabledInput />

				<Button type="submit">제출하기</Button>

				<pre className="ygi:p-md ygi:bg-palette-gray-50 ygi:rounded-sm ygi:body-14-rg ygi:text-palette-gray-600">
					{JSON.stringify(watch(), null, 2)}
				</pre>
			</form>
		</div>
	);
}
