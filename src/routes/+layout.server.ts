import { getAuth } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const session = await getAuth().api.getSession({ headers: request.headers });

	return {
		user: session?.user ?? null
	};
};
