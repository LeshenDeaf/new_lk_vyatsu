import { FC } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: JSX.Element;
  container?: Element | DocumentFragment | HTMLElement | null;
}

export const Portal: FC<PortalProps> = ({ children, container }) => {
	if (typeof window === 'undefined') {
		return <></>;
	}

	return createPortal(children, container || document.body);
};
