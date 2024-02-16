
import type { Handle } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const handle: Handle = async ({ event, resolve }) => {


	let userId;

	// Look for the userId cookie
	const userIdCookieValue = event.cookies.get('userId');

	// If there's no cookie, create a new userId and set the cookie
	if (userIdCookieValue === null || userIdCookieValue === undefined) {
		 userId = nanoid();
		 event.cookies.set('userId', userId, { path: "/" });
	}

	const response = await resolve(event);

	return response;
};