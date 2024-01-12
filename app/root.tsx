import { type LinksFunction, json } from '@remix-run/node'
import {
	Link,
	Links,
	LiveReload,
	Meta,
	MetaFunction,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react'
import faviconAssetUrl from './assets/favicon.svg'
import fontStylestylesheetUrl from './styles/font.css'
import tailwindStylesheetUrl from './styles/tailwind.css'
import { getEnv } from './utils/env.server.ts'

export const links: LinksFunction = () => {
	return [
		{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
		{ rel: 'stylesheet', href: fontStylestylesheetUrl },
		{ rel: 'stylesheet', href: tailwindStylesheetUrl },
	]
}

export async function loader() {
	return json({ ENV: getEnv() })
}

export default function App() {
	const data = useLoaderData<typeof loader>()
	return (
		<html lang="en" className="h-full overflow-x-hidden">
			<head>
				<Meta />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
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
				<ScrollRestoration />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data.ENV)}`,
					}}
				/>

				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export const meta: MetaFunction = () => {
	return [
		{ title: 'Remix Fullstack Notes' },
		{ name: 'description', content: `ASproson's portfolio page` },
	]
}
