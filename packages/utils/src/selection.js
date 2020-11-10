export function clearSelection() {
	/**
	 * Clear selection
	 */
	if (window.getSelection) {
		const selection = window.getSelection();
		if (!selection) {
			return;
		}

		if (selection.empty) {
			// Chrome
			selection.empty();
		} else if (selection.removeAllRanges) {
			// Firefox
			selection.removeAllRanges();
		}
		// @ts-ignore
	} else if (document.selection) {
		// IE?
		// @ts-ignore
		document.selection.empty();
	}
}
