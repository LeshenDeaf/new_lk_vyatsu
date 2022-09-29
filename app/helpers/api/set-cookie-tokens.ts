import { NextApiResponse, NextPageContext } from 'next';
import { destroyCookie, setCookie } from 'nookies';

export function setCookieTokens(
	res: NextApiResponse<any> | NextPageContext,
	accessToken: string,
	refreshToken: string
): void {
	setCookie({ res }, 'vyatsu_a_token', accessToken, {
		maxAge: 24 * 60 * 60,
		path: '/',
		httpOnly: true,
	});
	setCookie({ res }, 'vyatsu_r_token', refreshToken, {
		maxAge: 30 * 24 * 60 * 60,
		path: '/',
		httpOnly: true,
	});
}

export function unsetCookieTokens(
	res: NextApiResponse<any> | NextPageContext
): void {
	destroyCookie({ res }, 'vyatsu_r_token', { path: '/' });
	destroyCookie({ res }, 'vyatsu_a_token', { path: '/' });
}
