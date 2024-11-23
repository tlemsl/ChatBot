import { z } from 'zod'

export const ChatMessageSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string().min(1).max(4096)
    })
  ).min(1).max(100)
})

export type ChatMessage = z.infer<typeof ChatMessageSchema>['messages'][number]
export type ChatResponse = {
  message: ChatMessage
  done: boolean
}
