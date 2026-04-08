import { loadQuestions, loadVibeByRole, loadWorkflowChangeByCompany } from '@/lib/data/loaders'
import { cacheHeaders } from '@/lib/api/headers'

interface RouteContext {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: Request, { params }: RouteContext) {
  const { id: rawId } = await params
  const id = rawId.toUpperCase()
  const { searchParams } = new URL(request.url)
  const by = searchParams.get('by')?.toLowerCase()

  if (id === 'Q7' && by === 'role') {
    return Response.json(await loadVibeByRole(), { headers: cacheHeaders })
  }

  if (id === 'Q10' && ['company', 'context', 'work-context'].includes(by ?? '')) {
    return Response.json(await loadWorkflowChangeByCompany(), { headers: cacheHeaders })
  }

  const questions = await loadQuestions()
  const definition = questions.data.find((question) => question.id === id)

  if (!definition) {
    return Response.json({ error: `Unknown question: ${id}` }, { status: 404, headers: cacheHeaders })
  }

  return Response.json(
    {
      error: `No published cross-tab for ${id}${by ? ` by ${by}` : ''}.`,
      available_cross_tabs: ['Q7 by role', 'Q10 by company'],
    },
    { status: 404, headers: cacheHeaders },
  )
}
