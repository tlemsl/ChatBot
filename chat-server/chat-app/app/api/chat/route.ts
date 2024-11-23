import { NextResponse } from 'next/server'
import { ollamaClient } from '@/lib/ollama'
import { ChatMessageSchema } from '@/types/chat'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = ChatMessageSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    const response = await ollamaClient.chat(result.data.messages)
    return NextResponse.json(response)
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}