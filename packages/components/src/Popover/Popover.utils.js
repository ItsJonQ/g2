import { noop, useIsomorphicLayoutEffect, useResizeAware } from '@wp-g2/utils';

export function usePopoverResizeUpdater({ onResize = noop }) {
	const [resizeListener, sizes] = useResizeAware();

	useIsomorphicLayoutEffect(() => {
		onResize();
	}, [sizes.width, sizes.height]);

	return resizeListener;
}
