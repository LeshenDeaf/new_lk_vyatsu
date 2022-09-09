import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animated, config, Transition } from 'react-spring';
import { useOnClickOutside } from 'usehooks-ts';
import Image from 'next/image';
import classes from './Modal.module.scss';

interface Props {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading?: boolean;
	header?: string;
	children: React.ReactNode;
}

export default function Modal({
	isVisible,
	setIsVisible,
	isLoading,
	header,
	children,
}: Props) {
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
		if (isVisible) {
			document.body.style.overflow = 'hidden';
			ref.current?.scrollTo(0, 0);
		} else {
			document.body.style.overflow = 'scroll';
		}
	}, [isVisible]);

	return (
		<Transition
			items={isVisible}
			from={{ opacity: 0 }}
			enter={{ opacity: 1 }}
			leave={{ opacity: 0 }}
			reverse={isVisible}
			config={config.stiff}
		>
			{(styles, item) =>
				item && (
					<animated.div className={classes.wrapper} style={styles}>
						<div ref={ref} className={classes.modal}>
							<div className={classes.header}>
								<p>{header}</p>
								<div
									className="flex justify-center align-middle h-[28px] w-[28px] p-1 rounded-full hover:bg-[rgba(255,255,255,.1)] cursor-pointer"
									onClick={() => setIsVisible(false)}
								>
										<Image
											src="/images/close.svg"
											alt="close"
											draggable="false"
											width="18"
											height="18"
											className="m-auto"
											objectFit="contain"
											layout="intrinsic"
										/>
									{/* <img
										className="m-auto h-[18px] w-[18px]"
										src="/images/close.svg"
									/> */}
								</div>
							</div>
							<div className={classes.body}>
								{isLoading ? 'LOADING' : children}
							</div>
						</div>
					</animated.div>
				)
			}
		</Transition>
	);
}
