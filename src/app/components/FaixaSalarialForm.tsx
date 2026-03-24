import { Button } from "./ui/button";
import { useState } from "react";

interface FaixaSalarialFormProps {
  onSubmit: (salarioMin: string, salarioMax: string, tipoContrato: string) => void;
}

const tipoContratoOptions = ["CLT", "PJ", "Estágio"];

// Função para formatar valor como moeda brasileira
const formatCurrency = (value: string) => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  if (!numbers) return '';
  
  // Converte para número e formata
  const numberValue = parseInt(numbers);
  return numberValue.toLocaleString('pt-BR');
};

// Função para lidar com a entrada de valores
const handleCurrencyInput = (value: string) => {
  const formatted = formatCurrency(value);
  return formatted ? `R$ ${formatted}` : '';
};

export function FaixaSalarialForm({ onSubmit }: FaixaSalarialFormProps) {
  const [salarioMin, setSalarioMin] = useState("");
  const [salarioMax, setSalarioMax] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");

  const handleSalarioMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = handleCurrencyInput(e.target.value);
    setSalarioMin(formatted);
  };

  const handleSalarioMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = handleCurrencyInput(e.target.value);
    setSalarioMax(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (salarioMin.trim() && salarioMax.trim() && tipoContrato) {
      onSubmit(salarioMin, salarioMax, tipoContrato);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Salário da vaga */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salário da vaga
          </label>
          <input
            type="text"
            value={salarioMin}
            onChange={handleSalarioMinChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="R$ 0"
            required
          />
        </div>

        {/* Salário máximo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salário máximo
          </label>
          <input
            type="text"
            value={salarioMax}
            onChange={handleSalarioMaxChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="R$ 0"
            required
          />
        </div>
      </div>

      {/* Tipo de contrato - botões */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de contrato
        </label>
        <div className="flex gap-2">
          {tipoContratoOptions.map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => setTipoContrato(tipo)}
              className={`px-6 py-2 rounded-md border transition-colors ${
                tipoContrato === tipo
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              {tipo}
            </button>
          ))}
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