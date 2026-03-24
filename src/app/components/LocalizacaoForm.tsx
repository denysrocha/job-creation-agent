import { Button } from "./ui/button";
import { useState } from "react";

interface LocalizacaoFormProps {
  onSubmit: (localizacao: string, modeloTrabalho: string) => void;
}

const modeloTrabalhoOptions = ["Presencial", "Remoto", "Híbrido"];

export function LocalizacaoForm({ onSubmit }: LocalizacaoFormProps) {
  const [localizacao, setLocalizacao] = useState("");
  const [modeloTrabalho, setModeloTrabalho] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localizacao.trim() && modeloTrabalho) {
      onSubmit(localizacao, modeloTrabalho);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Localização */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Localização
          </label>
          <input
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ex: São Paulo, SP"
            required
          />
        </div>

        {/* Modelo de trabalho - botões */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modelo de trabalho
          </label>
          <div className="flex gap-2">
            {modeloTrabalhoOptions.map((modelo) => (
              <button
                key={modelo}
                type="button"
                onClick={() => setModeloTrabalho(modelo)}
                className={`px-4 py-2 rounded-md border transition-colors ${
                  modeloTrabalho === modelo
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                {modelo}
              </button>
            ))}
          </div>
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