import type { Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { nanoid } from 'nanoid';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	event.locals.userid = cookies.userid || nanoid();

	const response = await resolve(event);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${event.locals.userid}; Path=/; HttpOnly`;
	}

	return response;
};
