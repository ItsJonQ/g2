const ALIGNMENTS = {
	bottom: { align: 'flex-end', justify: 'center' },
	bottomLeft: { align: 'flex-start', justify: 'flex-end' },
	bottomRight: { align: 'flex-end', justify: 'flex-end' },
	center: { align: 'center', justify: 'center' },
	edge: { align: 'center', justify: 'space-between' },
	left: { align: 'center', justify: 'flex-start' },
	right: { align: 'center', justify: 'flex-end' },
	stretch: { align: 'stretch' },
	top: { align: 'flex-start', justify: 'center' },
	topLeft: { align: 'flex-start', justify: 'flex-start' },
	topRight: { align: 'flex-start', justify: 'flex-end' },
};

const V_ALIGNMENTS = {
	bottom: { justify: 'flex-end', alignItems: 'center' },
	bottomLeft: { justify: 'flex-start', alignItems: 'flex-end' },
	bottomRight: { justify: 'flex-end', alignItems: 'flex-end' },
	center: { justify: 'center', alignItems: 'center' },
	edge: { justify: 'space-between', alignItems: 'center' },
	left: { justify: 'center', alignItems: 'flex-start' },
	right: { justify: 'center', alignItems: 'flex-end' },
	stretch: { justify: 'stretch' },
	top: { justify: 'flex-start', alignItems: 'center' },
	topLeft: { justify: 'flex-start', alignItems: 'flex-start' },
	topRight: { justify: 'flex-start', alignItems: 'flex-end' },
};

export function getAlignmentProps(alignment, direction) {
	const isVertical = direction === 'column';
	const props = isVertical ? V_ALIGNMENTS : ALIGNMENTS;

	const alignmentProps = props[alignment] || { align: alignment };

	return alignmentProps;
}
