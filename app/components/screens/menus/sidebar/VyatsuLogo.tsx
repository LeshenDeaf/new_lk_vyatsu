import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
	closeSidebar: () => void;
}

export default memo(function VyatsuLogo({ closeSidebar }: Props) {
	return (
		<div className="h-20 sm:h-36 px-7 sm:px-0 flex justify-between sm:justify-center items-center sm:border-b border-vyatsu-darkblue">
			<Link href={process.env.APP_URL as string}>
				<div className="cursor-pointer flex flex-row items-center justify-evenly">
					<Image
						className="h-10 sm:h-14"
						src="/images/logo.svg"
						alt="logo"
						draggable="false"
						width="64"
						height="64"
					/>
					<div className="ml-3 flex flex-col text-white font-bold leading-4 sm:leading-5 text-sm sm:text-base">
						<div>Вятский</div>
						<div>Государственный</div>
						<div>Университет</div>
					</div>
				</div>
			</Link>

			<div
				className="cursor-pointer left-menu-close sm:hidden w-10 h-10 flex justify-center items-center"
				onClick={closeSidebar}
			>
				<Image
					src="/images/close.svg"
					alt="close"
					draggable="false"
					width="16"
					height="16"
				/>
			</div>
		</div>
	);
});
