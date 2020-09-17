import { CSSClassName } from '../shared';

/** Modify styles for a specific mode. */
interface ModesInterface {
	/** Render styles for color-blind mode. */
	colorBlind: (...args: any) => CSSClassName;
	/** Render styles for dark mode. */
	dark: (...args: any) => CSSClassName;
	/** Render styles for high-contrast mode. */
	highContrast: (...args: any) => CSSClassName;
}
