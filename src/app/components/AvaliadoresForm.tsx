import { Button } from "./ui/button";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface AvaliadoresFormProps {
  onSubmit: (avaliadores: string[], gestor: string) => void;
}

// Mock de avaliadores disponíveis para autocomplete
const avaliadoresDisponiveis = [
  "João Silva",
  "Maria Santos",
  "Pedro Costa",
  "Ana Paula",
  "Carlos Eduardo",
  "Juliana Oliveira",
  "Roberto Alves",
  "Fernanda Lima",
];

export function AvaliadoresForm({ onSubmit }: AvaliadoresFormProps) {
  const [gestor, setGestor] = useState("");
  const [avaliadores, setAvaliadores] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = avaliadoresDisponiveis.filter(
        (avaliador) =>
          avaliador.toLowerCase().includes(inputValue.toLowerCase()) &&
          !avaliadores.includes(avaliador)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, avaliadores]);

  const handleAddAvaliador = (avaliador: string) => {
    if (avaliador.trim() && !avaliadores.includes(avaliador)) {
      setAvaliadores([...avaliadores, avaliador]);
      setInputValue("");
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
  };

  const handleRemoveAvaliador = (avaliador: string) => {
    setAvaliadores(avaliadores.filter((a) => a !== avaliador));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleAddAvaliador(inputValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gestor.trim() && avaliadores.length > 0) {
      onSubmit(avaliadores, gestor);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      {/* Gestor responsável */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gestor responsável
        </label>
        <input
          type="text"
          value={gestor}
          onChange={(e) => setGestor(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Ex: Pedro Costa"
          required
        />
      </div>

      {/* Avaliadores responsáveis com autocomplete e chips */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Avaliadores responsáveis
        </label>
        <div className="relative">
          {/* Container com chips e input */}
          <div className="w-full min-h-[42px] px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent flex flex-wrap gap-2 items-center">
            {/* Chips dos avaliadores selecionados */}
            {avaliadores.map((avaliador) => (
              <div
                key={avaliador}
                className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-sm"
              >
                <span>{avaliador}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAvaliador(avaliador)}
                  className="hover:text-purple-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            
            {/* Input para adicionar novos avaliadores */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => inputValue && setShowSuggestions(true)}
              className="flex-1 min-w-[200px] outline-none bg-transparent"
              placeholder={avaliadores.length === 0 ? "Digite para buscar avaliadores..." : ""}
            />
          </div>

          {/* Sugestões de autocomplete */}
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredSuggestions.map((sugestao) => (
                <button
                  key={sugestao}
                  type="button"
                  onClick={() => handleAddAvaliador(sugestao)}
                  className="w-full px-3 py-2 text-left hover:bg-purple-50 transition-colors"
                >
                  {sugestao}
                </button>
              ))}
            </div>
          )}
        </div>
        {avaliadores.length === 0 && (
          <p className="text-xs text-gray-500 mt-1">
            Pressione Enter ou clique em uma sugestão para adicionar
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white"
        disabled={!gestor.trim() || avaliadores.length === 0}
      >
        Enviar
      </Button>
    </form>
  );
}
