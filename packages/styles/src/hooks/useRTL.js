export function useRTL() {
	return document?.documentElement?.dir === 'rtl';
}
