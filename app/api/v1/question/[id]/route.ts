import { loadQuestionById, loadQuestions } from '@/lib/data/loaders'
import { cacheHeaders } from '@/lib/api/headers'

interface RouteContext {
  params: {
    id: string
  }
}

export async function GET(_request: Request, { params }: RouteContext) {
  const id = params.id.toUpperCase()
  const result = await loadQuestionById(id)

  if (result) {
    return Response.json(result, { headers: cacheHeaders })
  }

  const questions = await loadQuestions()
  const definition = questions.data.find((question) => question.id === id)

  if (!definition) {
    return Response.json({ error: `Unknown question: ${id}` }, { status: 404 })
  }

  return Response.json({
    question: definition.question,
    id,
    published: false,
    message: 'This question is listed in the data dictionary but does not have a published aggregate table in v1.',
  })
}
