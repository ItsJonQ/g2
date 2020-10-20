import { isFirefox } from '@wp-g2/utils';
import React from 'react';

export const UNITS = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax'];

export function findUnitMatch({ units = UNITS, value = '' }) {
	const match = units.find((unit) => unit.indexOf(value.toLowerCase()) === 0);
	return match;
}

export const useAutoWidth = ({ ref }) => {
	const [width, setWidth] = React.useState();

	React.useEffect(() => {
		const handleOnResize = () => {
			if (ref) {
				setWidth(ref.current.clientWidth);
			}
		};

		handleOnResize();

		window.addEventListener('resize', handleOnResize);
		return () => {
			window.removeEventListener('resize', handleOnResize);
		};
	}, [ref, setWidth]);

	return width;
};

export const useSelectionPassThrough = ({ selectRef, wrapperRef }) => {
	React.useEffect(() => {
		const handleOnSelectionStart = (event) => {
			if (event.target === selectRef.current) return;
			if (!isFirefox()) {
				if (wrapperRef.current) {
					wrapperRef.current.style.pointerEvents = 'none';
				}
			}
		};
		const handleOnSelectionEnd = () => {
			if (wrapperRef.current) {
				wrapperRef.current.style.pointerEvents = null;
			}
		};

		document.addEventListener('mousedown', handleOnSelectionStart);
		document.addEventListener('touchstart', handleOnSelectionStart);
		document.addEventListener('mouseup', handleOnSelectionEnd);

		return () => {
			document.removeEventListener('mousedown', handleOnSelectionStart);
			document.removeEventListener('touchstart', handleOnSelectionStart);
			document.removeEventListener('mouseup', handleOnSelectionEnd);
		};
	}, [selectRef, wrapperRef]);
};
