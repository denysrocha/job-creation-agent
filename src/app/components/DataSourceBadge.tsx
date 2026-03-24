import { DataSource } from "../types/job";
import { Sparkles } from "lucide-react";

interface DataSourceBadgeProps {
  source: DataSource;
}

export function DataSourceBadge({ source }: DataSourceBadgeProps) {
  // Só mostra o ícone se for inferido
  if (source !== 'inferred') {
    return null;
  }

  return (
    <div 
      className="group relative inline-flex items-center"
      title="O Agente sugeriu baseado em vagas semelhantes"
    >
      <Sparkles className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
      
      {/* Tooltip */}
      <div className="absolute right-0 bottom-full mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
        O Agente sugeriu baseado em vagas semelhantes
        <div className="absolute right-3 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}