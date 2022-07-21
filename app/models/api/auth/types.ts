export type LoginRequest = {
	login: string;
	password: string;
};

export type AuthAPIResponse = {
	access_token: string;
	refresh_token: string;
	expires_in: number;
};

export type RefreshRequest = {
	refresh_token: string;
};

export type AuthResponse = {
	token: string;
	isAuth: boolean;
}
