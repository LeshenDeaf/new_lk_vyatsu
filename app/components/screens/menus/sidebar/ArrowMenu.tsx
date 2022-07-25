import React, { FC, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
	selectNavbar,
	setNavbarIndex,
} from '../../../../store/reducers/NavbarSlice';
import { NavList } from '../../../../utils/Pages';
import Link from 'next/link';
import { v4 as uuid4 } from 'uuid';

const ArrowMenu: FC = () => {
	const dispatch = useAppDispatch();
	const { categoryIndex, categoriesCount } = useAppSelector(selectNavbar);
	const category = NavList[categoryIndex];
	const [arrowsVisible, setArrowsVisible] = useState({
		left: categoryIndex === 0,
		right: categoryIndex + 1 >= categoriesCount,
	});

	const increment = useCallback(() => {
		if (categoryIndex + 1 < categoriesCount) {
			dispatch(setNavbarIndex(categoryIndex + 1));
		}
	}, [categoryIndex, categoriesCount, dispatch]);

	const decrement = useCallback(() => {
		if (categoryIndex - 1 >= 0) {
			dispatch(setNavbarIndex(categoryIndex - 1));
		}
	}, [categoryIndex, dispatch]);

	useEffect(() => {
		if (categoryIndex === 0) {
			setArrowsVisible((prev) => ({ ...prev, left: false }));
		} else {
			setArrowsVisible((prev) => ({ ...prev, left: true }));
		}

		if (categoryIndex + 1 >= categoriesCount) {
			setArrowsVisible((prev) => ({ ...prev, right: false }));
		} else {
			setArrowsVisible((prev) => ({ ...prev, right: true }));
		}
	}, [categoryIndex, categoriesCount]);

	return (
		<>
			<div className="w-full h-16 border-b border-vyatsu-darkblue justify-evenly items-center text-white flex">
				<div
					id="left-menu-left-arrow"
					className="cursor-pointer w-6 flex justify-center"
				>
					{arrowsVisible.left && (
						<Image
							onClick={decrement}
							src="/images/arrow_left.svg"
							alt="left"
							draggable="false"
							width="16"
							height="16"
						/>
					)}
				</div>
				<div className="flex font-bold">
					<span id="left-menu-number-top" className="mr-1">{categoryIndex + 1}. </span>
					<div className="left-menu-name">{category.name}</div>
				</div>
				<div
					id="left-menu-right-arrow"
					className="cursor-pointer w-6 flex justify-center"
				>
					{arrowsVisible.right && (
						<Image
							onClick={increment}
							className="rotate-180"
							src="/images/arrow_left.svg"
							alt="right"
							draggable="false"
							width="16"
							height="16"
						/>
					)}
				</div>
			</div>
			<div
				id="left-menu-items"
				className="overflow-auto left-menu-cont-items scrollbar-thin scrollbar-color-main"
			>
				{category.pages.map((e) => (
					<Link href={e.link} key={e.id}>
						<a
							draggable="false"
							className="w-full h-16 px-5 border-t first:border-t-0 border-vyatsu-dark-blue flex justify-start items-center text-white text-[14px] sm:text-base cursor-pointer "
						>
							{e.name}
						</a>
					</Link>
				))}
			</div>
		</>
	);
};

export default ArrowMenu;
