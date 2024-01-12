import { json, type DataFunctionArgs, redirect } from '@remix-run/node'
import { Form, Link, MetaFunction, useLoaderData } from '@remix-run/react'
import { db } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'
import { floatingToolbarClassName } from '#app/components/floating-toolbar.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { type loader as notesLoader } from './notes.tsx'

export const loader = async ({ params }: DataFunctionArgs) => {
	console.log(params)
	const note = db.note.findFirst({
		where: {
			id: {
				equals: params.noteId,
			},
		},
	})

	invariantResponse(note, 'Note not found in database', { status: 404 })

	return json({
		note: { title: note.title, content: note.content },
	})
}

export async function action({ params, request }: DataFunctionArgs) {
	const noteId = params.noteId
	const formData = await request.formData()
	const intent = formData.get('intent')

	switch (intent) {
		case 'delete': {
			db.note.delete({
				where: { id: { equals: noteId } },
			})
			return redirect(`/users/${params.username}/notes`)
		}
		default: {
			throw new Response(`Invalid intent: ${intent}`, { status: 400 })
		}
	}
}

export default function NoteRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="absolute inset-0 flex flex-col px-10">
			<h2 className="mb-2 pt-12 text-h2 lg:mb-6">{data.note.title}</h2>
			<div className="overflow-y-auto pb-24">
				<p className="whitespace-break-spaces text-sm md:text-lg">
					{data.note.content}
				</p>
			</div>
			<div className={floatingToolbarClassName}>
				<Form method="POST">
					<Button
						type="submit"
						variant="destructive"
						name="intent"
						value="delete"
					>
						Delete
					</Button>
				</Form>
				<Button asChild>
					<Link to="edit">Edit</Link>
				</Button>
			</div>
		</div>
	)
}

export const meta: MetaFunction<
	typeof loader,
	{ 'routes/users+/$username_+/notes': typeof notesLoader }
> = ({ data, params, matches }) => {
	const notesMatch = matches.find(
		m => m.id === 'routes/users+/$username_+/notes',
	)
	const displayName = notesMatch?.data?.owner.name ?? params.username
	const noteTitle = data?.note.title ?? 'Note'
	const noteContentsSummary =
		data && data.note.content.length > 100
			? data?.note.content.slice(0, 97) + '...'
			: 'No content'
	return [
		{ title: `${noteTitle} | ${displayName}'s Notes | Epic Notes` },
		{
			name: 'description',
			content: noteContentsSummary,
		},
	]
}
