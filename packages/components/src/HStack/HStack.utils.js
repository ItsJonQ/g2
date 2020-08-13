const ALIGNMENTS = {
	bottom: { align: 'flex-end', justify: 'center' },
	bottomLeft: { align: 'flex-start', justify: 'flex-end' },
	bottomRight: { align: 'flex-end', justify: 'flex-end' },
	center: { align: 'center', justify: 'center' },
	left: { align: 'center', justify: 'flex-start' },
	right: { align: 'center', justify: 'flex-start' },
	top: { align: 'flex-start', justify: 'center' },
	topLeft: { align: 'flex-start', justify: 'flex-start' },
	topRight: { align: 'flex-start', justify: 'flex-end' },
};

export function getAlignmentProps(alignment) {
	const alignmentProps = ALIGNMENTS[alignment] || { align: alignment };

	return alignmentProps;
}
