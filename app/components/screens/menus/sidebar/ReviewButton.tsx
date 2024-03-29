import React, { FC } from 'react';

const ReviewButton: FC<{ isMobile: boolean; text: string }> = ({
	isMobile,
	text,
}) => {
	return isMobile ? (
		<div className="flex sm:hidden fixed h-28 w-full bottom-0 justify-center items-center">
			<button className="border-2 border-white rounded-xl h-[50px] w-[240px] flex justify-center items-center  drop-shadow-button">
				<div className="text-[14px] text-white">{text}</div>
			</button>
		</div>
	) : (
		<div className="hidden sm:flex fixed h-[10%] w-72 bottom-0 justify-center items-center ">
			<button className="border-2 border-vyatsu-blue rounded-xl h-[50px] w-[240px] flex justify-center items-center drop-shadow-button">
				<div className="text-[14px] text-vyatsu-blue">{text}</div>
			</button>
		</div>
	);
};

export default React.memo(ReviewButton);
