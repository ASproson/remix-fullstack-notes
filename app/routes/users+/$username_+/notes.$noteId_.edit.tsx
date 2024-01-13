import { json, type DataFunctionArgs, redirect } from '@remix-run/node'
import {
	Form,
	useActionData,
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
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { useEffect, useId, useRef, useState } from 'react'
import { useFocusInvalid } from '#app/hooks/useFocusInvalid.tsx'
import { z } from 'zod'

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

const titleMaxLength = 100
const contentMaxLength = 10000

const NoteEditorSchema = z.object({
	title: z.string().max(titleMaxLength).min(1),
	content: z.string().max(contentMaxLength).min(1),
})

export async function action({ request, params }: DataFunctionArgs) {
	invariantResponse(params.noteId, 'noteId param is required')
	const formData = await request.formData()
	const result = NoteEditorSchema.safeParse({
		title: formData.get('title'),
		content: formData.get('content'),
	})

	if (!result.success) {
		console.log(result.error)
		const errors = result.error.flatten()
		return json({ status: 'error', errors } as const, { status: 400 })
	}

	const { title, content } = result.data

	db.note.update({
		where: { id: { equals: params.noteId } },
		data: { title, content },
	})

	return redirect(`/users/${params.username}/notes/${params.noteId}`)
}

function ErrorList({
	id,
	errors,
}: {
	id?: string
	errors?: Array<string> | null
}) {
	return errors?.length ? (
		<ul id={id} className="flex flex-col gap-1">
			{errors.map((error, i) => (
				<li key={i} className="text-[10px] text-foreground-destructive">
					{error}
				</li>
			))}
		</ul>
	) : null
}

/**
 * @returns a boolean. On render server returns false because useEffect doesn't run. When JS loads this triggers the re-render and hydrates the page
 */
function useHydrated() {
	const [hydrated, setHydrated] = useState(false)
	useEffect(() => setHydrated(true), [])
	return hydrated
}

export default function NoteEdit() {
	const data = useLoaderData<typeof loader>()
	const { formMethod } = useNavigation()
	const formAction = useFormAction()
	const actionData = useActionData<typeof action>()
	const formId = 'note-editor'
	const isPending = formAction === formAction && formMethod === 'POST'

	const formRef = useRef<HTMLFormElement>(null)

	const inputId = `title-${useId()}`

	const formErrors =
		actionData?.status === 'error' ? actionData.errors.formErrors : null
	const fieldErrors =
		actionData?.status === 'error' ? actionData.errors.fieldErrors : null

	const isHydrated = useHydrated()

	const formHasErrors = Boolean(formErrors?.length)
	const formErrorId = formHasErrors ? 'form-error' : undefined
	const titleHasErrors = Boolean(fieldErrors?.title?.length)
	const titleErrorId = titleHasErrors ? 'title-error' : undefined
	const contentHasErrors = Boolean(fieldErrors?.content?.length)
	const contentErrorId = contentHasErrors ? 'content-error' : undefined

	useFocusInvalid(formRef.current, actionData?.status === 'error')

	return (
		<div className="absolute inset-0">
			<Form
				id={formId}
				ref={formRef}
				noValidate={isHydrated}
				method="post"
				className="flex h-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden px-10 pb-28 pt-12"
				aria-invalid={formHasErrors || undefined}
				aria-describedby={formErrorId}
				tabIndex={-1}
			>
				<div className="flex flex-col gap-1">
					<div>
						<Label htmlFor={inputId}>Title</Label>
						<Input
							id={inputId}
							name="title"
							defaultValue={data.note.title}
							required
							maxLength={titleMaxLength}
							aria-invalid={titleHasErrors || undefined}
							aria-describedby={titleErrorId}
							autoFocus
						/>
						<div className="min-h-[32px] px-4 pb-3 pt-1">
							<ErrorList id={titleErrorId} errors={fieldErrors?.title} />
						</div>
					</div>
					<div>
						<Label htmlFor="note-content">Content</Label>
						<Textarea
							id="note-content"
							name="content"
							defaultValue={data.note.content}
							required
							maxLength={contentMaxLength}
							aria-invalid={contentHasErrors || undefined}
							aria-describedby={contentErrorId}
						/>
						<div className="min-h-[32px] px-4 pb-3 pt-1">
							<ErrorList id={contentErrorId} errors={fieldErrors?.content} />
						</div>
					</div>
				</div>
				<ErrorList id={formErrorId} errors={formErrors} />
			</Form>
			<div className={floatingToolbarClassName}>
				<Button form={formId} variant="destructive" type="reset">
					Reset
				</Button>
				<Button type="submit" disabled={isPending} form={formId}>
					{isPending ? 'Pending' : 'Submit'}
				</Button>
			</div>
		</div>
	)
}

export const ErrorBoundary = () => {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>Note with note ID {params.noteId} not found!</p>
				),
			}}
		/>
	)
}
