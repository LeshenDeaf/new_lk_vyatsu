import { useDispatch } from 'react-redux';

export type reducerInfo = {reducerPath: string, tags: Array<string>}

export type useInvalidateCallback = (reducerInfo: reducerInfo) => {
	type: string;
	payload: string[];
};

export const useInvalidate = (): useInvalidateCallback => {
	const dispatch = useDispatch();

	return ({reducerPath, tags}: reducerInfo) =>
		dispatch({ type: `${reducerPath}/invalidateTags`, payload: tags });
};
