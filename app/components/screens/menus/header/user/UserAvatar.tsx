import React, { memo } from 'react';
import Image from 'next/image';

type Size = {
	height: number;
	width: number;
};

interface Props {
	notifications: number;
	size?: Size;
}

export default memo(function UserAvatar({ notifications, size }: Props) {
	if (!size) {
		size = { height: 64, width: 64 } as Size;
	}

	return (
		<div className="items-center justify-center min-w-[4rem] relative">
			<Image
				className="rounded-full"
				src="/images/user.svg"
				alt="avatar"
				height={size.height}
				width={size.width}
				loading="lazy"
			/>

			{notifications > 0 && (
				<div className="bg-red-600 rounded-full px-2 absolute right-0 top-0 text-white text-sm flex items-center justify-center">
					<div>{notifications}</div>
				</div>
			)}
		</div>
	);
});
