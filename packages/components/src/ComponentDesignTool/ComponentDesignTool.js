import { ui } from '@wp-g2/styles';
import React from 'react';

import * as styles from './ComponentDesignTool.styles';

function getPureBoxBounds(element) {
	if (!element) return new DOMRect();

	const bounds = element.getBoundingClientRect();
	const styles = window.getComputedStyle(element);

	const pt = parseFloat(styles.paddingTop);
	const pb = parseFloat(styles.paddingBottom);
	const pl = parseFloat(styles.paddingLeft);
	const pr = parseFloat(styles.paddingRight);

	const bt = parseFloat(styles.borderTop);
	const bb = parseFloat(styles.borderBottom);
	const bl = parseFloat(styles.borderLeft);
	const br = parseFloat(styles.borderRight);

	const t = pt + bt;
	const b = pb + bb;
	const l = pl + bl;
	const r = pr + br;

	const width = bounds.width - l - r;
	const height = bounds.height - t - b;
	const x = bounds.x + l;
	const y = bounds.y + t;

	const nextBounds = new DOMRect(x, y, width, height);

	return nextBounds;
}

function useOutlines({
	enabled = true,
	opacity = 0.75,
	showOnAltKeyOnly = true,
}) {
	const isHoldingAltRef = React.useRef(false);

	const currentElementRef = React.useRef();
	const currentElementOutlineRef = React.useRef(
		document.createElement('div'),
	);
	const currentParentElementOutlineRef = React.useRef(
		document.createElement('div'),
	);
	const rulerTopRef = React.useRef(document.createElement('div'));
	const rulerBottomRef = React.useRef(document.createElement('div'));
	const rulerLeftRef = React.useRef(document.createElement('div'));
	const rulerRightRef = React.useRef(document.createElement('div'));

	const labelTopRef = React.useRef(document.createElement('div'));
	const labelBottomRef = React.useRef(document.createElement('div'));
	const labelLeftRef = React.useRef(document.createElement('div'));
	const labelRightRef = React.useRef(document.createElement('div'));

	const parentSizeLabelRef = React.useRef(document.createElement('div'));
	const sizeLabelRef = React.useRef(document.createElement('div'));

	React.useEffect(() => {
		const handleOnKeyDown = (event) => {
			if (event.altKey) {
				isHoldingAltRef.current = true;
			}
		};
		const handleOnKeyUp = () => {
			isHoldingAltRef.current = false;
		};

		window.addEventListener('keydown', handleOnKeyDown);
		window.addEventListener('keyup', handleOnKeyUp);

		return () => {
			window.removeEventListener('keydown', handleOnKeyDown);
			window.removeEventListener('keyup', handleOnKeyUp);
		};
	}, []);

	React.useEffect(() => {
		const currentElementOutline = currentElementOutlineRef.current;
		const currentParentElementOutline =
			currentParentElementOutlineRef.current;

		if (!enabled) {
			if (document.body.contains(currentElementOutline)) {
				document.body.removeChild(currentElementOutline);
			}
			if (document.body.contains(currentParentElementOutline)) {
				document.body.removeChild(currentParentElementOutline);
			}
			return;
		}

		currentElementOutline.classList.add(styles.ElementOutline);
		currentElementOutline.id = 'ComponentDesignToolCurrentElementOutline';
		document.body.appendChild(currentElementOutline);

		currentParentElementOutline.classList.add(styles.ParentElementOutline);
		currentParentElementOutline.id =
			'ComponentDesignToolCurrentParentElementOutline';
		document.body.appendChild(currentParentElementOutline);

		const rulerTop = rulerTopRef.current;
		const rulerBottom = rulerBottomRef.current;
		const rulerLeft = rulerLeftRef.current;
		const rulerRight = rulerRightRef.current;

		rulerTop.classList.add(styles.RulerT);
		rulerBottom.classList.add(styles.RulerB);
		rulerLeft.classList.add(styles.RulerL);
		rulerRight.classList.add(styles.RulerR);

		const labelTop = labelTopRef.current;
		const labelBottom = labelBottomRef.current;
		const labelLeft = labelLeftRef.current;
		const labelRight = labelRightRef.current;

		labelTop.classList.add(styles.LabelT);
		labelBottom.classList.add(styles.LabelB);
		labelLeft.classList.add(styles.LabelL);
		labelRight.classList.add(styles.LabelR);

		const parentSizeLabel = parentSizeLabelRef.current;
		parentSizeLabel.classList.add(styles.ParentSizeLabel);

		const sizeLabel = sizeLabelRef.current;
		sizeLabel.classList.add(styles.SizeLabel);

		currentParentElementOutline.appendChild(rulerTop);
		currentParentElementOutline.appendChild(rulerBottom);
		currentParentElementOutline.appendChild(rulerLeft);
		currentParentElementOutline.appendChild(rulerRight);

		currentParentElementOutline.appendChild(labelLeft);
		currentParentElementOutline.appendChild(labelRight);
		currentParentElementOutline.appendChild(labelTop);
		currentParentElementOutline.appendChild(labelBottom);

		currentParentElementOutline.appendChild(parentSizeLabel);
		currentElementOutline.appendChild(sizeLabel);

		currentElementOutline.style.opacity = opacity;
		currentParentElementOutline.style.opacity = opacity;

		return () => {
			document.body.removeChild(currentElementOutline);
			document.body.removeChild(currentParentElementOutline);
		};
	}, [enabled, opacity, showOnAltKeyOnly]);

	React.useEffect(() => {
		const handleOnMouseMove = (event) => {
			const { target } = event;
			const shouldEnableOnAlt = showOnAltKeyOnly
				? isHoldingAltRef.current
				: true;

			/**
			 * Disallow for <html /> and <body /> or if holding alt is void.
			 */
			if (
				[document.body, document.documentElement].includes(target) ||
				!shouldEnableOnAlt
			) {
				currentElementOutlineRef.current.style.display = 'none';
				currentParentElementOutlineRef.current.style.display = 'none';
				return;
			}

			if (currentElementRef.current === target) {
				return;
			}

			currentElementRef.current = target;

			const bounds = getPureBoxBounds(target);
			const { height: h, width: w } = bounds;

			const maxWalkAttemptCount = 10;
			const sizeThreshold = 3;
			let currentWalkElement = target;
			let currentWalkAttempCount = 0;
			let parentElement;
			let keepSearching = true;

			/**
			 * Find the closest parent element with dimensions larger than the current target.
			 */
			while (keepSearching && currentWalkElement) {
				const closestParent = currentWalkElement.parentElement;
				const { height: ph, width: pw } = getPureBoxBounds(
					closestParent,
				);

				if (
					pw > w + sizeThreshold &&
					ph > h + sizeThreshold &&
					!parentElement
				) {
					keepSearching = false;
					parentElement = closestParent;
				}

				if (currentWalkAttempCount < maxWalkAttemptCount) {
					currentWalkAttempCount++;
					currentWalkElement = closestParent;
				} else {
					keepSearching = false;
				}
			}

			/**
			 * Short circuit if no valid parent element can be found.
			 */
			if (!parentElement) {
				currentElementOutlineRef.current.style.display = 'none';
				currentParentElementOutlineRef.current.style.display = 'none';
				return;
			}

			/**
			 * Get the bounds of the parent element.
			 */
			const parentBounds = parentElement.getBoundingClientRect();

			/**
			 * Position the outlines.
			 */
			if (!bounds.width && !bounds.height) {
				currentElementOutlineRef.current.style.display = 'none';
			} else {
				currentElementOutlineRef.current.style.display = 'block';
			}

			if (!parentBounds.width && !parentBounds.height) {
				currentParentElementOutlineRef.current.style.display = 'none';
			} else {
				currentParentElementOutlineRef.current.style.display = 'block';
			}

			const currentElementOutline = currentElementOutlineRef.current;
			currentElementOutline.style.top = ui.value.px(bounds.top);
			currentElementOutline.style.left = ui.value.px(bounds.left);
			currentElementOutline.style.width = ui.value.px(bounds.width);
			currentElementOutline.style.height = ui.value.px(bounds.height);

			const currentParentElementOutline =
				currentParentElementOutlineRef.current;
			currentParentElementOutline.style.top = ui.value.px(
				parentBounds.top,
			);
			currentParentElementOutline.style.left = ui.value.px(
				parentBounds.left,
			);
			currentParentElementOutline.style.width = ui.value.px(
				parentBounds.width,
			);
			currentParentElementOutline.style.height = ui.value.px(
				parentBounds.height,
			);

			/**
			 * Position the rulers.
			 */
			const rulerTop = rulerTopRef.current;
			const rulerBottom = rulerBottomRef.current;
			const rulerLeft = rulerLeftRef.current;
			const rulerRight = rulerRightRef.current;

			const vt = bounds.top - parentBounds.top;
			const vb = parentBounds.height - (vt + bounds.height);
			const vl = bounds.left - parentBounds.left;
			const vr =
				parentBounds.width -
				(bounds.left - parentBounds.left + bounds.width);

			rulerTop.style.height = ui.value.px(vt);
			rulerTop.style.top = ui.value.px(0);
			rulerTop.style.left = ui.value.px(vl + bounds.width / 2);

			rulerBottom.style.height = ui.value.px(vb);
			rulerBottom.style.bottom = ui.value.px(0);
			rulerBottom.style.left = ui.value.px(vl + bounds.width / 2);

			rulerLeft.style.width = ui.value.px(vl);
			rulerLeft.style.left = ui.value.px(0);
			rulerLeft.style.top = ui.value.px(vt + bounds.height / 2);

			rulerRight.style.width = ui.value.px(vr);
			rulerRight.style.right = ui.value.px(0);
			rulerRight.style.top = ui.value.px(vt + bounds.height / 2);

			/**
			 * Position the labels.
			 */
			const labelTop = labelTopRef.current;
			const labelBottom = labelBottomRef.current;
			const labelLeft = labelLeftRef.current;
			const labelRight = labelRightRef.current;

			labelTop.style.left = ui.value.px(vl + bounds.width / 2);
			labelBottom.style.left = ui.value.px(vl + bounds.width / 2);
			labelLeft.style.top = ui.value.px(vt + bounds.height / 2);
			labelRight.style.top = ui.value.px(vt + bounds.height / 2);

			labelTop.innerHTML = Math.round(vt);
			labelBottom.innerHTML = Math.round(vb);
			labelLeft.innerHTML = Math.round(vl);
			labelRight.innerHTML = Math.round(vr);

			/**
			 * Position the size labels.
			 */
			const parentSizeLabel = parentSizeLabelRef.current;
			parentSizeLabel.innerHTML = `${Math.round(
				parentBounds.width,
			)} x ${Math.round(parentBounds.height)}`;

			const sizeLabel = sizeLabelRef.current;
			sizeLabel.innerHTML = `${Math.round(bounds.width)} x ${Math.round(
				bounds.height,
			)}`;
		};

		const handleOnMouseOut = () => {
			currentElementOutlineRef.current.style.display = 'none';
			currentParentElementOutlineRef.current.style.display = 'none';
		};

		window.addEventListener('mousemove', handleOnMouseMove);
		document.addEventListener('mouseleave', handleOnMouseOut);

		return () => {
			window.removeEventListener('mousemove', handleOnMouseMove);
			document.removeEventListener('mouseleave', handleOnMouseOut);
		};
	}, [showOnAltKeyOnly]);
}

function ComponentDesignTool(props) {
	const {
		enableOutlines = true,
		outlinesOpacity = 0.75,
		showOnAltKeyOnly = true,
	} = props;
	useOutlines({
		enabled: enableOutlines,
		opacity: outlinesOpacity,
		showOnAltKeyOnly,
	});

	return null;
}

export default React.memo(ComponentDesignTool);
