import axios from 'axios'
import { ChatMessage, ChatResponse } from '@/types/chat'

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434'

export class OllamaClient {
  private readonly baseURL: string
  private model: string = 'llama3.2' // default model

  constructor() {
    this.baseURL = OLLAMA_HOST
  }

  setModel(model: string) {
    console.log(`Changing model from ${this.model} to ${model}`)
    this.model = model
    console.log(`Model successfully set to: ${this.model}`)
    return this.model // Optional: return for verification
  }

  async chat(messages: ChatMessage[]): Promise<ChatResponse> {
    try {
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      const response = await axios.post(`${this.baseURL}/api/chat`, {
        model: this.model,
        messages: formattedMessages,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          num_predict: 128,
        }
      })

      if (response.data.error) {
        throw new Error(response.data.error)
      }

      return {
        message: {
          role: 'assistant',
          content: response.data.message?.content || ''
        },
        done: response.data.done || false
      }
    } catch (error) {
      console.error('Ollama chat error:', error)
      if (axios.isAxiosError(error)) {
        throw new Error(`Chatbot communication error: ${error.response?.status} ${error.response?.statusText}`)
      }
      throw new Error('Failed to communicate with chatbot')
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/api/health`)
      return response.status === 200
    } catch (error) {
      console.error('Health check failed:', error)
      return false
    }
  }

  // Optional: Method to pull model if not already present
  async pullModel(): Promise<boolean> {
    try {
      await axios.post(`${this.baseURL}/api/pull`, {
        name: this.model,
        stream: false
      })
      return true
    } catch (error) {
      console.error('Failed to pull model:', error)
      return false
    }
  }
}

export const ollamaClient = new OllamaClient()
