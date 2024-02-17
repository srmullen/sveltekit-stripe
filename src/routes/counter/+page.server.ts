// Types
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const checkoutSuccessString = url.searchParams.get('checkoutSuccess') as string;
	const checkoutSuccess = checkoutSuccessString === 'true';

	return {
		checkoutSuccess
	};
};
