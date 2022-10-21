import React, { FC, memo } from 'react';
import Image from 'next/image';

import en from '../../../../../lang/en/header.json';
import ru from '../../../../../lang/ru/header.json';

import { useRouter } from 'next/router';

const HeaderSearch: FC = memo(function HeaderSearch() {
	const { locale } = useRouter();
	const lang = locale === 'en' ? en : ru;
	
	return (
		<div className="px-4 sm:px-10 flex flex-col justify-center w-full sm:w-3/4 md:w-3/4 xl:w-2/3 2xl:w-3/4">
			<div className="w-full flex border-b px-3">
				<input
					className="w-full border-0 outline-0 leading-10"
					placeholder={lang.search}
				/>
				<div className="cursor-pointer flex items-center justify-center w-6">
					<Image
						src="/images/search.svg"
						alt="search"
						draggable="false"
						height="16"
						width="18"
					/>
				</div>
			</div>
			<div className="relative flex items-center mt-3">
				<div className="left-arrow hidden justify-start absolute h-full w-10 bg-gradient-to-l from-[rgba(255,255,255,0)] to-[#ffffff]">
					<Image
						src="/images/arrow_down.svg"
						alt="left-arrow"
						draggable="false"
						width="64"
						height="64"
					/>
				</div>
				<div className="right-arrow hidden justify-end absolute right-0 h-full w-10 bg-gradient-to-r from-[rgba(255,255,255,0)] to-[#ffffff]">
					<img
						src="/images/arrow_down.svg"
						alt="right-arrow"
						draggable="false"
					/>
				</div>
				<div
					id="favorite-pages"
					className="flex overflow-auto scrollbar-hide whitespace-nowrap"
				></div>
			</div>
		</div>
	);
});

export default HeaderSearch;
