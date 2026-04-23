export type DistanceUnit = 'km' | 'miles';

export interface Run {
	id: string;
	distanceKm: string;
	durationSeconds: number;
	pacePerKm: number;
	pacePerMile: number;
	label: string | null;
	createdAt: string;
}

export interface PaceResult {
	pacePerKm: number;
	pacePerMile: number;
	totalSeconds: number;
}

export interface PaceZone {
	name: string;
	label: string;
	description: string;
	minSecondsPerKm: number;
	maxSecondsPerKm: number;
}
