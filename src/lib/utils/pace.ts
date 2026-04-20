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

// Omits the hours segment when the run is under 60 minutes
export function formatDuration(totalSeconds: number): string {
	if (totalSeconds <= 0) return '--:--';
	const h = Math.floor(totalSeconds / 3600);
	const m = Math.floor((totalSeconds % 3600) / 60);
	const s = Math.floor(totalSeconds % 60);
	if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
	return `${m}:${s.toString().padStart(2, '0')}`;
}

// Zone boundaries from CLAUDE.md
export const PACE_ZONES: PaceZone[] = [
	{ name: 'zone1', label: 'Easy / recovery', description: '> 6:30 /km', minSecondsPerKm: 390, maxSecondsPerKm: Infinity },
	{ name: 'zone2', label: 'Aerobic base', description: '5:30 – 6:30 /km', minSecondsPerKm: 330, maxSecondsPerKm: 390 },
	{ name: 'zone3', label: 'Tempo', description: '4:45 – 5:30 /km', minSecondsPerKm: 285, maxSecondsPerKm: 330 },
	{ name: 'zone4', label: 'Threshold', description: '4:15 – 4:45 /km', minSecondsPerKm: 255, maxSecondsPerKm: 285 },
	{ name: 'zone5', label: 'Race / VO2 max', description: '< 4:15 /km', minSecondsPerKm: 0, maxSecondsPerKm: 255 }
];

export function getPaceZone(pacePerKmSeconds: number): PaceZone | null {
	if (pacePerKmSeconds <= 0) return null;
	return (
		PACE_ZONES.find(
			(z) => pacePerKmSeconds > z.minSecondsPerKm && pacePerKmSeconds <= z.maxSecondsPerKm
		) ?? null
	);
}

// Maps pace to 0–100% position on the zone gradient bar.
// Each of the 5 zones occupies an equal 20% segment; left = easy, right = fast.
export function getBarPosition(pacePerKm: number): number | null {
	if (pacePerKm <= 0) return null;
	if (pacePerKm > 390) return Math.max(0, 20 - ((pacePerKm - 390) / 210) * 20); // zone 1: 0–20%
	if (pacePerKm > 330) return 20 + ((390 - pacePerKm) / 60) * 20;               // zone 2: 20–40%
	if (pacePerKm > 285) return 40 + ((330 - pacePerKm) / 45) * 20;               // zone 3: 40–60%
	if (pacePerKm > 255) return 60 + ((285 - pacePerKm) / 30) * 20;               // zone 4: 60–80%
	return Math.min(100, 80 + ((255 - pacePerKm) / 75) * 20);                     // zone 5: 80–100%
}
