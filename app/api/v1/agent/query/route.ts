import { routeAgentQuestion } from '@/lib/agent/router'

const MAX_QUESTION_LENGTH = 500

export async function POST(request: Request) {
  let body: { question?: string }

  try {
    body = (await request.json()) as { question?: string }
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const question = body.question?.trim()

  if (!question) {
    return Response.json({ error: 'A non-empty `question` field is required.' }, { status: 400 })
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return Response.json(
      { error: `Question must be ${MAX_QUESTION_LENGTH} characters or fewer.` },
      { status: 400 },
    )
  }

  return Response.json(await routeAgentQuestion(question))
}
