import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

function createDb() {
	const client = postgres(env.DATABASE_URL!, { prepare: false });
	return drizzle(client, { schema });
}

type Db = ReturnType<typeof createDb>;
let _db: Db;

export function getDb() {
	return (_db ??= createDb());
}
