import { is } from '@wp-g2/utils';

export const UNITS = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax'];

export function findUnitMatch({ units = UNITS, value = '' }) {
	const match = units.find((unit) => unit.indexOf(value.toLowerCase()) === 0);
	return match;
}

export function findUnitMatchExact({ units = UNITS, value = '' }) {
	const match = units.find(
		(unit) => unit.toLowerCase() === value.toLowerCase(),
	);
	return match;
}

export const isPotentialUnitValue = (value) => {
	return is.numeric(value) && Number(value) !== 0;
};
