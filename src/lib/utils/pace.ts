import type { PaceResult, PaceZone } from '$lib/types';

const KM_PER_MILE = 1.60934;

export function milesToKm(miles: number): number {
	return miles * KM_PER_MILE;
}

export function kmToMiles(km: number): number {
	return km / KM_PER_MILE;
}

export function calculatePace(distanceKm: number, totalSeconds: number): PaceResult {
	if (distanceKm <= 0 || totalSeconds <= 0) {
		return { pacePerKm: 0, pacePerMile: 0, totalSeconds };
	}
	const pacePerKm = totalSeconds / distanceKm;
	const pacePerMile = pacePerKm * KM_PER_MILE;
	return { pacePerKm, pacePerMile, totalSeconds };
}

export function formatPace(seconds: number): string {
	if (seconds <= 0) return '--:--';
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatDuration(totalSeconds: number): string {
	if (totalSeconds <= 0) return '--:--:--';
	const h = Math.floor(totalSeconds / 3600);
	const m = Math.floor((totalSeconds % 3600) / 60);
	const s = Math.floor(totalSeconds % 60);
	return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Zone boundaries from CLAUDE.md
export const PACE_ZONES: PaceZone[] = [
	{ name: 'zone1', label: 'Easy / Recovery', description: '> 6:30 /km', minSecondsPerKm: 390, maxSecondsPerKm: Infinity },
	{ name: 'zone2', label: 'Aerobic Base', description: '5:30 – 6:30 /km', minSecondsPerKm: 330, maxSecondsPerKm: 390 },
	{ name: 'zone3', label: 'Tempo', description: '4:45 – 5:30 /km', minSecondsPerKm: 285, maxSecondsPerKm: 330 },
	{ name: 'zone4', label: 'Threshold', description: '4:15 – 4:45 /km', minSecondsPerKm: 255, maxSecondsPerKm: 285 },
	{ name: 'zone5', label: 'Race / VO2 Max', description: '< 4:15 /km', minSecondsPerKm: 0, maxSecondsPerKm: 255 }
];

export function getPaceZone(pacePerKmSeconds: number): PaceZone | null {
	if (pacePerKmSeconds <= 0) return null;
	return (
		PACE_ZONES.find(
			(z) => pacePerKmSeconds > z.minSecondsPerKm && pacePerKmSeconds <= z.maxSecondsPerKm
		) ?? null
	);
}
