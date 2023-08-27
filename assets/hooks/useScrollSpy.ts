import { useLayoutEffect, useState } from 'react'
export const useScrollSpy = (items, options: IntersectionObserverInit) => {
	const [activeId, setActiveId] = useState('')
	useLayoutEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(e => e.isIntersecting && setActiveId(e.target.id))
		}, options)
		items.forEach(id => {
			if (!id) {
				return
			}
			const element = document.getElementById(id)
			if (element) {
				observer.observe(element)
			}
		})
		return () => observer.disconnect()
	}, [items, options])
	return activeId
}
