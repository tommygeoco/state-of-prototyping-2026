import { routeAgentQuestion } from '@/lib/agent/router'

export async function POST(request: Request) {
  const body = (await request.json()) as { question?: string }
  const question = body.question?.trim()

  if (!question) {
    return Response.json({ error: 'A non-empty `question` field is required.' }, { status: 400 })
  }

  return Response.json(await routeAgentQuestion(question))
}
