import { FC, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NavList } from '../../../../configs/Pages';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
	selectNavbar,
	setNavbarIndex,
} from '../../../../store/reducers/NavbarSlice';
import Number from './Number';

const NumberMenu: FC = () => {
	const dispatch = useAppDispatch();
	const { categoryIndex, prevCategory, categoriesCount } = useAppSelector(selectNavbar);
	const category = useMemo(() => NavList[categoryIndex], [categoryIndex]);
	const numbers = useMemo(() => [...Array(categoriesCount)], [categoriesCount]);

	const changeCategory = useCallback(
		(index: number) => {
			dispatch(setNavbarIndex(index));
		},
		[dispatch]
	);

	console.log('rerendered');

	return (
		<div className="flex flex-col justify-between items-start">
			<div id="number-menu" className="text-white flex items-end h-8">
				{numbers.map((_, index) => (
					<Number
						isSelected={categoryIndex === index}
						isPrev={prevCategory === index}
						number={index + 1}
						onClick={() => changeCategory(index)}
						key={`${categoryIndex}${index}`}
					/>
				))}
			</div>
			<div className="left-menu-name font-bold text-white">{category.name}</div>
		</div>
	);
};

export default NumberMenu;
