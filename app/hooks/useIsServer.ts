import { useEffect, useState } from 'react';

function useIsServer () {
	const [isServer, setIsServer] = useState(typeof window === 'undefined');

	useEffect(() => {
		if (isServer) setIsServer(false);
	}, [isServer]);

	return isServer;
}

export default useIsServer;
