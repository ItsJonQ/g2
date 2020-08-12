const ALIGNMENTS = {
	bottom: { align: 'flex-end' },
	center: { align: 'center' },
	left: { justify: 'flex-start' },
	right: { justify: 'flex-start' },
	top: { align: 'flex-start' },
};

export function getAlignmentProps(alignment) {
	const alignmentProps = ALIGNMENTS[alignment] || { align: alignment };

	return alignmentProps;
}
