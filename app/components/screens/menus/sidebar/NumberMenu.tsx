import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectNavbar } from '../../../../store/reducers/NavbarSlice';
import { NavList } from '../../../../configs/Pages';
import { v4 as uuidv4 } from 'uuid';
import { animated, Spring, config } from 'react-spring';

function NumberMenu() {
	const { categoryIndex, categoriesCount } = useAppSelector(selectNavbar);
	const category = useMemo(() => NavList[categoryIndex], [categoryIndex]);

    console.log('rerendered')

	return (
		<div className="flex flex-col justify-between items-start">
			<div id="number-menu" className="text-white flex items-end h-8">
				{[...Array(categoriesCount)].map((_, index) => (
					<Spring
                        from={{ fontSize: 18, fontWeight: 'normal' }}
						to={{ fontSize: 24, fontWeight: 'bold' }}
						key={uuidv4()}
                        reset={categoryIndex === index}
                        // reverse={categoryIndex !== index && index === prev}
						// config={config.gentle}
					>
						{(styles) => (
							<animated.div
								style={styles}
								className={
									'number-menu-item align-text-bottom cursor-pointer mr-4 last:mr-0 font-lg'
								}
							>
								{index + 1}
							</animated.div>
						)}
					</Spring>
				))}
			</div>
			<div className="left-menu-name font-bold text-white">{category.name}</div>
		</div>
	);
}

export default React.memo(NumberMenu);
