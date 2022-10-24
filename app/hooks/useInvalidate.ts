import { useDispatch } from 'react-redux';

export const useInvalidate = () => {
	const dispatch = useDispatch();

	return (reducerPath: string, tags: Array<string>) =>
		dispatch({ type: `${reducerPath}/invalidateTags`, payload: tags });
};
