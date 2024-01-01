import { Link } from '@remix-run/react'

export default function KodyProfileRoute() {
	return (
		<div className="container mb-48 mt-36 border-4 border-green-500">
			<h1 className="text-h1">Kody</h1>
			{/* Relative link */}
			<Link to={`notes`}>
				<h2>Notes</h2>
			</Link>
		</div>
	)
}
