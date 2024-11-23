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

export const AVAILABLE_MODELS = [
  { name: 'llama3.2', description: 'Llama 3.2' },
  { name: 'llama3.2:1b', description: 'Llama 3.2 (1B)' },
  { name: 'gemma2:2b', description: 'Gemma 2 (2B)' }
] as const

export type ModelName = typeof AVAILABLE_MODELS[number]['name']
