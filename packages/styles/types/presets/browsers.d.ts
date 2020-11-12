import { CSSClassName } from '../shared';

/** Render styles for specific browsers. */
export declare interface BrowsersInterface {
	/** Renders styles for IE 10+ only. */
	ie: CSSClassName;
	/** Renders styles for Firefox only. */
	firefox: CSSClassName;
	/** Renders styles for Safari only. */
	safari: CSSClassName;
}
