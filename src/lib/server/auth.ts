import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { env } from '$env/dynamic/private';
import { getDb } from './db';
import * as schema from './schema';

function createAuth() {
	return betterAuth({
		database: drizzleAdapter(getDb(), {
			provider: 'pg',
			schema
		}),
		emailAndPassword: {
			enabled: true
		},
		socialProviders: {
			google: {
				clientId: env.GOOGLE_CLIENT_ID!,
				clientSecret: env.GOOGLE_CLIENT_SECRET!
			}
		}
	});
}

type Auth = ReturnType<typeof createAuth>;
let _auth: Auth;

export function getAuth() {
	return (_auth ??= createAuth());
}
