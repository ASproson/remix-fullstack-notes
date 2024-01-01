import { Link, NavLink, Outlet } from '@remix-run/react'

export default function NotesRoute() {
	return (
		<div className="flex h-full justify-between pb-12 border-8 border-blue-500">
			<div>
				<h1 className="text-h1">Notes</h1>
				<ul>
					<li>
						<Link to="/users/kody" className="underline">
							Back to Kody
						</Link>
					</li>
					<li>
						<NavLink
							to="some-note-id"
							className={({ isActive }) =>
								`underline ${isActive ? 'bg-accent' : ''}`
							}
						>
							Some Note
						</NavLink>
					</li>
				</ul>
			</div>
			<Outlet />
		</div>
	)
}
