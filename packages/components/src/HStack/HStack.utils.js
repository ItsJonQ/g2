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
	bottom: { justify: 'flex-end', align: 'center' },
	bottomLeft: { justify: 'flex-start', align: 'flex-end' },
	bottomRight: { justify: 'flex-end', align: 'flex-end' },
	center: { justify: 'center', align: 'center' },
	edge: { justify: 'space-between', align: 'center' },
	left: { justify: 'center', align: 'flex-start' },
	right: { justify: 'center', align: 'flex-end' },
	stretch: { justify: 'stretch' },
	top: { justify: 'flex-start', align: 'center' },
	topLeft: { justify: 'flex-start', align: 'flex-start' },
	topRight: { justify: 'flex-start', align: 'flex-end' },
};

export function getAlignmentProps(alignment, direction) {
	const isVertical = direction === 'column';
	const props = isVertical ? V_ALIGNMENTS : ALIGNMENTS;

	const alignmentProps = props[alignment] || { align: alignment };

	return alignmentProps;
}
