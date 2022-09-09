import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animated, config, Transition } from 'react-spring';
import { useOnClickOutside } from 'usehooks-ts';

interface Props {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading?: boolean;
	children: React.ReactNode;
}

export default function Modal({ isVisible, setIsVisible, isLoading, children }: Props) {
	const ref = useRef<HTMLDivElement | null>(null);
	// const [isVisible, setIsVisible] = useState(false);

	useOnClickOutside(
		ref,
		useCallback(
			(e: MouseEvent) => {
				if (isVisible) {
					setIsVisible(false);
				}
			},
			[isVisible, setIsVisible]
		)
	);

  useEffect(() => {
    if(isVisible){
      document.body.style.overflow = 'hidden';
      ref.current?.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'scroll';
    }  
  }, [isVisible])

	return (
		<Transition
			items={isVisible}
			from={{ opacity: 0,}}
			enter={{ opacity: 1,}}
			leave={{ opacity: 0,}}
			reverse={isVisible}
			config={config.stiff}
		>
			{(styles, item) =>
				item && <animated.div
				className={`fixed top-0 left-0 z-50 w-[100vw] h-[100vh] bg-[rgba(20,20,20,.4)]`}
				style={styles}
			>
				<div ref={ref} className='w-1/2 mx-auto mt-10 p-10 bg-white rounded-lg overflow-scroll h-4/5'>
					{isLoading ? 'LOADING' : children}
				</div>
			</animated.div>
			}
		</Transition>
		
	);
}
