import { Button } from "./ui/button";
import { useState } from "react";

interface CamposPersonalizadosFormProps {
  onSubmit: (projeto: string, time: string, squad: string, centroCusto: string, bu: string) => void;
}

export function CamposPersonalizadosForm({ onSubmit }: CamposPersonalizadosFormProps) {
  const [projeto, setProjeto] = useState("");
  const [time, setTime] = useState("");
  const [squad, setSquad] = useState("");
  const [centroCusto, setCentroCusto] = useState("");
  const [bu, setBu] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Todos os campos são opcionais, mas ao menos um deve ser preenchido
    if (projeto.trim() || time.trim() || squad.trim() || centroCusto.trim() || bu.trim()) {
      onSubmit(projeto, time, squad, centroCusto, bu);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="space-y-3">
        {/* Projeto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Projeto:
          </label>
          <input
            type="text"
            value={projeto}
            onChange={(e) => setProjeto(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Digite o nome do projeto..."
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time:
          </label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Digite o nome do time..."
          />
        </div>

        {/* Squad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Squad:
          </label>
          <input
            type="text"
            value={squad}
            onChange={(e) => setSquad(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Digite o nome do squad..."
          />
        </div>

        {/* Centro de custo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Centro de custo:
          </label>
          <input
            type="text"
            value={centroCusto}
            onChange={(e) => setCentroCusto(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Digite o centro de custo..."
          />
        </div>

        {/* BU */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            BU:
          </label>
          <input
            type="text"
            value={bu}
            onChange={(e) => setBu(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Digite a BU..."
          />
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
