'use client'

import { useState } from 'react'
import { ChatMessage } from '@/types/chat'
import axios from 'axios'
import { ModelSelector } from '@/components/ModelSelector'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentModel, setCurrentModel] = useState('llama3.2')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/chat', {
        messages: [...messages, userMessage],
        model: currentModel
      })
      
      if (response.data.error) {
        throw new Error(response.data.error)
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.data.message?.content || 'No response from assistant'
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message')
      
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <ModelSelector
        currentModel={currentModel}
        onModelChange={setCurrentModel}
        disabled={isLoading}
      />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-[70%] ${
              message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                className="prose prose-sm max-w-none dark:prose-invert"
                components={{
                  pre: ({node, ...props}) => (
                    <pre className="bg-gray-800 text-white p-2 rounded-md overflow-x-auto">
                      {props.children}
                    </pre>
                  ),
                  code: ({node, inline, ...props}) => (
                    inline ? 
                      <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded" {...props} /> :
                      <code {...props} />
                  )
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="p-4 bg-red-100 text-red-700 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg border p-2"
            placeholder="Type a message..."
            disabled={isLoading}
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
}
