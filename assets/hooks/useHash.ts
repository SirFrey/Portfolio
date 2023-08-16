import { useCallback, useEffect, useState } from 'react';

export const useHash = (): [string, (newHash: string) => void] => {
	const [hash, setHash] = useState(() => window.location.hash);

	const hashChangeHandler = useCallback(() => {
		setHash(window.location.hash);
	}, []);

	useEffect(() => {
		window.addEventListener('hashchange', hashChangeHandler);
		return () => {
			window.removeEventListener('hashchange', hashChangeHandler);
		};
	}, []);

	const updateHash = useCallback(
		(newHash: string): void => {
			if (newHash !== hash) {
				window.location.hash = newHash;
			}
		},
		[hash]
	);

	return [hash, updateHash];
};
