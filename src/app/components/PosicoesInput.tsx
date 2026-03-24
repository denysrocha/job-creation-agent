import { Button } from "./ui/button";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Posicao } from "../types/job";

interface PosicoesInputProps {
  onSubmit: (posicoes: Posicao[]) => void;
}

const motivoOptions = [
  "Aumento de quadro",
  "Substituição",
  "Outro"
];

export function PosicoesInput({ onSubmit }: PosicoesInputProps) {
  const [posicoes, setPosicoes] = useState<Posicao[]>([
    { quantidade: 1, motivo: "" }
  ]);

  const totalPosicoes = posicoes.reduce((sum, p) => sum + (p.quantidade || 0), 0);

  const handleAddPosicao = () => {
    setPosicoes([...posicoes, { quantidade: 1, motivo: "" }]);
  };

  const handleRemovePosicao = (index: number) => {
    if (posicoes.length > 1) {
      setPosicoes(posicoes.filter((_, i) => i !== index));
    }
  };

  const handleQuantidadeChange = (index: number, value: string) => {
    const newPosicoes = [...posicoes];
    newPosicoes[index].quantidade = parseInt(value) || 0;
    setPosicoes(newPosicoes);
  };

  const handleMotivoChange = (index: number, value: string) => {
    const newPosicoes = [...posicoes];
    newPosicoes[index].motivo = value;
    setPosicoes(newPosicoes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validPosicoes = posicoes.filter(p => p.quantidade > 0 && p.motivo.trim() !== "");
    if (validPosicoes.length > 0) {
      onSubmit(validPosicoes);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      {/* Header com total */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Posições</h3>
          <p className="text-sm text-gray-500 mt-0.5">Total de posições: {totalPosicoes}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddPosicao}
          className="text-purple-600 border-purple-300 hover:bg-purple-50"
        >
          + Adicionar posições
        </Button>
      </div>

      {/* Posições sem requisições */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Posições sem requisições</h4>
        {posicoes.map((posicao, index) => (
          <div key={index} className="grid grid-cols-[200px_1fr_auto] gap-3 items-start">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Quantidade de posições:
              </label>
              <input
                type="number"
                min="1"
                value={posicao.quantidade}
                onChange={(e) => handleQuantidadeChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Motivo das posições:
              </label>
              <div className="flex gap-2">
                {motivoOptions.map((motivo) => (
                  <button
                    key={motivo}
                    type="button"
                    onClick={() => handleMotivoChange(index, motivo)}
                    className={`px-4 py-2 rounded-md border transition-colors ${
                      posicao.motivo === motivo
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {motivo}
                  </button>
                ))}
              </div>
            </div>
            {posicoes.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemovePosicao(index)}
                className="mt-7 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
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