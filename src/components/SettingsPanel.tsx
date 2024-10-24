import React from 'react';
import { Settings, Sliders } from 'lucide-react';
import type { PlaygroundSettings, Template } from '../types';
import { INDUSTRY_TEMPLATES } from '../types';

interface SettingsPanelProps {
  settings: PlaygroundSettings;
  onSettingsChange: (settings: PlaygroundSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  onToggle,
}) => {
  const handleTemplateChange = (templateId: string) => {
    onSettingsChange({ ...settings, selectedTemplate: templateId });
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-100"
        title="Toggle Settings"
      >
        <Settings className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-4 mt-12">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry Template
              </label>
              <select
                value={settings.selectedTemplate}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">Select a template</option>
                {INDUSTRY_TEMPLATES.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name} - {template.industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4" />
                  Temperature: {settings.temperature}
                </div>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={(e) => onSettingsChange({
                  ...settings,
                  temperature: parseFloat(e.target.value)
                })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Tokens: {settings.maxTokens}
              </label>
              <input
                type="range"
                min="256"
                max="4096"
                step="256"
                value={settings.maxTokens}
                onChange={(e) => onSettingsChange({
                  ...settings,
                  maxTokens: parseInt(e.target.value)
                })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};