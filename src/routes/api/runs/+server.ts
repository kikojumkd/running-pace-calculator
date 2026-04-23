import { json, error } from '@sveltejs/kit';
import { getAuth } from '$lib/server/auth';
import { getDb } from '$lib/server/db';
import { run as runTable } from '$lib/server/schema';
import { eq, desc } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
	const session = await getAuth().api.getSession({ headers: request.headers });
	if (!session?.user) {
		error(401, 'Not authenticated');
	}

	const runs = await getDb()
		.select({
			id: runTable.id,
			distanceKm: runTable.distanceKm,
			durationSeconds: runTable.durationSeconds,
			pacePerKm: runTable.pacePerKm,
			pacePerMile: runTable.pacePerMile,
			label: runTable.label,
			createdAt: runTable.createdAt
		})
		.from(runTable)
		.where(eq(runTable.userId, session.user.id))
		.orderBy(desc(runTable.createdAt));

	return json(runs);
};

export const POST: RequestHandler = async ({ request }) => {
	const session = await getAuth().api.getSession({ headers: request.headers });
	if (!session?.user) {
		error(401, 'Not authenticated');
	}

	const body = await request.json();
	const { distanceKm, durationSeconds, pacePerKm, pacePerMile, label } = body;

	if (typeof distanceKm !== 'number' || distanceKm <= 0) {
		error(400, 'Invalid distance');
	}
	if (typeof durationSeconds !== 'number' || durationSeconds <= 0) {
		error(400, 'Invalid duration');
	}
	if (typeof pacePerKm !== 'number' || pacePerKm <= 0) {
		error(400, 'Invalid pace per km');
	}
	if (typeof pacePerMile !== 'number' || pacePerMile <= 0) {
		error(400, 'Invalid pace per mile');
	}

	const [inserted] = await getDb()
		.insert(runTable)
		.values({
			userId: session.user.id,
			distanceKm: distanceKm.toString(),
			durationSeconds: Math.round(durationSeconds),
			pacePerKm: Math.round(pacePerKm),
			pacePerMile: Math.round(pacePerMile),
			label: typeof label === 'string' && label.trim() ? label.trim() : null
		})
		.returning();

	return json(inserted, { status: 201 });
};
