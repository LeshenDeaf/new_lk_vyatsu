import React, { FC, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
	selectNavbar,
	setNavbarIndex,
} from '../../../../store/reducers/NavbarSlice';
import { NavList } from '../../../../configs/Pages';
import Link from 'next/link';
import { Transition, animated } from 'react-spring';

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

		if (categoryIndex > categoriesCount) {
			setArrowsVisible((prev) => ({ ...prev, right: false }));
		} else {
			setArrowsVisible((prev) => ({ ...prev, right: true }));
		}
	}, [categoryIndex, categoriesCount]);

	return (
		<>
			<div className="w-full px-[20px] h-16 border-b border-vyatsu-darkblue justify-between items-center text-white flex">
				<div
					id="left-menu-left-arrow"
					className="cursor-pointer w-6 flex justify-center"
					onClick={decrement}
				>
					<Transition
						items={arrowsVisible.left}
						from={{ transform: 'translateX(-100%)', opacity: 0 }}
						enter={{ transform: 'translateX(0%)', opacity: 1 }}
						leave={{ transform: 'translateX(-100%)', opacity: 0 }}
						reverse={arrowsVisible.left}
					>
						{(styles, item) =>
							item && (
								<animated.div style={styles}>
									<Image
										src="/images/arrow_left.svg"
										alt="left"
										draggable="false"
										width="16"
										height="16"
									/>
								</animated.div>
							)
						}
					</Transition>
				</div>
				<div className="flex font-bold">
					<span id="left-menu-number-top" className="mr-1">
						{categoryIndex + 1}.{' '}
					</span>
					<div className="left-menu-name">{category.name}</div>
				</div>
				<div
					id="left-menu-right-arrow"
					className="cursor-pointer w-6 flex justify-center"
					onClick={increment}
				>
					<Transition
						items={arrowsVisible.right}
						from={{ transform: 'translateX(100%)', opacity: 0 }}
						enter={{ transform: 'translateX(0%)', opacity: 1 }}
						leave={{ transform: 'translateX(100%)', opacity: 0 }}
						reverse={arrowsVisible.right}
					>
						{(styles, item) =>
							item && (
								<animated.div style={styles}>
									<Image
										className="rotate-180"
										src="/images/arrow_left.svg"
										alt="right"
										draggable="false"
										width="16"
										height="16"
									/>
								</animated.div>
							)
						}
					</Transition>
				</div>
			</div>
			<div
				id="left-menu-items"
				className="overflow-auto left-menu-cont-items scrollbar-thin scrollbar-color-main"
			>
				{category.pages.map((e) => (
					<Link href={e.link} key={e.link} passHref>
						<a
							draggable="false"
							className="w-full h-16 px-5 border-t first:border-t-0  border-vyatsu-darkblue flex justify-start items-center text-white text-[14px] sm:text-base cursor-pointer "
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
