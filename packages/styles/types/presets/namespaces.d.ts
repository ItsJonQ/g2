import { COMPONENT_NAMESPACE } from '../../src/namespaces';

type NamespaceProps = {
	[COMPONENT_NAMESPACE]: string;
};

/** Renders namespace props for a Component. */
export declare interface NamespaceInterface {
	/** Renders namespace props for a Component. */
	(ComponentName: string): NamespaceProps;
}
