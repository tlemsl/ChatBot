import { AVAILABLE_MODELS } from '@/types/chat'

interface ModelSelectorProps {
  currentModel: string
  onModelChange: (model: string) => void
  disabled?: boolean
}

export function ModelSelector({ currentModel, onModelChange, disabled }: ModelSelectorProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <label className="text-sm font-medium text-gray-700">Model:</label>
      <select
        value={currentModel}
        onChange={(e) => onModelChange(e.target.value)}
        disabled={disabled}
        className="block w-full max-w-xs rounded-md border border-gray-300 py-1.5 px-3 text-sm 
                 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                 disabled:opacity-50"
      >
        {AVAILABLE_MODELS.map((model) => (
          <option key={model.name} value={model.name}>
            {model.description}
          </option>
        ))}
      </select>
    </div>
  )
} 
