import { type LinksFunction } from '@remix-run/node'
import { Link, Links, LiveReload, Outlet, Scripts } from '@remix-run/react'
import faviconAssetUrl from './assets/favicon.svg'
import fontStylestylesheetUrl from './styles/font.css'
import tailwindStylesheetUrl from './styles/tailwind.css'

export const links: LinksFunction = () => {
	return [
		{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
		{ rel: 'stylesheet', href: fontStylestylesheetUrl },
		{ rel: 'stylesheet', href: tailwindStylesheetUrl },
	]
}

export default function App() {
	return (
		<html lang="en" className="h-full overflow-x-hidden">
			<head>
				<Links />
			</head>
			<body className="flex h-full flex-col justify-between bg-background text-foreground">
				<header className="container mx-auto py-6">
					<nav className="flex justify-between">
						<Link to="/">
							<div className="font-light">fullstack</div>
							<div className="font-bold">notes</div>
						</Link>
					</nav>
				</header>

				<div className="flex-1">
					<Outlet />
				</div>

				<div className="container mx-auto flex justify-between">
					<Link to="/">
						<div className="font-light">fullstack</div>
						<div className="font-bold">notes</div>
					</Link>
				</div>
				<div className="h-5" />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
