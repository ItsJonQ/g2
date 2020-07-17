import memize from 'memize';
import uniq from 'uniq';

import { css } from './css';
import { cx } from './cx';
import { styles as systemStyles } from './styles';

const breakpoints = {
	lg: '64em',
	md: '56em',
	sm: '40em',
	xs: '39.9999em',
};

function stylesToClassNames(sx = '') {
	const styles = sx
		.trim()
		.split(' ')
		.filter(Boolean)
		.map((style) => {
			let value = systemStyles[style.trim()];
			if (style.includes('@')) {
				const [_style, _bp] = style.trim().split('@');
				const bp = breakpoints[_bp];
				value = systemStyles[_style];

				if (_bp === 'xs') {
					return css`
						@media (max-width: ${bp}) {
							${value}
						}
					`;
				}

				if (bp) {
					return css`
						@media (min-width: ${bp}) {
							${value}
						}
					`;
				}
			}
			return value;
		})
		.filter(Boolean);

	return cx(...uniq(styles));
}

const memoizedStylesToClassNames = memize(stylesToClassNames);

export function fx(...interpolated) {
	const [args] = interpolated;
	const [sx] = args;

	return memoizedStylesToClassNames(sx);
}
