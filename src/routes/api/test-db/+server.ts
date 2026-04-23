import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { user } from '$lib/server/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const allUsers = await getDb().select().from(user);
	return json({ success: true, users: allUsers });
};
