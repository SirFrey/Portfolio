import { useCallback, useLayoutEffect, useState } from 'react'

export const useHash = (): [string, (newHash: string) => void] => {
	const [hash, setHash] = useState(() => globalThis.window?.location.hash)

	const hashChangeHandler = useCallback(() => {
		setHash(globalThis.window.location.hash)
	}, [])

	useLayoutEffect(() => {
		globalThis.window?.addEventListener('hashchange', hashChangeHandler)
		return () => {
			globalThis.window?.removeEventListener('hashchange', hashChangeHandler)
		}
	}, [])

	const updateHash = useCallback(
		(newHash: string): void => {
			if (newHash !== hash && typeof window === 'object') {
				window.location.hash = newHash
			}
		},
		[hash]
	)

	return [hash, updateHash]
}
