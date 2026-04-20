export type DistanceUnit = 'km' | 'miles';

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
