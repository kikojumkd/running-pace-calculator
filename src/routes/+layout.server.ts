import { getAuth } from '$lib/server/auth';
import { getDb } from '$lib/server/db';
import { user as userTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';
import type { DistanceUnit } from '$lib/types';

export const load: LayoutServerLoad = async ({ request }) => {
	const session = await getAuth().api.getSession({ headers: request.headers });

	let unitPreference: DistanceUnit = 'km';
	if (session?.user) {
		const row = await getDb()
			.select({ unitPreference: userTable.unitPreference })
			.from(userTable)
			.where(eq(userTable.id, session.user.id))
			.then((rows) => rows[0]);
		if (row?.unitPreference === 'miles') {
			unitPreference = 'miles';
		}
	}

	return {
		user: session?.user ?? null,
		unitPreference
	};
};
