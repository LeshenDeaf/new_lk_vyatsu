import { AuthState, initialState } from '../store/reducers/AuthSlice';
import useNextLocalStorage from './useNextLocalStorage';

type UseUserReturned = ReturnType<typeof useNextLocalStorage<AuthState>>;

export function useUser(): UseUserReturned {
	const [user, setUser] = useNextLocalStorage<AuthState>('user_data', initialState);

	return [user, setUser];
}
