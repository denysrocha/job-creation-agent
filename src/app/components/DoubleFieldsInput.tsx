import { Button } from "./ui/button";
import { useState } from "react";

interface DoubleFieldsInputProps {
  field1: {
    key: string;
    label: string;
    type?: 'text' | 'select';
    options?: { label: string; value: string }[];
  };
  field2: {
    key: string;
    label: string;
    type?: 'text' | 'select';
    options?: { label: string; value: string }[];
  };
  onSubmit: (field1Value: string, field2Value: string) => void;
}

export function DoubleFieldsInput({ field1, field2, onSubmit }: DoubleFieldsInputProps) {
  const [field1Value, setField1Value] = useState("");
  const [field2Value, setField2Value] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (field1Value.trim() && field2Value.trim()) {
      onSubmit(field1Value, field2Value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Campo 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field1.label}
          </label>
          {field1.type === 'select' && field1.options ? (
            <select
              value={field1Value}
              onChange={(e) => setField1Value(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              required
            >
              <option value="">Selecione...</option>
              {field1.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={field1Value}
              onChange={(e) => setField1Value(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={`Digite ${field1.label.toLowerCase()}...`}
              required
            />
          )}
        </div>

        {/* Campo 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field2.label}
          </label>
          {field2.type === 'select' && field2.options ? (
            <select
              value={field2Value}
              onChange={(e) => setField2Value(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              required
            >
              <option value="">Selecione...</option>
              {field2.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={field2Value}
              onChange={(e) => setField2Value(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={`Digite ${field2.label.toLowerCase()}...`}
              required
            />
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Enviar
      </Button>
    </form>
  );
}
