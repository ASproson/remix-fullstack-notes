import { json, type DataFunctionArgs } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { db } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'
import { Label } from '#app/components/ui/label.tsx'
import { Input } from '#app/components/ui/input.tsx'
import { Textarea } from '#app/components/ui/textarea.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { floatingToolbarClassName } from '#app/components/floating-toolbar.tsx'

export async function loader({ params }: DataFunctionArgs) {
	const note = db.note.findFirst({
		where: {
			id: {
				equals: params.noteId,
			},
		},
	})

	invariantResponse(note, 'Note not found', { status: 404 })

	return json({
		note: { title: note.title, content: note.content },
	})
}

export default function NoteEdit() {
	const data = useLoaderData<typeof loader>()

	return (
		<Form method="POST">
			<Label htmlFor="title">Title</Label>
			<Input name="title" defaultValue={data.note.title} />
			<Label htmlFor="content">Content</Label>
			<Textarea name="content" defaultValue={data.note.content} />

			<div className={floatingToolbarClassName}>
				<Button type="reset">Reset</Button>
				<Button type="submit">Submit</Button>
			</div>
		</Form>
	)
}
