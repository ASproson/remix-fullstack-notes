import { json, type DataFunctionArgs, redirect } from '@remix-run/node'
import {
	Form,
	useFormAction,
	useLoaderData,
	useNavigation,
} from '@remix-run/react'
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

export async function action({ request, params }: DataFunctionArgs) {
	const formData = await request.formData()
	const title = formData.get('title')
	const content = formData.get('content')

	invariantResponse(typeof title === 'string', 'Title must be a valid string', {
		status: 400,
	})
	invariantResponse(
		typeof content === 'string',
		'Content must be a valid string',
		{ status: 400 },
	)

	db.note.update({
		where: { id: { equals: params.noteId } },
		data: { title, content },
	})

	return redirect(`/users/${params.username}/notes/${params.noteId}`)
}

export default function NoteEdit() {
	const data = useLoaderData<typeof loader>()
	const { formMethod } = useNavigation()
	const formAction = useFormAction()

	const isPending = formAction === formAction && formMethod === 'POST'

	return (
		<Form
			method="POST"
			className="flex h-full flex-col gap-y-4 overflow-x-hidden px-10 pb-28 pt-12"
		>
			<div className="flex flex-col gap-1">
				<div>
					<Label>Title</Label>
					<Input name="title" defaultValue={data.note.title} />
				</div>
				<div>
					<Label>Content</Label>
					<Textarea name="content" defaultValue={data.note.content} />
				</div>
			</div>
			<div className={floatingToolbarClassName}>
				<Button variant="destructive" type="reset">
					Reset
				</Button>
				<Button type="submit" disabled={isPending}>
					{isPending ? 'Pending' : 'Submit'}
				</Button>
			</div>
		</Form>
	)
}
