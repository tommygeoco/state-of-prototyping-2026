import { loadQuestions, loadVibeByRole } from '@/lib/data/loaders'

interface RouteContext {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: RouteContext) {
  const id = params.id.toUpperCase()
  const { searchParams } = new URL(request.url)
  const by = searchParams.get('by')?.toLowerCase()

  if (id === 'Q7' && by === 'role') {
    return Response.json(await loadVibeByRole())
  }

  const questions = await loadQuestions()
  const definition = questions.data.find((question) => question.id === id)

  if (!definition) {
    return Response.json({ error: `Unknown question: ${id}` }, { status: 404 })
  }

  return Response.json(
    {
      error: `No published cross-tab for ${id}${by ? ` by ${by}` : ''}.`,
      available_cross_tabs: ['Q7 by role'],
    },
    { status: 404 },
  )
}
