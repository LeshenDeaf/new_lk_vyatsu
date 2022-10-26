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
						<div className={classes.closeWrapper}>
							<div
								className={classes.close}
								onClick={() => setIsVisible(false)}
							>
								<Image
									src="/images/close.svg"
									alt="close"
									draggable="false"
									width="40"
									height="40"
									className="top-1/2"
								/>
							</div>
						</div>
						<div ref={ref} className={classes.modal}>
							<div className={classes.header}>
								<p>{header}</p>
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
