import { json, error } from '@sveltejs/kit';
import { getAuth } from '$lib/server/auth';
import { getDb } from '$lib/server/db';
import { user as userTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request }) => {
	const session = await getAuth().api.getSession({ headers: request.headers });
	if (!session?.user) {
		error(401, 'Not authenticated');
	}

	const body = await request.json();
	const unitPreference = body.unitPreference;

	if (unitPreference !== 'km' && unitPreference !== 'miles') {
		error(400, 'Invalid unit preference');
	}

	await getDb()
		.update(userTable)
		.set({ unitPreference, updatedAt: new Date() })
		.where(eq(userTable.id, session.user.id));

	return json({ ok: true });
};
