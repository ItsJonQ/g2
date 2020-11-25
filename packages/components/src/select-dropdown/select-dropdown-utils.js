import { useSelect } from 'downshift';

export const itemToString = (item) => item?.name || item?.label;

// This is needed so that in Windows, where
// the menu does not necessarily open on
// key up/down, you can still switch between
// options with the menu closed.
export const stateReducer = (
	{ selectedItem },
	{ changes, props: { items }, type },
) => {
	switch (type) {
		case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowDown:
			// If we already have a selected item, try to select the next one,
			// without circular navigation. Otherwise, select the first item.
			return {
				selectedItem:
					items[
						selectedItem
							? Math.min(
									items.indexOf(selectedItem) + 1,
									items.length - 1,
							  )
							: 0
					],
			};
		case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowUp:
			// If we already have a selected item, try to select the previous one,
			// without circular navigation. Otherwise, select the last item.
			return {
				selectedItem:
					items[
						selectedItem
							? Math.max(items.indexOf(selectedItem) - 1, 0)
							: items.length - 1
					],
			};
		default:
			return changes;
	}
};
