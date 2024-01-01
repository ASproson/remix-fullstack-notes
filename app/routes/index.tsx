import { Link } from '@remix-run/react'

export default function Index() {
	return (
		<div className="container text-center">
			<h1 className="my-8 text-h1">Fullstack Notes</h1>
			<Link to={`/users/kody`}>
				<h2>Demo user</h2>
			</Link>
			<Link to={`/users/kody/notes`}>
				<h2>Notes</h2>
			</Link>
		</div>
	)
}
