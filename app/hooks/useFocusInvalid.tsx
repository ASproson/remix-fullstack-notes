import { useEffect } from 'react'

/**
 * A hook that focuses the first invalid element in a form
 */
export function useFocusInvalid(
	formEl: HTMLFormElement | null,
	hasErrors: boolean,
) {
	useEffect(() => {
		if (!formEl) return
		if (!hasErrors) return

		if (formEl.matches('[aria-invalid="true"]')) {
			formEl.focus()
		} else {
			const firstInvalid = formEl.querySelector('[aria-invalid="true"]')
			if (firstInvalid instanceof HTMLElement) {
				firstInvalid.focus()
			}
		}
	}, [formEl, hasErrors])
}
