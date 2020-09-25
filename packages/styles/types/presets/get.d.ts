import { config } from '../../src/theme/config';

type DesignTokens = keyof typeof config;
type CSSVariable = string;

/** Retrives a design token from the style configuration. */
export declare interface GetInterface {
	/** Retrives a design token from the style configuration. */
	(value: DesignTokens): CSSVariable;
}

/** Retrives a design token computed value from the style configuration. */
export declare interface GetTokenValueInterface {
	/** Retrives a design token computed value from the style configuration. */
	(value: DesignTokens): CSSVariable;
}

/** Create a new design token namespace. */
export declare interface CreateTokenInterface {
	/** Create a new design token namespace. */
	(namespace: string): CSSVariable;
}
