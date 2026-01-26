"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Layout } from "#/components/layout";

export const LandingPage = () => {
	const router = useRouter();

	const handleStartClick = () => {
		router.push("/gathering/create");
	};

	return (
		<Layout.Root>
			<div className="ygi:relative ygi:min-h-screen-dynamic ygi:w-full ygi:bg-button-secondary ygi:overflow-hidden">
				{/* Header Section */}
				<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-5 ygi:pt-20 ygi:px-6">
					<p className="ygi:heading-22-bd ygi:text-text-inverse ygi:text-center">
						다인원을 위한 맛집 서비스
					</p>
					<Image
						src="/images/landing/logo.svg"
						alt="요기잇"
						width={184}
						height={58}
						priority
					/>
				</div>

				{/* Illustration Section */}
				<div className="ygi:relative ygi:h-[328px] ygi:mt-5">
					{/* Green Sushi Card */}
					<div className="ygi:absolute ygi:left-[-40px] ygi:top-[38px]">
						<div className="ygi:relative ygi:w-[251px] ygi:h-[251px] ygi:flex ygi:items-center ygi:justify-center">
							<div className="ygi:w-[178px] ygi:h-[178px] ygi:bg-palette-green-700 ygi:rounded-lg ygi:border-[6px] ygi:border-palette-common-white ygi:rotate-45" />
							<div className="ygi:absolute ygi:inset-0 ygi:flex ygi:items-center ygi:justify-center">
								<Image
									src="/images/landing/sushi-1.svg"
									alt=""
									width={84}
									height={61}
									className="ygi:absolute ygi:left-[61px] ygi:top-[85px]"
								/>
								<Image
									src="/images/landing/sushi-2.svg"
									alt=""
									width={93}
									height={68}
									className="ygi:absolute ygi:left-[97px] ygi:top-[100px]"
								/>
							</div>
						</div>
					</div>

					{/* Blue Soup Card */}
					<div className="ygi:absolute ygi:right-[-40px] ygi:top-0">
						<div className="ygi:relative ygi:w-[242px] ygi:h-[250px] ygi:flex ygi:items-center ygi:justify-center">
							<Image
								src="/images/landing/card-blue.svg"
								alt=""
								width={195}
								height={207}
								className="ygi:rotate-[15deg]"
							/>
							<div className="ygi:absolute ygi:inset-0 ygi:flex ygi:items-center ygi:justify-center">
								<Image
									src="/images/landing/soup.svg"
									alt=""
									width={134}
									height={145}
									className="ygi:rotate-[15deg]"
								/>
							</div>
						</div>
						{/* Hand icons */}
						<div className="ygi:absolute ygi:right-[30px] ygi:bottom-[-10px]">
							<Image
								src="/images/landing/hand-1.svg"
								alt=""
								width={82}
								height={67}
								className="ygi:rotate-[2.7deg]"
							/>
						</div>
						<div className="ygi:absolute ygi:right-0 ygi:bottom-[-40px]">
							<Image
								src="/images/landing/hand-2.svg"
								alt=""
								width={58}
								height={58}
								className="ygi:rotate-[2.7deg]"
							/>
						</div>
					</div>

					{/* Heart Icons */}
					<Image
						src="/images/landing/heart-4.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:left-[185px] ygi:top-0"
					/>
					<Image
						src="/images/landing/heart-1.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:left-[221px] ygi:top-[41px] ygi:rotate-[-22deg]"
					/>
					<Image
						src="/images/landing/heart-3.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:left-[259px] ygi:top-[27px] ygi:rotate-[14deg]"
					/>
					<Image
						src="/images/landing/heart-2.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:left-[97px] ygi:top-[197px] ygi:rotate-[30deg]"
					/>
				</div>

				{/* CTA Button */}
				<div className="ygi:absolute ygi:bottom-[60px] ygi:left-0 ygi:right-0 ygi:flex ygi:justify-center ygi:px-6">
					<button
						type="button"
						onClick={handleStartClick}
						className="ygi:inline-flex ygi:items-center ygi:justify-center ygi:px-6 ygi:py-3 ygi:bg-surface-white ygi:text-text-primary ygi:heading-18-bd ygi:rounded-full ygi:cursor-pointer ygi:transition-colors ygi:hover:bg-palette-gray-50"
					>
						모임 링크 생성 시작
					</button>
				</div>
			</div>
		</Layout.Root>
	);
};
